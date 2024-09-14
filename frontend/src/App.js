import './App.css';
import WebcamCapture from "./components/webcam/webcam"
import VoiceInput from './components/voice-input/index'

function App() {
  return (
    <div className="App">
      <VoiceInput>
      </VoiceInput>
      <WebcamCapture/>
    </div>
  );
}

export default App;
