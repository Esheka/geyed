import React, { useState } from 'react'
import useSpeechToText from '../../hooks/useSpeechToText';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');

    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true })

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening()
    }

    const stopVoiceInput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''))
        stopListening()
    }

    return (
        <div style={{ display: 'block' }}>
            <button onClick={startStopListening}>
                Speak
            </button>
            <textarea style={{ width: '100%', height: '150px' }}
                disabled={isListening}
                value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                onChange={(e) => { setTextInput(e.target.value) }} />
        </div>
    )
}

export default VoiceInput;