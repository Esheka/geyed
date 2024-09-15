import React from 'react';
import Webcam from 'react-webcam';
import VoiceInput from '../voice-input';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const api = process.env.REACT_APP_OPENAI_API_KEY;

  return (
    <>
      <VoiceInput webcamRef={webcamRef} setImgSrc={setImgSrc} api={api}/>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/webp"
      />
      {imgSrc && <img src={imgSrc} alt="" />}
    </>
  );
};

export default WebcamCapture;
