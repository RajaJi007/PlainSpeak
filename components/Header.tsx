
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-block p-2 px-4 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 tracking-wider uppercase">
        AI Accessibility Specialist
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        PlainSpeak
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Turn confusing legal, medical, or official documents into clear, simple language anyone can understand.
      </p>
    </header>
  );
};

export default Header;
