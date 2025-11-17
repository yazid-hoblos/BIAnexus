const mockDatabase = require('../data/mockDatabase');

class AnalysisEngine {
  async processQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Log processing steps for demo effect
    const steps = this.getProcessingSteps(lowerQuery);
    
    // Detect query type and route to appropriate handler
    if (this.isDiseaseGeneQuery(lowerQuery)) {
      return this.handleDiseaseGeneQuery(query, steps);
    } else if (this.isSequenceAnalysis(lowerQuery)) {
      return this.handleSequenceAnalysis(query, steps);
    } else if (this.isExpressionQuery(lowerQuery)) {
      return this.handleExpressionQuery(query, steps);
    } else if (this.isProteinQuery(lowerQuery)) {
      return this.handleProteinQuery(query, steps);
    } else if (this.isPathwayQuery(lowerQuery)) {
      return this.handlePathwayQuery(query, steps);
    } else {
      return this.handleUnknownQuery(query);
    }
  }
  
  getProcessingSteps(query) {
    const steps = ['Parsing natural language query...'];
    
    if (query.includes('gene') || query.includes('disease')) {
      steps.push('Accessing genomic databases (NCBI, Ensembl, OMIM)...');
      steps.push('Cross-referencing 4 major databases...');
    }
    if (query.includes('sequence')) {
      steps.push('Running sequence analysis pipeline...');
      steps.push('Computing nucleotide statistics...');
    }
    if (query.includes('expression') || query.includes('tissue')) {
      steps.push('Querying GTEx expression database...');
      steps.push('Analyzing tissue-specific patterns...');
    }
    if (query.includes('protein') || query.includes('pathway')) {
      steps.push('Searching protein interaction networks...');
      steps.push('Mapping biological pathways...');
    }
    
    steps.push('Validating results...');
    steps.push('Generating visualization...');
    
    return steps;
  }
  
  isDiseaseGeneQuery(query) {
    const patterns = [
      /genes?.*(associated|linked|related|involved).*(with|to|in)/,
      /(find|show|list|what).*(genes?).*(disease|condition)/,
      /disease.*(genes?)/
    ];
    return patterns.some(pattern => pattern.test(query));
  }
  
  isSequenceAnalysis(query) {
    const patterns = [
      /analyz[e]?.*(sequence|dna|rna)/,
      /sequence.*[ATCG]{4,}/i,
      /(gc|orf|blast|complement)/
    ];
    return patterns.some(pattern => pattern.test(query));
  }
  
  isExpressionQuery(query) {
    const patterns = [
      /(expression|express|expressed)/,
      /(tissue|organ|cell).*(express|level)/,
      /which.*(tissue|organ|cell)/
    ];
    return patterns.some(pattern => pattern.test(query));
  }
  
  isProteinQuery(query) {
    const patterns = [
      /protein.*(structure|compare|function)/,
      /compare.*(protein)/,
      /(structure|fold|domain).*protein/
    ];
    return patterns.some(pattern => pattern.test(query));
  }
  
  isPathwayQuery(query) {
    const patterns = [
      /pathway/,
      /function.*of/,
      /what.*(do|does|is|are)/
    ];
    return patterns.some(pattern => pattern.test(query));
  }
  
  handleDiseaseGeneQuery(query, steps) {
    // Extract disease name
    const diseaseMatches = query.match(/(alzheimer|breast cancer|diabetes|cancer|parkinson)/i);
    const diseaseName = diseaseMatches ? diseaseMatches[0].toLowerCase().replace("'s", '') : null;
    
    const diseaseData = mockDatabase.diseases[diseaseName];
    
    if (diseaseData) {
      return {
        type: 'disease-genes',
        query: query,
        processingSteps: steps,
        disease: diseaseData.name,
        results: {
          genes: diseaseData.genes,
          description: diseaseData.description,
          prevalence: diseaseData.prevalence,
          pathways: diseaseData.pathways,
          geneCount: diseaseData.genes.length
        },
        metrics: {
          analysisTime: '0.3s',
          databasesSearched: 4,
          genesAnalyzed: 25847,
          confidence: 99.2
        },
        visualization: {
          type: 'gene-table',
          chartData: diseaseData.genes.map(g => ({
            gene: g.symbol,
            association: g.association === 'Strong' ? 90 : g.association === 'Causative' ? 95 : 70
          }))
        }
      };
    } else {
      return {
        type: 'disease-genes',
        query: query,
        results: null,
        error: 'Disease not found in database',
        suggestions: [
          'Find genes associated with Alzheimer\'s disease',
          'What genes are linked to breast cancer?',
          'Show me genes involved in diabetes'
        ]
      };
    }
  }
  
  handleSequenceAnalysis(query, steps) {
    // Extract DNA sequence
    const sequenceMatch = query.match(/[ATCG]{4,}/i);
    
    if (!sequenceMatch) {
      return {
        type: 'error',
        content: 'No valid DNA sequence found. Please provide a sequence with A, T, C, G nucleotides.',
        suggestions: ['Analyze sequence ATCGATCGATCG', 'Find ORFs in sequence ATGGCCATTGTAATGGGCCGC']
      };
    }
    
    const sequence = sequenceMatch[0].toUpperCase();
    const analysis = this.analyzeDNASequence(sequence);
    
    return {
      type: 'sequence-analysis',
      query: query,
      processingSteps: steps,
      sequence: sequence,
      results: analysis,
      metrics: {
        analysisTime: '0.2s',
        sequenceLength: sequence.length,
        algorithmsUsed: 3,
        accuracy: 100
      },
      visualization: {
        type: 'sequence-stats',
        chartData: [
          { nucleotide: 'A', count: analysis.composition.A, percentage: analysis.composition.A_pct },
          { nucleotide: 'T', count: analysis.composition.T, percentage: analysis.composition.T_pct },
          { nucleotide: 'G', count: analysis.composition.G, percentage: analysis.composition.G_pct },
          { nucleotide: 'C', count: analysis.composition.C, percentage: analysis.composition.C_pct }
        ]
      }
    };
  }
  
  analyzeDNASequence(sequence) {
    const length = sequence.length;
    const counts = { A: 0, T: 0, G: 0, C: 0 };
    
    for (let base of sequence) {
      if (counts.hasOwnProperty(base)) counts[base]++;
    }
    
    const gcContent = ((counts.G + counts.C) / length * 100).toFixed(2);
    const complement = this.getComplement(sequence);
    const reverseComplement = complement.split('').reverse().join('');
    const orfs = this.findORFs(sequence);
    
    return {
      length: length,
      composition: {
        A: counts.A,
        A_pct: (counts.A / length * 100).toFixed(1),
        T: counts.T,
        T_pct: (counts.T / length * 100).toFixed(1),
        G: counts.G,
        G_pct: (counts.G / length * 100).toFixed(1),
        C: counts.C,
        C_pct: (counts.C / length * 100).toFixed(1)
      },
      gcContent: gcContent,
      complement: complement,
      reverseComplement: reverseComplement,
      orfs: orfs,
      molecularWeight: (length * 330).toFixed(0), // Approximate
      meltingTemp: (64.9 + 41 * (counts.G + counts.C - 16.4) / length).toFixed(1)
    };
  }
  
  getComplement(sequence) {
    const complementMap = { A: 'T', T: 'A', G: 'C', C: 'G' };
    return sequence.split('').map(base => complementMap[base]).join('');
  }
  
  findORFs(sequence) {
    const orfs = [];
    const startCodon = 'ATG';
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    
    for (let frame = 0; frame < 3; frame++) {
      let i = frame;
      while (i < sequence.length - 2) {
        if (sequence.substr(i, 3) === startCodon) {
          const start = i;
          i += 3;
          while (i < sequence.length - 2) {
            const codon = sequence.substr(i, 3);
            if (stopCodons.includes(codon)) {
              const length = i - start + 3;
              if (length >= 30) { // Minimum ORF length
                orfs.push({
                  frame: frame + 1,
                  start: start + 1,
                  end: i + 3,
                  length: length,
                  sequence: sequence.substring(start, i + 3)
                });
              }
              break;
            }
            i += 3;
          }
        }
        i += 3;
      }
    }
    
    return orfs.length > 0 ? orfs : [{ message: 'No significant ORFs found (minimum 30bp)' }];
  }
  
  handleExpressionQuery(query, steps) {
    // Extract gene name
    const geneMatch = query.match(/(BRCA1|BRCA2|TP53|APOE|EGFR|INS|GCG)/i);
    
    if (!geneMatch) {
      return {
        type: 'error',
        content: 'Gene not specified or not found in database.',
        suggestions: [
          'Which tissues express BRCA1 the highest?',
          'Show expression levels of TP53 across tissues',
          'Compare expression of APOE in brain vs liver'
        ]
      };
    }
    
    const geneSymbol = geneMatch[0].toUpperCase();
    const geneData = mockDatabase.genes[geneSymbol];
    
    if (geneData && geneData.tissues) {
      const tissueData = Object.entries(geneData.tissues)
        .map(([tissue, expression]) => ({ tissue, expression }))
        .sort((a, b) => b.expression - a.expression);
      
      return {
        type: 'gene-expression',
        query: query,
        processingSteps: steps,
        gene: geneData,
        results: {
          symbol: geneSymbol,
          name: geneData.name,
          function: geneData.function,
          tissueExpression: tissueData,
          highestExpression: tissueData[0],
          lowestExpression: tissueData[tissueData.length - 1]
        },
        metrics: {
          analysisTime: '0.4s',
          tissuesAnalyzed: tissueData.length,
          samplesProcessed: 11688,
          dataSource: 'GTEx v8'
        },
        visualization: {
          type: 'expression-chart',
          chartData: tissueData
        }
      };
    } else {
      return {
        type: 'error',
        content: 'Gene expression data not available.',
        suggestions: ['Try BRCA1, TP53, APOE, or EGFR']
      };
    }
  }
  
  handleProteinQuery(query, steps) {
    const proteinMatches = query.match(/(insulin|glucagon|p53)/i);
    
    if (!proteinMatches) {
      return {
        type: 'error',
        content: 'Protein not found in database.',
        suggestions: [
          'Compare protein structures of insulin and glucagon',
          'Show me the function of p53 protein'
        ]
      };
    }
    
    const proteinName = proteinMatches[0].toLowerCase();
    const proteinData = mockDatabase.proteins[proteinName];
    
    if (query.includes('compare')) {
      const protein2Match = query.match(/(insulin|glucagon|p53)/gi);
      if (protein2Match && protein2Match.length > 1) {
        const protein1 = mockDatabase.proteins[protein2Match[0].toLowerCase()];
        const protein2 = mockDatabase.proteins[protein2Match[1].toLowerCase()];
        
        return {
          type: 'protein-comparison',
          query: query,
          processingSteps: steps,
          results: {
            protein1: protein1,
            protein2: protein2,
            comparison: {
              lengthDiff: Math.abs(parseInt(protein1.length) - parseInt(protein2.length)),
              structuralSimilarity: 23.5, // Mock value
              functionalRelation: 'Both are peptide hormones involved in glucose homeostasis'
            }
          },
          metrics: {
            analysisTime: '0.5s',
            structuresCompared: 2,
            alignmentScore: 23.5
          }
        };
      }
    }
    
    return {
      type: 'protein-info',
      query: query,
      processingSteps: steps,
      results: proteinData,
      metrics: {
        analysisTime: '0.3s',
        databasesSearched: 3
      }
    };
  }
  
  handlePathwayQuery(query, steps) {
    const geneMatch = query.match(/(BRCA1|EGFR|TP53|APOE)/i);
    
    if (geneMatch) {
      const geneSymbol = geneMatch[0].toUpperCase();
      const geneData = mockDatabase.genes[geneSymbol];
      
      if (geneData) {
        return {
          type: 'pathway-info',
          query: query,
          processingSteps: steps,
          gene: geneSymbol,
          results: {
            pathways: geneData.pathways,
            function: geneData.function,
            diseases: geneData.diseases
          },
          metrics: {
            analysisTime: '0.3s',
            pathwayDatabases: 3
          }
        };
      }
    }
    
    return {
      type: 'error',
      content: 'Could not identify gene or pathway in query.',
      suggestions: [
        'What pathways involve EGFR?',
        'Show me the function of TP53'
      ]
    };
  }
  
  handleUnknownQuery(query) {
    return {
      type: 'unknown',
      query: query,
      content: 'I\'m not sure how to answer that question. I can help you with:\n\n' +
        '• Finding genes associated with diseases\n' +
        '• Analyzing DNA sequences\n' +
        '• Checking gene expression in different tissues\n' +
        '• Comparing protein structures\n' +
        '• Exploring biological pathways',
      suggestions: [
        'Find genes associated with Alzheimer\'s disease',
        'Analyze sequence ATCGATCGATCG',
        'Which tissues express BRCA1 the highest?',
        'What pathways involve EGFR?'
      ]
    };
  }
}

module.exports = new AnalysisEngine();
