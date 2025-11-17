import React from 'react';
import { X, History, MessageSquare } from 'lucide-react';

const Sidebar = ({ messages, show, onClose }) => {
  const conversationSummary = messages.filter(m => m.role === 'user').slice(-5);

  return (
    <>
      {/* Overlay */}
      {show && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-800 border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${show ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <History size={20} className="text-primary" />
            <h2 className="text-white font-semibold">History</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-full">
          {conversationSummary.length === 0 ? (
            <div className="text-gray-500 text-sm text-center mt-8">
              No recent queries
            </div>
          ) : (
            conversationSummary.map((msg, idx) => (
              <div
                key={idx}
                className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-2">
                  <MessageSquare size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-300 line-clamp-2">
                    {msg.content}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
