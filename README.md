# 🧬 BIAnexus - AI-Powered Bioinformatics Chatbot

![BIAnexus](https://img.shields.io/badge/BIAnexus-v1.0-16A085?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

**BIAnexus** is an AI-powered bioinformatics assistant that allows researchers to interact with genomic data using natural language. Built for startup pitch demonstrations, it showcases how AI can democratize access to complex bioinformatics analysis.

---

## 🎯 Demo Features

### Core Capabilities
- 🔍 **Disease-Gene Association**: Find genes linked to diseases (Alzheimer's, cancer, diabetes, etc.)
- 🧪 **DNA Sequence Analysis**: Analyze sequences for GC content, ORFs, complement sequences
- 📊 **Gene Expression**: Query tissue-specific expression levels from GTEx-like data
- 🔗 **Protein Analysis**: Compare protein structures and explore biological pathways
- 📈 **Data Visualization**: Interactive charts and tables for results

### Demo-Ready Queries
1. "Find all genes associated with Alzheimer's disease"
2. "Analyze sequence ATCGATCGATCG"
3. "Which tissues express BRCA1 the highest?"
4. "Compare protein structures of insulin and glucagon"
5. "What pathways involve EGFR?"

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- (Optional) **OpenAI API key** or **Anthropic API key** for enhanced AI responses

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd c:\Users\user\Desktop\M2\startup
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   - `DEMO_MODE=true` (uses mock responses, no API needed)
   - Or add your API key for real AI integration

4. **Start the application:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

The backend API runs on `http://localhost:3001`

---

## 📁 Project Structure

```
bianexus/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.js       # Message display component
│   │   │   ├── Header.js            # App header with branding
│   │   │   ├── ProcessingIndicator.js # Loading animation
│   │   │   ├── ResultsDisplay.js    # Render analysis results
│   │   │   ├── SampleQueries.js     # Demo query buttons
│   │   │   └── Sidebar.js           # Conversation history
│   │   ├── App.js               # Main application
│   │   ├── index.js
│   │   └── index.css            # Tailwind CSS + custom styles
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                      # Node.js/Express backend
│   ├── data/
│   │   └── mockDatabase.js      # Mock bioinformatics data
│   ├── utils/
│   │   └── analysisEngine.js    # Query processing logic
│   └── index.js                 # Express server
│
├── package.json                 # Root package file
├── .env.example                 # Environment template
├── .gitignore
└── README.md                    # This file
```

---

## 🎨 Color Scheme

The app uses a professional scientific color palette:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary (Teal)** | `#16A085` | Branding, highlights, CTAs |
| **Accent (Coral)** | `#FF6B9D` | User messages, accents |
| **Dark** | `#2C3E50` | Text, backgrounds |
| **Light** | `#ECF0F1` | Secondary text |

---

## 🧪 Mock Database

The application includes realistic mock data for:

### Diseases
- **Alzheimer's Disease**: 5 genes (APOE, PSEN1, APP, PSEN2, MAPT)
- **Breast Cancer**: 4 genes (BRCA1, BRCA2, TP53, PTEN)
- **Type 2 Diabetes**: 3 genes (TCF7L2, PPARG, KCNJ11)

### Genes
- **BRCA1, TP53, APOE, EGFR** with:
  - Chromosome locations
  - Tissue expression data (8 tissues each)
  - Functions and pathways
  - Associated diseases

### Proteins
- **Insulin, Glucagon, p53** with:
  - Amino acid lengths
  - PDB IDs
  - Structural information
  - Functional pathways

---

## 📊 Analysis Features

### 1. Disease-Gene Association
**Query**: "Find genes associated with Alzheimer's disease"

**Returns**:
- Gene symbols and names
- Association strength (Causative, Strong, Moderate)
- Chromosome locations
- Gene descriptions
- Related pathways

### 2. DNA Sequence Analysis
**Query**: "Analyze sequence ATCGATCGATCG"

**Computes**:
- ✅ GC content percentage
- ✅ Nucleotide composition
- ✅ Complement and reverse complement
- ✅ Open Reading Frames (ORFs)
- ✅ Melting temperature
- ✅ Molecular weight

### 3. Gene Expression
**Query**: "Which tissues express BRCA1 the highest?"

**Shows**:
- Tissue-specific expression levels (TPM)
- Interactive bar charts
- Highest/lowest expression tissues
- Data source information (GTEx v8)

### 4. Protein Analysis
**Query**: "Compare protein structures of insulin and glucagon"

**Displays**:
- Protein lengths and structures
- PDB IDs for 3D structures
- Functional comparisons
- Structural similarity scores

---

## 🎬 Demo Presentation Tips

### For Investors
1. **Start with the problem**: "Biologists spend hours writing code to analyze genomic data"
2. **Show the solution**: Type natural language queries
3. **Highlight speed**: Point to "Analysis completed in 0.3s"
4. **Emphasize accuracy**: Show the "99.2% confidence" metrics
5. **Demo export**: Download results as JSON

### Key Talking Points
- ✨ **Natural Language**: No coding required
- ⚡ **Fast**: Real-time analysis
- 📊 **Visual**: Charts and tables automatically generated
- 🔬 **Accurate**: Based on real databases (NCBI, Ensembl, GTEx)
- 💾 **Exportable**: Results downloadable for further analysis

### Live Demo Flow
```
1. Open app → Shows welcome message
2. Click sample query → "Find genes associated with Alzheimer's disease"
3. Watch processing animation → Shows database searches
4. View results → Formatted table with 5 genes
5. Try sequence analysis → Paste DNA sequence
6. Show visualizations → GC content chart
7. Export results → Download JSON file
```

---

## 🔧 Configuration Options

### Environment Variables

| Variable | Options | Description |
|----------|---------|-------------|
| `DEMO_MODE` | `true/false` | Use mock responses (true) or AI API (false) |
| `AI_PROVIDER` | `mock/openai/anthropic` | AI service to use |
| `OPENAI_API_KEY` | Your key | OpenAI API access |
| `ANTHROPIC_API_KEY` | Your key | Claude API access |
| `PORT` | `3001` | Backend server port |

### Demo Mode (Default)
- ✅ **No API key required**
- ✅ **Instant responses**
- ✅ **Perfect for offline demos**
- ✅ **Consistent, predictable results**

### AI Mode (Optional)
Set `DEMO_MODE=false` and provide an API key to use real AI for:
- More flexible query understanding
- Handling unexpected questions
- Generating dynamic explanations

---

## 📦 Dependencies

### Frontend
- **React 18.2**: UI framework
- **Tailwind CSS**: Styling (via CDN in index.css)
- **Recharts**: Data visualization
- **Axios**: HTTP requests
- **Lucide React**: Icons

### Backend
- **Express**: Web server
- **CORS**: Cross-origin requests
- **dotenv**: Environment configuration

---

## 🐳 Docker Setup (Optional)

```dockerfile
# Coming soon - Docker configuration for containerized deployment
```

---

## 🚧 Roadmap & Future Features

### Planned Enhancements
- [ ] Real BLAST integration via NCBI API
- [ ] 3D protein structure visualization (3Dmol.js)
- [ ] User authentication and saved sessions
- [ ] Real-time collaboration
- [ ] Integration with BioPython
- [ ] Support for more organisms (mouse, yeast, etc.)
- [ ] Pathway visualization (KEGG integration)
- [ ] Custom dataset uploads

---

## 🎓 Educational Use

This demo is perfect for:
- **Startup pitches** to investors
- **Bioinformatics workshops** showing AI potential
- **Computer science classes** teaching full-stack development
- **Hackathons** as a starter template

---

## 🔒 Security Notes

**For Production Use:**
- ⚠️ Add authentication (JWT, OAuth)
- ⚠️ Implement rate limiting
- ⚠️ Sanitize user inputs
- ⚠️ Use HTTPS
- ⚠️ Add API key rotation
- ⚠️ Implement proper error logging

**Current State:**
This is a **demo prototype** meant for pitch presentations, not production deployment.

---

## 📈 Performance Metrics (Mock)

The app displays realistic metrics for demo purposes:

- **Analysis Time**: 0.2-0.5 seconds
- **Databases Searched**: 3-4
- **Genes Analyzed**: 25,000-50,000
- **Accuracy**: 99.2%
- **Data Source**: GTEx v8, NCBI, Ensembl

---

## 🤝 Contributing

This is a demo project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

---

## 📄 License

MIT License - feel free to use this for your own demos and pitches!

---

## 💬 Support & Questions

For demo support or questions:
- **Email**: support@bianexus.demo
- **GitHub Issues**: [Create an issue](#)

---

## 🎉 Acknowledgments

- **Mock data** inspired by NCBI Gene, GTEx Portal, and UniProt
- **Color scheme** designed for scientific professionalism
- **Architecture** optimized for pitch demos and rapid prototyping

---

## 🏃 Quick Commands Reference

```bash
# Install everything
npm run install-all

# Run both frontend and backend
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client

# Build for production
npm run build
```

---

**Built with ❤️ for the future of bioinformatics**

*BIAnexus - Making genomics accessible through conversation*
