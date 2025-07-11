import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TermDetailModal from './TermDetailModal'; // Will be created next

// Type definition for a single term
interface Term {
  id: number;
  term: string;
  reading: string;
  category: string;
  description: string;
  example: string;
}

const GlossaryPage: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  // Fetch terms from JSON
  useEffect(() => {
    fetch('/terms.json')
      .then(res => res.json())
      .then(data => setTerms(data));
  }, []);

  // Filter terms based on search input
  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.reading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  const handleCloseModal = () => {
    setSelectedTerm(null);
  };

  return (
    <div className="bg-bg-base min-h-screen p-4">
      <header className="flex items-center justify-between mb-4">
        <Link to="/" className="text-primary-600">{'<'} Back</Link>
        <h1 className="text-xl font-bold">用語集</h1>
        <div style={{ width: '40px' }}></div> {/* Spacer */}
      </header>

      {/* Search Bar */}
      <div className="mb-4">
        <input 
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-lg border border-neutral-200 bg-white"
        />
      </div>

      {/* Terms List */}
      <div className="space-y-2">
        {filteredTerms.map(term => (
          <div 
            key={term.id} 
            className="bg-white p-4 rounded-lg shadow-card cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => handleTermClick(term)}
          >
            <h2 className="font-bold text-lg text-primary-600">{term.term} <span className="text-sm text-neutral-700">({term.reading})</span></h2>
            <p className="text-sm text-neutral-700 mt-1">{term.description}</p>
          </div>
        ))}
      </div>

      {selectedTerm && (
        <TermDetailModal term={selectedTerm} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default GlossaryPage;