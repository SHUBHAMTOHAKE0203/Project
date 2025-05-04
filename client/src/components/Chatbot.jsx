import React, { useState } from 'react';
import axios from 'axios';
import { Send, MessageCircle, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FoodiesConnectLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="#ffffff" />
    <path d="M10 20 L30 20 M20 10 L20 30" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <circle cx="20" cy="20" r="16" stroke="#D97706" strokeWidth="2" fill="none" />
  </svg>
);

const Chatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleOpenChat = () => {
    navigate('/chatboot');
  };

  const sendMessage = async (message) => {
    try {
      const newMessages = [...messages, { sender: 'user', text: message }];
      setMessages(newMessages);
      setIsTyping(true);
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
      setMessages([...messages, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setIsTyping(false);
    setInput('');
  };

  const handleSend = () => {
    if (input.trim()) sendMessage(input.trim());
  };

  return (
    <>
      {location.pathname !== '/chatboot' && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleOpenChat}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-600 text-white shadow-lg hover:bg-amber-700 transition-all"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}

      {location.pathname === '/chatboot' && (
        <div className="fixed inset-0 z-50 flex flex-col shadow-xl overflow-hidden bg-white">
          <div className="bg-amber-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="font-bold text-2xl">VetBot</h2>
            </div>
            <button onClick={() => navigate(-1)} className="text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-white space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span
                  className={`px-4 py-2 rounded-lg shadow-md ${
                    msg.sender === 'user' ? 'bg-amber-100 text-black' : 'bg-amber-600 text-white'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && <div className="text-gray-400">Typing...</div>}
          </div>
          <div className="p-3 bg-amber-100 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Let's help that cute little streetpaw!..."
              className="flex-1 border border-amber-300 p-2 rounded-lg mr-2"
            />
            <button
              onClick={handleSend}
              className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
