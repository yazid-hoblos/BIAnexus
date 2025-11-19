import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';

const ResultsDisplay = ({ data }) => {
  if (!data) return null;

  const handleExport = (format) => {
    // Create downloadable content
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bianexus-results-${Date.now()}.json`;
    a.click();
  };

  // Error display
  if (data.type === 'error' || data.error) {
    return (
      <div className="space-y-4">
        <div className="flex items-start space-x-3 bg-red-900/20 border border-red-700 rounded-lg p-4">
          <AlertCircle className="text-red-500 mt-1" size={20} />
          <div>
            <p className="text-red-300">{data.content || data.error}</p>
          </div>
        </div>
        {data.suggestions && data.suggestions.length > 0 && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-2">Try these instead:</p>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              {data.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Unknown query
  if (data.type === 'unknown') {
    return (
      <div className="space-y-4">
        <div className="flex items-start space-x-3 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <Info className="text-blue-400 mt-1" size={20} />
          <div className="prose prose-invert max-w-none">
            {data.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2 text-gray-300">{line}</p>
            ))}
          </div>
        </div>
        {data.suggestions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.suggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-gray-700/50 rounded p-2 text-sm text-gray-300">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metrics Display */}
      {data.metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(data.metrics).map(([key, value]) => (
            <div key={key} className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-lg font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Disease-Gene Results */}
      {data.type === 'disease-genes' && data.results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 rounded-lg p-4">
            <h3 className="text-xl font-bold text-white mb-2">{data.disease}</h3>
            <p className="text-gray-300 mb-2">{data.results.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-400">Prevalence: <span className="text-white">{data.results.prevalence}</span></span>
              <span className="text-gray-400">Genes Found: <span className="text-white">{data.results.geneCount}</span></span>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Associated Genes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-3 text-gray-300">Symbol</th>
                    <th className="text-left p-3 text-gray-300">Name</th>
                    <th className="text-left p-3 text-gray-300">Association</th>
                    <th className="text-left p-3 text-gray-300">Chromosome</th>
                    <th className="text-left p-3 text-gray-300">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data.results.genes.map((gene, idx) => (
                    <tr key={idx} className="hover:bg-gray-700/50 transition-colors">
                      <td className="p-3">
                        <code className="text-primary font-mono font-bold">{gene.symbol}</code>
                      </td>
                      <td className="p-3 text-gray-300">{gene.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          gene.association === 'Causative' ? 'bg-red-900/50 text-red-300' :
                          gene.association === 'Strong' ? 'bg-orange-900/50 text-orange-300' :
                          'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {gene.association}
                        </span>
                      </td>
                      <td className="p-3 text-gray-300">{gene.chromosome}</td>
                      <td className="p-3 text-gray-400 text-xs">{gene.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {data.results.pathways && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Involved Pathways</h4>
              <div className="flex flex-wrap gap-2">
                {data.results.pathways.map((pathway, idx) => (
                  <span key={idx} className="bg-accent/30 border border-accent text-white px-3 py-1 rounded-full text-sm">
                    {pathway}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sequence Analysis Results */}
      {data.type === 'sequence-analysis' && data.results && (
        <div className="space-y-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Sequence Information</h4>
            <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 overflow-x-auto mb-4">
              {data.sequence}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-400">Length</div>
                <div className="text-lg font-semibold text-white">{data.results.length} bp</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">GC Content</div>
                <div className="text-lg font-semibold text-white">{data.results.gcContent}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Melting Temp</div>
                <div className="text-lg font-semibold text-white">{data.results.meltingTemp}°C</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Nucleotide Composition</h4>
            {data.visualization && data.visualization.chartData && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.visualization.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="nucleotide" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Bar dataKey="count" fill="#16A085" />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {data.visualization.chartData.map((item, idx) => (
                <div key={idx} className="bg-gray-800 rounded p-2 text-center">
                  <div className="text-2xl font-bold text-white">{item.nucleotide}</div>
                  <div className="text-sm text-gray-400">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Sequence Variants</h4>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-400 mb-1">Complement</div>
                <div className="bg-gray-800 p-2 rounded font-mono text-sm text-blue-400 overflow-x-auto">
                  {data.results.complement}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Reverse Complement</div>
                <div className="bg-gray-800 p-2 rounded font-mono text-sm text-purple-400 overflow-x-auto">
                  {data.results.reverseComplement}
                </div>
              </div>
            </div>
          </div>

          {data.results.orfs && data.results.orfs.length > 0 && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Open Reading Frames (ORFs)</h4>
              {data.results.orfs[0].message ? (
                <p className="text-gray-400 text-sm">{data.results.orfs[0].message}</p>
              ) : (
                <div className="space-y-2">
                  {data.results.orfs.map((orf, idx) => (
                    <div key={idx} className="bg-gray-800 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-white">Frame {orf.frame}</span>
                        <span className="text-sm text-gray-400">{orf.length} bp</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Position: {orf.start} - {orf.end}
                      </div>
                      <div className="bg-gray-900 p-2 rounded font-mono text-xs text-green-400 overflow-x-auto">
                        {orf.sequence}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Gene Expression Results */}
      {data.type === 'gene-expression' && data.results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{data.results.symbol}</h3>
                <p className="text-gray-300 mb-2">{data.results.name}</p>
                <p className="text-sm text-gray-400">{data.results.function}</p>
              </div>
              <TrendingUp className="text-primary" size={32} />
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Expression Levels Across Tissues</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.results.tissueExpression}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="tissue" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9CA3AF" label={{ value: 'TPM', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#F3F4F6' }}
                  formatter={(value) => [`${value} TPM`, 'Expression']}
                />
                <Bar dataKey="expression" fill="#16A085">
                  {data.results.tissueExpression.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${160 + index * 10}, 70%, ${50 - index * 2}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-white mb-2">Highest Expression</h5>
              <div className="text-2xl font-bold text-primary mb-1">{data.results.highestExpression.tissue}</div>
              <div className="text-gray-400">TPM: {data.results.highestExpression.expression}</div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-white mb-2">Lowest Expression</h5>
              <div className="text-2xl font-bold text-gray-400 mb-1">{data.results.lowestExpression.tissue}</div>
              <div className="text-gray-400">TPM: {data.results.lowestExpression.expression}</div>
            </div>
          </div>
        </div>
      )}

      {/* Protein Info Results */}
      {(data.type === 'protein-info' || data.type === 'protein-comparison') && data.results && (
        <div className="space-y-4">
          {data.type === 'protein-comparison' ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">{data.results.protein1.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Gene:</span> <span className="text-white">{data.results.protein1.gene}</span></div>
                    <div><span className="text-gray-400">Length:</span> <span className="text-white">{data.results.protein1.length}</span></div>
                    <div><span className="text-gray-400">PDB ID:</span> <span className="text-primary">{data.results.protein1.pdbId}</span></div>
                    <div><span className="text-gray-400">Function:</span> <span className="text-white">{data.results.protein1.function}</span></div>
                  </div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">{data.results.protein2.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Gene:</span> <span className="text-white">{data.results.protein2.gene}</span></div>
                    <div><span className="text-gray-400">Length:</span> <span className="text-white">{data.results.protein2.length}</span></div>
                    <div><span className="text-gray-400">PDB ID:</span> <span className="text-primary">{data.results.protein2.pdbId}</span></div>
                    <div><span className="text-gray-400">Function:</span> <span className="text-white">{data.results.protein2.function}</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-white mb-2">Comparison Analysis</h5>
                <p className="text-gray-300 mb-3">{data.results.comparison.functionalRelation}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Length Difference</div>
                    <div className="text-lg font-semibold text-white">{data.results.comparison.lengthDiff} aa</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Structural Similarity</div>
                    <div className="text-lg font-semibold text-white">{data.results.comparison.structuralSimilarity}%</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">{data.results.name}</h4>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><span className="text-gray-400">Gene:</span> <span className="text-white">{data.results.gene}</span></div>
                  <div><span className="text-gray-400">Length:</span> <span className="text-white">{data.results.length}</span></div>
                  <div><span className="text-gray-400">PDB ID:</span> <span className="text-primary">{data.results.pdbId}</span></div>
                  <div><span className="text-gray-400">Structure:</span> <span className="text-white">{data.results.structure}</span></div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Function:</div>
                  <div className="text-white">{data.results.function}</div>
                </div>
                {data.results.pathways && (
                  <div>
                    <div className="text-gray-400 mb-2">Pathways:</div>
                    <div className="flex flex-wrap gap-2">
                      {data.results.pathways.map((pathway, idx) => (
                        <span key={idx} className="bg-accent/30 border border-accent text-white px-3 py-1 rounded-full text-xs">
                          {pathway}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pathway Info Results */}
      {data.type === 'pathway-info' && data.results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 rounded-lg p-4">
            <h3 className="text-xl font-bold text-white mb-2">{data.gene} Pathways</h3>
            <p className="text-gray-300">{data.results.function}</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Biological Pathways</h4>
            <div className="grid gap-3">
              {data.results.pathways.map((pathway, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-gray-800 rounded p-3">
                  <CheckCircle className="text-accent" size={20} />
                  <span className="text-white">{pathway}</span>
                </div>
              ))}
            </div>
          </div>

          {data.results.diseases && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Associated Diseases</h4>
              <div className="flex flex-wrap gap-2">
                {data.results.diseases.map((disease, idx) => (
                  <span key={idx} className="bg-red-900/30 border border-red-700 text-red-300 px-3 py-1 rounded-full text-sm">
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Export Button */}
      <div className="flex justify-end pt-4 border-t border-gray-700">
        <button
          onClick={() => handleExport('json')}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Download size={16} />
          <span>Export Results (JSON)</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
