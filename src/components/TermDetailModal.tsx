import React from 'react';

interface Term {
  id: number;
  term: string;
  reading: string;
  category: string;
  description: string;
  example: string;
}

interface TermDetailModalProps {
  term: Term;
  onClose: () => void;
}

const TermDetailModal: React.FC<TermDetailModalProps> = ({ term, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-card max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-700 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="font-bold text-2xl text-primary-600 mb-2">{term.term}</h2>
        {term.reading && <p className="text-neutral-700 text-lg mb-2">読み: {term.reading}</p>}
        {term.category && <p className="text-neutral-700 text-sm mb-2">カテゴリ: {term.category}</p>}
        <p className="text-neutral-700 mb-4">{term.description}</p>
        {term.example && (
          <div className="bg-primary-200 p-3 rounded-lg text-neutral-700 text-sm italic">
            <p>例: {term.example}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermDetailModal;
