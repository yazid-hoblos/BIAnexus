import React from 'react';
import { Menu, RotateCcw } from 'lucide-react';

const Header = ({ onToggleSidebar, onReset }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white transition-colors"
            title="Toggle history"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-no-background.png" 
              alt="BIAnexus Logo" 
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">BIAnexus</h1>
              <p className="text-xs text-gray-400">AI-Powered Bioinformatics Assistant</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 bg-accent/20 border border-accent/50 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-accent">System Active</span>
          </div>
          
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            title="Reset conversation"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
