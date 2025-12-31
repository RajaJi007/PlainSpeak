
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import { simplifyText } from './services/geminiService';
import { SimplifiedResult } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SimplifiedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await simplifyText(inputText);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  const examples = [
    { label: "Legal Clause", text: "The Lessee shall indemnify and hold harmless the Lessor from and against any and all claims, damages, losses, and expenses, including but not limited to attorney's fees, arising out of or resulting from the Lessee's use of the premises." },
    { label: "Medical Note", text: "The patient presents with acute idiopathic thrombocytopenic purpura, necessitating immediate initiation of corticosteroid therapy and potential intravenous immunoglobulin administration to mitigate risk of spontaneous hemorrhage." },
    { label: "Policy Update", text: "In accordance with revised fiscal regulations, all discretionary expenditures exceeding the predefined threshold must be accompanied by comprehensive justifications and multi-tier departmental authorization." }
  ];

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Input Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 transition-all duration-300">
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Paste your complex text here
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="E.g., That long legal document or confusing medical report..."
            className="w-full h-48 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none text-lg leading-relaxed"
          />
          
          <div className="mt-4 flex flex-wrap gap-2 mb-8">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center mr-2">Try an example:</span>
            {examples.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setInputText(ex.text)}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors border border-transparent"
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSimplify}
              disabled={isLoading || !inputText.trim()}
              className={`flex-1 flex items-center justify-center py-4 px-8 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg ${
                isLoading || !inputText.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simplifying...
                </span>
              ) : (
                "Make it Simple"
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Loading / Error States */}
        {error && (
          <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-700 flex items-center gap-4 mb-10 animate-in fade-in zoom-in-95">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && <ResultCard result={result} />}

        {!result && !isLoading && !error && (
          <div className="text-center py-12 opacity-40">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-slate-500 font-medium italic">Your simplified explanation will appear here</p>
          </div>
        )}
      </main>

      {/* Persistent Call-to-Action / Info Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center justify-between shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide uppercase">Gemini 3 Powered</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Accessibility & Clarity Focused</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
