import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from './components/ChatMessage';
import SampleQueries from './components/SampleQueries';
import Header from './components/Header';
import ProcessingIndicator from './components/ProcessingIndicator';
import Sidebar from './components/Sidebar';
import { Send, RotateCcw } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m **BIAnexus**, your AI-powered bioinformatics assistant. I can help you with:\n\n' +
        '🧬 Finding genes associated with diseases\n' +
        '🔬 Analyzing DNA sequences\n' +
        '📊 Checking gene expression levels\n' +
        '🔗 Exploring protein structures and pathways\n\n' +
        'Try clicking a sample query below or ask me anything!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, processingSteps]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    setProcessingSteps([]);

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        history: messages
      });

      // Simulate step-by-step processing
      if (response.data.processingSteps) {
        for (let i = 0; i < response.data.processingSteps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setProcessingSteps(prev => [...prev, response.data.processingSteps[i]]);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const assistantMessage = {
        role: 'assistant',
        content: response.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: {
          type: 'error',
          content: 'Sorry, an error occurred. Please try again.'
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      setProcessingSteps([]);
    }
  };

  const handleSampleQuery = (query) => {
    setInput(query);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat reset. How can I help you with bioinformatics today?',
        timestamp: new Date()
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <Sidebar 
        messages={messages} 
        show={showSidebar} 
        onClose={() => setShowSidebar(false)} 
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <Header 
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          onReset={handleReset}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {isProcessing && (
              <ProcessingIndicator steps={processingSteps} />
            )}

            {!isProcessing && messages.length > 0 && (
              <SampleQueries onSelectQuery={handleSampleQuery} />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 bg-gray-700 rounded-lg border border-gray-600 focus-within:border-primary transition-colors">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about genes, sequences, expression levels, proteins..."
                  className="w-full bg-transparent text-white px-4 py-3 outline-none resize-none"
                  rows="2"
                  disabled={isProcessing}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="bg-primary hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                style={{ minWidth: '50px', minHeight: '50px' }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
