import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { runChat } from '../services/geminiService';
import Icon from './Icon';
import { ICONS } from '../constants';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm the support assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await runChat(input);
        const aiMessage: Message = { sender: 'ai', text: aiResponseText };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-blue text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                    aria-label="Open support chat"
                >
                    <Icon path={ICONS.chat} className="w-8 h-8"/>
                </button>
            </div>

            <div className={`fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-sm h-[70vh] max-h-[600px] bg-brand-surface rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right border border-brand-border ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <header className="flex items-center justify-between p-4 bg-brand-blue text-white rounded-t-2xl">
                    <h3 className="font-bold text-lg">Support Assistant</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <Icon path={ICONS.close} className="w-6 h-6"/>
                    </button>
                </header>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">A</div>}
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-blue text-white rounded-br-none font-medium' : 'bg-white text-brand-text-primary rounded-bl-none border border-brand-border'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">A</div>
                            <div className="max-w-xs p-3 rounded-2xl bg-white text-brand-text-primary rounded-bl-none border border-brand-border">
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <footer className="p-4 border-t border-brand-border bg-white rounded-b-2xl">
                    <div className="flex items-center bg-gray-100 rounded-lg border border-brand-border focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent p-3 focus:outline-none text-sm text-brand-text-primary"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 text-brand-blue disabled:text-gray-400 transition-colors" aria-label="Send message">
                           <Icon path={ICONS.send} className="w-6 h-6"/>
                        </button>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Chatbot;