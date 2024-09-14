import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [capturing, setCapturing] = useState(false); // To control capturing state
    const recognitionRef = useRef(null);
    const hasStartedListening = useRef(false);
    const timeoutRef = useRef(null); // For handling pauses

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Web speech API is not supported');
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Fixed the typo
        recognition.continuous = true;

        recognition.onresult = (event) => {
            let text = '';
            console.log(event.results);
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            console.log(text);

            // Handle the trigger phrase
            if (transcript.toLowerCase().includes('hey guide me')) {
                console.log("PHRASE DETECTED!!!!!")
                setCapturing(true);
                setTranscript(''); // Reset the transcript when capturing starts
            } else if (capturing) {
                // If capturing is active, update the transcript
                setTranscript((prev) => prev + ' ' + text);
                
                // Clear the timeout if there's new input
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                
                // Set a timeout to stop capturing if there's no new result
                timeoutRef.current = setTimeout(() => {
                    setCapturing(false);
                }, 2000); // 1 second timeout for detecting pause
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error: ', event.error);
        };

        recognition.onend = () => {
            if (capturing) {
                setCapturing(false);
                setTranscript('');
            }
            setIsListening(false);
        };

        // Automatically start listening when the component mounts
        if (!hasStartedListening.current) {
            startListening();
            hasStartedListening.current = true;
        }
    }, [capturing, startListening]);

    return (
        <div style={{ display: 'block' }}>
            <textarea
                style={{ width: '100%', height: '150px' }}
                disabled={isListening}
                value={isListening ? textInput + (transcript.length ? ' ' + transcript : '') : textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
        </div>
    );
};

export default VoiceInput;
