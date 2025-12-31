
import React from 'react';
import { SimplifiedResult } from '../types';

interface ResultCardProps {
  result: SimplifiedResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">The Big Idea</h2>
        <p className="text-2xl font-medium leading-tight">
          {result.summary}
        </p>
      </div>

      <div className="p-8 space-y-10">
        {/* Key Points */}
        <section>
          <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
              ✓
            </span>
            The Most Important Parts
          </h3>
          <ul className="grid gap-3">
            {result.keyPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-emerald-500 font-bold">•</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* What this means for you */}
        <section className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
          <h3 className="flex items-center text-xl font-bold text-blue-900 mb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              👤
            </span>
            What this means for you
          </h3>
          <p className="text-lg text-blue-800 leading-relaxed italic">
            "{result.whatItMeans}"
          </p>
        </section>

        {/* What you need to do next */}
        <section>
          <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
              ➔
            </span>
            What you need to do next
          </h3>
          <div className="space-y-3">
            {result.whatToDo.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Word Definitions */}
        {result.definitions.length > 0 && (
          <section className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
              Vocabulary Helper
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.definitions.map((def, idx) => (
                <div key={idx} className="group relative cursor-help">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm border border-slate-200 hover:bg-slate-200 transition-colors">
                    {def.word}
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                    <p className="font-bold mb-1">{def.word}:</p>
                    {def.meaning}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
