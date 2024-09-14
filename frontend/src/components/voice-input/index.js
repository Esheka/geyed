import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    const hasStartedListening = useRef(false);

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

        if ('webkitSpeechGrammarList' in window) {
            const grammar = '#JSGF V1.0; grammar punctuation; public<punc>= . | ,|?|!|;|: ;';
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        recognition.onresult = (event) => {
            let text = '';
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error: ', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
            setTranscript('');
        };

        // Automatically start listening when the component mounts
        if (!hasStartedListening.current) {
            startListening();
            hasStartedListening.current = true;
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

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
