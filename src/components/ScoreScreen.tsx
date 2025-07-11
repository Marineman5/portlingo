import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScoreScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const handlePlayAgain = () => {
    navigate('/game');
  };

  return (
    <div className="bg-bg-base min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-card text-center">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">結果発表！</h1>
        <p className="text-xl text-neutral-700 mb-6">
          あなたのスコア: <span className="text-accent-500 font-bold">{score}</span> / {totalQuestions}
        </p>
        <button 
          onClick={handlePlayAgain}
          className="w-full bg-accent-500 text-white font-bold py-3 px-8 rounded-2xl shadow-card hover:opacity-90 transition-opacity"
        >
          もう一度プレイ
        </button>
      </div>
    </div>
  );
};

export default ScoreScreen;
