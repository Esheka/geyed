import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import VoiceInput from '../voice-input';
import { InferenceEngine } from "inferencejs";
import { textToSpeech } from './captureImage';



const WebcamCapture = () => {
  const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_hqf8erCndtMb0UqDhfpDiaNitvp1";
  const PROJECT_URL = "obstruction-detection-aqdrn";
  const MODEL_VERSION = "4";
  const webcamRef = React.useRef(null);
  const [workerId, setWorkerId] = useState(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [inferRunning, setInferRunning] = useState(false);
  const [videoConstraints, setVideoConstraints] = useState({});
  const api = process.env.REACT_APP_OPENAI_API_KEY;
  const inferEngine = new InferenceEngine();


  useEffect(() => {
    const startWorker = async () => {
      const id = await inferEngine.startWorker(PROJECT_URL, MODEL_VERSION, PUBLISHABLE_ROBOFLOW_API_KEY);
      setWorkerId(id);
      setInferRunning(true);
    };
    startWorker();
  }, [inferEngine]);

  const stopWorker = async () => {
    if (workerId) {
      try {
        await inferEngine.stopWorker(workerId);
        setInferRunning(false);
        console.log(`Worker with ID ${workerId} stopped`);
      } catch (error) {
        console.error("Error stopping worker:", error);
      }
    }
  };

  const startLateWorker = async () => {
    const id = await inferEngine.startWorker(PROJECT_URL, MODEL_VERSION, PUBLISHABLE_ROBOFLOW_API_KEY);
    setWorkerId(id);
    setInferRunning(true);
  };

  const runInference = async () => {
    if (webcamRef.current && workerId) {
      const video = webcamRef.current.video; // Access the video element
      const imageBitmap = await createImageBitmap(video);
      const predictions = await inferEngine.infer(workerId, imageBitmap); // Perform inference on the video stream
      console.log(predictions);

      if (predictions.length > 0) {
        try {
          //stopWorker();
          const imageSrc = webcamRef.current.getScreenshot();
          setImgSrc(imageSrc);
          console.log(imageSrc);
          console.log(api);

          const gpt = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + api
            },
            body: JSON.stringify({
              'model': 'gpt-4o',
              'messages': [
                {
                  'role': 'user',
                  'content': [
                    {
                      'type': 'text',
                      'text': 'Give me either a lowercase yes or a no for if there is an object up close that could be an obstruction or tripping hazard for those that are visually impaired. Again, please just do a one word lowercase yes or no answer do not return more than that one word.'
                    },
                    {
                      'type': 'image_url',
                      'image_url': {
                        'url': imgSrc
                      }
                    }
                  ]
                }
              ],
              'max_tokens': 400
            })
          });

          const response = await gpt.json();
          console.log(response);
          const messageContent = response.choices[0].message.content;
          console.log(messageContent);

          if (messageContent === 'yes') {
            await textToSpeech("Obstruction detected, please wait");
            const obj = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api
              },
              body: JSON.stringify({
                'model': 'gpt-4o',
                'messages': [
                  {
                    'role': 'user',
                    'content': [
                      {
                        'type': 'text',
                        'text': 'Describe the object or obstruction in my way and please try an navigate me around it.'
                      },
                      {
                        'type': 'image_url',
                        'image_url': {
                          'url': imgSrc
                        }
                      }
                    ]
                  }
                ],
                'max_tokens': 600
              })
            });

            const newRes = await obj.json();
            console.log(newRes);
            const newMes = newRes.choices[0].message.content;
            console.log(newMes);
            await textToSpeech(newMes);
          }
          //startLateWorker();
        } catch (error) {
          console.error("Error during API call:", error);
        }
      }
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
      }, 3000); // Adjust the interval as necessary

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
    </>
  );
};

export default WebcamCapture;
