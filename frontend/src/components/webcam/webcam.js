import Webcam from "react-webcam";
import React from "react";

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/')
        xhr.onload = function() {
            console.log(JSON.parse(xhr.responseText))
        };
        xhr.send();
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
          />
        )}
      </>
    );
  };

  export default WebcamCapture;