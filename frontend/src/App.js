import './App.css';
import WebcamCapture from "./components/webcam/webcam"
import VoiceInput from './components/voice-input/index'
import TextToSpeech from './components/text-to-speech/TextToSpeech';

function App() {
  const text = "Text-to-speech feature is now available on relatively any website or blog.";
  return (
    <div className="App">
      <VoiceInput>
      </VoiceInput>
      <WebcamCapture />
      <TextToSpeech text={text} />
    </div>
  );
}

export default App;
