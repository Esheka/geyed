import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import VoiceInput from '../voice-input';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [videoConstraints, setVideoConstraints] = useState({});
  const api = process.env.REACT_APP_OPENAI_API_KEY;

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
