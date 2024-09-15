import { useEffect } from "react";

const TextToSpeech = ({ text }) => {
    useEffect(() => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();

        utterance.voice = voices[2];
        utterance.pitch = 1;
        utterance.rate = 1.1;
        utterance.volume = 1;

        // Automatically start speaking the text
        synth.speak(utterance);

        return () => {
            synth.cancel();
        };
    }, [text]);

    return null; // Render nothing to the UI
};

export default TextToSpeech;