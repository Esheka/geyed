import './App.css';
import WebcamCapture from "./components/webcam/webcam";
import blue_dog from "./blue_dog.png";

function App() {
  return (
    <div className="App">
      <div className="top">
        <img src={blue_dog} alt="Logo" className="logo" />
        <h1 style={{ fontFamily: "monospace", fontSize: "4rem" }}>gEYEd me</h1>
      </div>

      <div className="container">
        <div className="webcam-component component">
          <WebcamCapture />
        </div>
      </div>
    </div>
  );
}

export default App;
