import './App.css';
import WebcamCapture from "./components/webcam/webcam"
import TextToSpeech from './components/text-to-speech/TextToSpeech';

function App() {
  return (
    <div className="App">
      <WebcamCapture />
    </div>
  );
}

export default App;
