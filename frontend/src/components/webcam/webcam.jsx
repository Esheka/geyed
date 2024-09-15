import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import VoiceInput from '../voice-input';
import { InferenceEngine } from "inferencejs";


const WebcamCapture = () => {
  const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_hqf8erCndtMb0UqDhfpDiaNitvp1";
  const PROJECT_URL = "obstruction-detection-aqdrn";
  const MODEL_VERSION = "4";
  const webcamRef = React.useRef(null);
  const [workerId, setWorkerId] = useState(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [videoConstraints, setVideoConstraints] = useState({});
  const api = process.env.REACT_APP_OPENAI_API_KEY;
  const inferEngine = new InferenceEngine();

  
  useEffect(() => {
    const startWorker = async () => {
      const id = await inferEngine.startWorker(PROJECT_URL, MODEL_VERSION, PUBLISHABLE_ROBOFLOW_API_KEY);
      setWorkerId(id);
    };
    startWorker();
  }, [inferEngine]);

  const runInference = async () => {
    if (webcamRef.current && workerId) {
      const video = webcamRef.current.video; // Access the video element
      const imageBitmap = await createImageBitmap(video);
      const predictions = await inferEngine.infer(workerId, imageBitmap); // Perform inference on the video stream
      console.log(predictions); // Handle the predictions
    }
  };

  useEffect(() => {
    // Check if the device is a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Set constraints based on device type
    if (isMobile) {
      setVideoConstraints({
        facingMode: { exact: 'environment' }, // Use rear camera for mobile devices
      });
    } else {
      setVideoConstraints({
        facingMode: 'user', // Use front camera (default) for laptops/desktops
      });
    }
  }, []);

  useEffect(() => {
    if (workerId) {
      const intervalId = setInterval(() => {
        runInference();
      }, 2000); // Adjust the interval as necessary

      return () => clearInterval(intervalId);
    }
  }, [workerId, runInference]); 

  return (
    <>
      <VoiceInput webcamRef={webcamRef} setImgSrc={setImgSrc} api={api} />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/webp"
        videoConstraints={videoConstraints} // Apply video constraints dynamically
      />
      {imgSrc && <img src={imgSrc} alt="" />}
    </>
  );
};

export default WebcamCapture;
