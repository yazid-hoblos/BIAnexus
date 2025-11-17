import React from 'react';
import { Loader2 } from 'lucide-react';

const ProcessingIndicator = ({ steps }) => {
  return (
    <div className="mb-4 animate-fadeIn">
      <div className="max-w-3xl mr-12">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Loader2 size={20} className="text-white animate-spin" />
          </div>
          <span className="text-sm text-gray-400">BIAnexus is analyzing...</span>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2 animate-slideIn">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-300">{step}</span>
              </div>
            ))}
            {steps.length > 0 && (
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="text-primary animate-spin" />
                <span className="text-sm text-gray-400">Processing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;
