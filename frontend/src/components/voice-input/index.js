import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    
    const [transcript, setTranscript] = useState('');
    const [currtext, setCurrtext] = useState('');
    const [cacheLen, setCacheLen] = useState(0);
    
    const recognitionRef = useRef(null);
    const hasStartedListening = useRef(false);
    const isCapturing = useRef(false); // To track if we're capturing speech after the key phrase
    const sending = useRef(false);
    const captureTimeoutRef = useRef(null);

    const handleCapturedText = (text) => {
        // This is the function you'll call after 5 seconds
        console.log("Captured Text (in function):", text); 
        // You can add any other logic you want to perform with the captured text here
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
            
            
            setCacheLen(prevCacheLen => {
                if (text.substring(prevCacheLen, text.length).toLowerCase().includes('hey guide me')) {
                    console.log(text.length);
                    const newCacheLen = text.length;
                    console.log(text.substring(prevCacheLen, text.length));
                    setTranscript(text.substring(newCacheLen, text.length)); // Update transcript immediately
                    // potato
                    isCapturing.current = true;
                    captureTimeoutRef.current = setTimeout(() => {
                    isCapturing.current = false;
                    sending.current = true;
                    }, 5000); // Capture for 5 seconds
                    return newCacheLen; 
                } 
                else {
                    if (isCapturing.current) {
                        setCurrtext(prevCapturedText => prevCapturedText + text.substring(prevCacheLen, text.length));
                        console.log(text.substring(prevCacheLen, text.length));
                    }
                    if (sending.current) {
                        handleCapturedText(text.substring(prevCacheLen, text.length));
                        sending.current = false;
                    }
                    
                    setTranscript(text.substring(prevCacheLen, text.length)); 
                    return prevCacheLen; 
                }
            });
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