import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Term {
  id: number;
  term: string;
  reading: string;
  category: string;
  description: string;
  example: string;
}

interface Question {
  term: string;
  correctAnswer: string;
  options: string[];
}

const TIME_LIMIT = 15; // seconds per question
const INITIAL_LIVES = 3;

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const characterId = queryParams.get('character');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<number | null>(null); // Changed NodeJS.Timeout to number

  const characterNames: { [key: string]: string } = {
    supervisor: '監督',
    local_aunt: '地方配属のおばさん',
    customer: 'お客さん',
  };
  const selectedCharacterName = characterId ? characterNames[characterId] : '相手';

  useEffect(() => {
    fetch('/terms.json')
      .then(res => res.json())
      .then(data => {
        // setAllTerms(data); // Removed as it's not used
        generateQuestions(data);
      });
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !isAnswered) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!); // Clear timer when time runs out
            handleTimeout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, questions, isAnswered]);

  const generateQuestions = (terms: Term[]) => {
    const shuffledTerms = [...terms].sort(() => 0.5 - Math.random());
    const generatedQuestions: Question[] = [];

    for (let i = 0; i < 10 && i < shuffledTerms.length; i++) { // Generate up to 10 questions
      const currentTerm = shuffledTerms[i];
      const correctAnswer = currentTerm.description;

      const incorrectOptions: string[] = [];
      const otherTerms = terms.filter(t => t.id !== currentTerm.id);

      // Select 3 random incorrect options, ensuring uniqueness and not being the correct answer
      while (incorrectOptions.length < 3) {
        const randomTerm = otherTerms[Math.floor(Math.random() * otherTerms.length)];
        if (randomTerm && !incorrectOptions.includes(randomTerm.description) && randomTerm.description !== correctAnswer) {
          incorrectOptions.push(randomTerm.description);
        }
      }

      const options = [...incorrectOptions, correctAnswer].sort(() => 0.5 - Math.random());
      generatedQuestions.push({
        term: currentTerm.term,
        correctAnswer: correctAnswer,
        options: options,
      });
    }
    setQuestions(generatedQuestions);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    } else {
      setLives(prevLives => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          // Game over
          navigate('/score', { state: { score: score, totalQuestions: questions.length } });
        }
        return newLives;
      });
    }
  };

  const handleTimeout = () => {
    setIsAnswered(true);
    setSelectedOption('タイムアウト'); // Indicate timeout
    setLives(prevLives => {
      const newLives = prevLives - 1;
      if (newLives <= 0) {
        // Game over
        navigate('/score', { state: { score: score, totalQuestions: questions.length } });
      }
      return newLives;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(TIME_LIMIT); // Reset timer for next question
    } else {
      // Game over, navigate to score screen
      navigate('/score', { state: { score: score, totalQuestions: questions.length } });
    }
  };

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-bg-base">Loading Quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-bg-base min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-card">
        <div className="flex justify-between items-center mb-4">
          <p className="text-neutral-700">残り時間: <span className="font-bold text-accent-500">{timeLeft}</span>秒</p>
          <p className="text-neutral-700">ライフ: <span className="font-bold text-primary-600">{'❤️'.repeat(lives)}</span></p>
        </div>
        
        <h2 className="text-xl font-bold text-neutral-700 mb-4">
          {selectedCharacterName}「{currentQuestion.term}」って、どういう意味か知ってる？
        </h2>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-3 rounded-lg border text-left 
                ${isAnswered 
                  ? (option === currentQuestion.correctAnswer 
                    ? 'bg-green-200 border-green-500' 
                    : (option === selectedOption ? 'bg-red-200 border-red-500' : 'bg-neutral-100 border-neutral-200'))
                  : 'bg-neutral-100 border-neutral-200 hover:bg-neutral-200'
                }
                ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <button 
            onClick={handleNextQuestion}
            className="w-full bg-accent-500 text-white font-bold py-3 px-8 rounded-2xl shadow-card hover:opacity-90 transition-opacity"
          >
            {currentQuestionIndex < questions.length - 1 ? '次の問題' : '結果を見る'}
          </button>
        )}
      </div>
    </div>
  );
};

export default GameScreen;