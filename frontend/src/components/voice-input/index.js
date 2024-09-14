import React, { useState } from 'react'

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    return (
        <div style={{ display: 'block' }}>
            <button>
                Speak
            </button>
            <textarea style={{ width: '100%', height: '150px' }}
                value={textInput}
                onChange={(e) => { setTextInput(e.target.value) }} />
        </div>
    )
}