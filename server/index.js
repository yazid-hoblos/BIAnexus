require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mockDatabase = require('./data/mockDatabase');
const analysisEngine = require('./utils/analysisEngine');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    console.log(`[BIAnexus] Processing query: "${message}"`);
    
    // Simulate processing time for demo effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Analyze query and generate response
    const response = await analysisEngine.processQuery(message);
    
    res.json(response);
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({
      type: 'error',
      content: 'An error occurred while processing your query. Please try again.',
      suggestions: [
        'Find genes associated with Alzheimer\'s disease',
        'Analyze sequence ATCGATCGATCG',
        'Which tissues express BRCA1 the highest?'
      ]
    });
  }
});

// Get sample queries
app.get('/api/samples', (req, res) => {
  res.json({
    categories: [
      {
        name: 'Disease-Gene Association',
        queries: [
          'Find all genes associated with Alzheimer\'s disease',
          'What genes are linked to breast cancer?',
          'Show me genes involved in diabetes'
        ]
      },
      {
        name: 'Sequence Analysis',
        queries: [
          'Analyze sequence ATCGATCGATCG',
          'Find ORFs in sequence ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG',
          'Calculate GC content of GCGCGCATATAT'
        ]
      },
      {
        name: 'Gene Expression',
        queries: [
          'Which tissues express BRCA1 the highest?',
          'Show expression levels of TP53 across tissues',
          'Compare expression of APOE in brain vs liver'
        ]
      },
      {
        name: 'Protein Analysis',
        queries: [
          'Compare protein structures of insulin and glucagon',
          'What pathways involve EGFR?',
          'Show me the function of p53 protein'
        ]
      }
    ]
  });
});

// Export results
app.post('/api/export', (req, res) => {
  const { format, data } = req.body;
  
  if (format === 'json') {
    res.json(data);
  } else if (format === 'csv') {
    // Simple CSV conversion
    const csv = convertToCSV(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bianexus-results.csv');
    res.send(csv);
  }
});

function convertToCSV(data) {
  if (!data || !data.results) return '';
  
  let csv = 'Field,Value\n';
  Object.entries(data.results).forEach(([key, value]) => {
    if (typeof value === 'object') {
      csv += `${key},${JSON.stringify(value)}\n`;
    } else {
      csv += `${key},${value}\n`;
    }
  });
  
  return csv;
}

app.listen(PORT, () => {
  console.log(`\n🧬 BIAnexus Server running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔬 Demo mode: ${process.env.DEMO_MODE === 'true' ? 'ENABLED' : 'DISABLED'}\n`);
});
