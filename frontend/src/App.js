import './App.css';
import WebcamCapture from "./components/webcam/webcam"
import TextToSpeech from './components/text-to-speech/TextToSpeech';

function App() {
  const text = "Text-to-speech feature is now available on relatively any website or blog.";
  return (
    <div className="App">
      <WebcamCapture />
      <TextToSpeech text={text} />
    </div>
  );
}

export default App;
