import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

const SampleQueries = ({ onSelectQuery }) => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    axios.get('/api/samples')
      .then(response => setSamples(response.data.categories))
      .catch(error => console.error('Error fetching samples:', error));
  }, []);

  return (
    <div className="mt-6 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-white">Try these sample queries:</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {samples.map((category, idx) => (
          <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-primary mb-3">{category.name}</h4>
            <div className="space-y-2">
              {category.queries.map((query, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => onSelectQuery(query)}
                  className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded transition-colors"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleQueries;
