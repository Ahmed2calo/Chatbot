import React, { useState } from 'react';
import { getChatbotResponse } from './chatbotAPI';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);

  const handleUserMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setUserMessage('');

    try {
      const response = await getChatbotResponse(userMessage);
      setMessages([...newMessages, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex-1 overflow-y-auto space-y-2 p-4 bg-gray-50 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? 'text-gray-700' : 'text-blue-600'}>
            <div className={`p-2 rounded-lg max-w-xs ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-100'} inline-block`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleUserMessage} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-4 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="p-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
