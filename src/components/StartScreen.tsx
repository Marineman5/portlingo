import React from 'react';
import { Link } from 'react-router-dom';

const StartScreen: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-base"
    >
      <header className="absolute top-0 left-0 w-full p-4 flex justify-center">
        {/* Tab for Glossary */}
        <div className="tabs">
          <Link 
            to="/glossary" 
            className="tab tab-bordered text-primary-600 border-primary-600 hover:bg-primary-200 hover:text-primary-600 rounded-lg px-4 py-2"
          >
            用語集
          </Link>
        </div>
      </header>

      <main className="text-center mt-auto mb-16 flex flex-col items-center">
        {/* Call to Action - Play Game Button */}
        <Link 
          to="/character-select" 
          className="bg-accent-500 text-white font-bold py-3 px-8 rounded-2xl shadow-card hover:opacity-90 transition-opacity inline-block mb-8"
        >
          Play Game
        </Link>

        {/* gamestart image */}
        <img src="/gamestart.png" alt="Portlingo Start Screen" className="w-full max-w-xs object-contain" />
      </main>
    </div>
  );
};

export default StartScreen;