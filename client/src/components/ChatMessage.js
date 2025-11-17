import React from 'react';
import ResultsDisplay from './ResultsDisplay';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`max-w-3xl ${isUser ? 'ml-12' : 'mr-12'}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">BA</span>
            </div>
            <span className="text-sm text-gray-400">BIAnexus</span>
          </div>
        )}
        
        <div
          className={`rounded-lg p-4 ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-gray-800 border border-gray-700 text-gray-100'
          }`}
        >
          {typeof message.content === 'string' ? (
            <div className="prose prose-invert max-w-none">
              {message.content.split('\n').map((line, i) => {
                // Handle bold text
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="mb-2 last:mb-0">
                    {parts.map((part, j) => 
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>
          ) : (
            <ResultsDisplay data={message.content} />
          )}
        </div>
        
        {isUser && (
          <div className="flex items-center justify-end space-x-2 mt-2">
            <span className="text-sm text-gray-400">You</span>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">U</span>
            </div>
          </div>
        )}
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
