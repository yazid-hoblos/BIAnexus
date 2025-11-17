const mockDatabase = {
  diseases: {
    alzheimer: {
      name: "Alzheimer's Disease",
      genes: [
        {
          symbol: "APOE",
          name: "Apolipoprotein E",
          description: "Major genetic risk factor for late-onset Alzheimer's disease",
          chromosome: "19",
          association: "Strong",
          variants: ["ε4 allele increases risk 3-15 fold"]
        },
        {
          symbol: "PSEN1",
          name: "Presenilin 1",
          description: "Involved in processing amyloid precursor protein",
          chromosome: "14",
          association: "Causative",
          variants: ["Over 200 pathogenic mutations identified"]
        },
        {
          symbol: "APP",
          name: "Amyloid Precursor Protein",
          description: "Precursor to amyloid-beta peptide found in plaques",
          chromosome: "21",
          association: "Causative",
          variants: ["Duplications and point mutations"]
        },
        {
          symbol: "PSEN2",
          name: "Presenilin 2",
          description: "Similar function to PSEN1 in APP processing",
          chromosome: "1",
          association: "Causative",
          variants: ["Rare mutations in early-onset cases"]
        },
        {
          symbol: "MAPT",
          name: "Microtubule Associated Protein Tau",
          description: "Forms neurofibrillary tangles in AD",
          chromosome: "17",
          association: "Moderate",
          variants: ["H1 haplotype associated with increased risk"]
        }
      ],
      description: "Progressive neurodegenerative disease affecting memory and cognitive function",
      prevalence: "~50 million people worldwide",
      pathways: ["Amyloid cascade", "Tau phosphorylation", "Neuroinflammation"]
    },
    "breast cancer": {
      name: "Breast Cancer",
      genes: [
        {
          symbol: "BRCA1",
          name: "Breast Cancer Gene 1",
          description: "DNA repair protein, tumor suppressor",
          chromosome: "17",
          association: "Strong",
          variants: ["~45-65% lifetime risk with pathogenic variants"]
        },
        {
          symbol: "BRCA2",
          name: "Breast Cancer Gene 2",
          description: "DNA repair, homologous recombination",
          chromosome: "13",
          association: "Strong",
          variants: ["~40-55% lifetime risk with pathogenic variants"]
        },
        {
          symbol: "TP53",
          name: "Tumor Protein P53",
          description: "Cell cycle regulation and apoptosis",
          chromosome: "17",
          association: "Strong",
          variants: ["Li-Fraumeni syndrome"]
        },
        {
          symbol: "PTEN",
          name: "Phosphatase and Tensin Homolog",
          description: "Negative regulator of AKT/PKB signaling",
          chromosome: "10",
          association: "Moderate",
          variants: ["Cowden syndrome"]
        }
      ],
      description: "Malignant tumor originating from breast tissue",
      prevalence: "~2.3 million new cases annually worldwide",
      pathways: ["DNA damage response", "Cell cycle control", "Hormone signaling"]
    },
    diabetes: {
      name: "Type 2 Diabetes",
      genes: [
        {
          symbol: "TCF7L2",
          name: "Transcription Factor 7 Like 2",
          description: "Wnt signaling pathway, beta-cell function",
          chromosome: "10",
          association: "Strong",
          variants: ["Most significant T2D susceptibility gene"]
        },
        {
          symbol: "PPARG",
          name: "Peroxisome Proliferator Activated Receptor Gamma",
          description: "Adipocyte differentiation, insulin sensitivity",
          chromosome: "3",
          association: "Moderate",
          variants: ["P12A variant protective"]
        },
        {
          symbol: "KCNJ11",
          name: "Potassium Channel, Inwardly Rectifying Subfamily J Member 11",
          description: "Pancreatic beta-cell insulin secretion",
          chromosome: "11",
          association: "Moderate",
          variants: ["E23K variant increases risk"]
        }
      ],
      description: "Metabolic disorder characterized by insulin resistance",
      prevalence: "~537 million adults worldwide",
      pathways: ["Insulin signaling", "Glucose metabolism", "Beta-cell function"]
    }
  },
  
  genes: {
    BRCA1: {
      symbol: "BRCA1",
      name: "Breast Cancer Gene 1",
      function: "DNA damage repair via homologous recombination, tumor suppression",
      chromosome: "17q21.31",
      length: "81,189 bp",
      protein: "1,863 amino acids",
      tissues: {
        breast: 85,
        ovary: 72,
        prostate: 45,
        pancreas: 38,
        testis: 65,
        thymus: 52,
        uterus: 48,
        brain: 25
      },
      pathways: ["DNA repair", "Cell cycle checkpoint", "Transcriptional regulation"],
      diseases: ["Breast cancer", "Ovarian cancer", "Prostate cancer"]
    },
    TP53: {
      symbol: "TP53",
      name: "Tumor Protein P53",
      function: "Cell cycle regulation, apoptosis, DNA repair, guardian of the genome",
      chromosome: "17p13.1",
      length: "19,149 bp",
      protein: "393 amino acids",
      tissues: {
        colon: 78,
        lung: 82,
        brain: 68,
        liver: 75,
        kidney: 70,
        heart: 55,
        muscle: 48,
        skin: 62
      },
      pathways: ["Apoptosis", "Cell cycle arrest", "DNA damage response", "Senescence"],
      diseases: ["Li-Fraumeni syndrome", "Various cancers"]
    },
    APOE: {
      symbol: "APOE",
      name: "Apolipoprotein E",
      function: "Lipid transport, cholesterol metabolism, neuronal repair",
      chromosome: "19q13.32",
      length: "3,597 bp",
      protein: "317 amino acids",
      tissues: {
        liver: 95,
        brain: 88,
        adrenal: 62,
        kidney: 45,
        spleen: 38,
        lung: 35,
        heart: 42,
        muscle: 28
      },
      pathways: ["Lipid metabolism", "Cholesterol transport", "Neuronal maintenance"],
      diseases: ["Alzheimer's disease", "Cardiovascular disease"]
    },
    EGFR: {
      symbol: "EGFR",
      name: "Epidermal Growth Factor Receptor",
      function: "Cell proliferation, differentiation, receptor tyrosine kinase",
      chromosome: "7p11.2",
      length: "188,307 bp",
      protein: "1,210 amino acids",
      tissues: {
        skin: 92,
        lung: 78,
        liver: 65,
        kidney: 72,
        brain: 58,
        breast: 68,
        colon: 70,
        placenta: 85
      },
      pathways: ["MAPK/ERK signaling", "PI3K/AKT pathway", "JAK/STAT signaling"],
      diseases: ["Lung cancer", "Glioblastoma", "Colorectal cancer"]
    }
  },
  
  proteins: {
    insulin: {
      name: "Insulin",
      gene: "INS",
      length: "51 amino acids (mature form)",
      structure: "Two chains (A: 21 aa, B: 30 aa) connected by disulfide bonds",
      function: "Glucose uptake regulation, metabolic homeostasis",
      pdbId: "1MSO",
      pathways: ["Glucose metabolism", "PI3K/AKT signaling"]
    },
    glucagon: {
      name: "Glucagon",
      gene: "GCG",
      length: "29 amino acids",
      structure: "Single alpha-helical peptide",
      function: "Glucose production, glycogen breakdown",
      pdbId: "1GCN",
      pathways: ["Gluconeogenesis", "Glycogenolysis"]
    },
    p53: {
      name: "Tumor Protein p53",
      gene: "TP53",
      length: "393 amino acids",
      structure: "Tetramer with DNA-binding domain, oligomerization domain",
      function: "Transcription factor, cell cycle control, apoptosis",
      pdbId: "1TSR",
      pathways: ["Apoptosis", "DNA damage response", "Cell cycle arrest"]
    }
  },
  
  sequences: {
    patterns: {
      gc_content_high: "Rich in G and C nucleotides, typically found in gene-rich regions",
      gc_content_low: "AT-rich, often found in intergenic regions",
      start_codon: "ATG - Translation initiation site",
      stop_codons: ["TAA", "TAG", "TGA"]
    }
  }
};

module.exports = mockDatabase;
