import React, { useState, useEffect } from 'react';
import cors from "cors"
cors()
const Chatbox = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello!' }, { max_tokens: 5, },
    ]);

    const handleSendMessage = async (inputMessage) => {
        setMessages([...messages, { role: 'user', content: inputMessage }]);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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', // Replace with your actual API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-16k-0613',
                    messages,
                }),
            });
            console.log(response)
            if (response.ok) {
                const responseData = (await response.json()).choices[0].message.content;
                setMessages([...messages, { role: 'assistant', content: responseData }]);
            } else {
                console.error('Failed to fetch response from OpenAI API');
            }
        } catch (error) {
            console.error('Error processing API response:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessageClick = () => {
        if (inputMessage.trim() !== '') {
            handleSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="chatbox chatboxx">
            <div className="chatbox-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="chatbox-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessageClick}>Send</button>
            </div>
        </div>
    );
};

export default Chatbox;
