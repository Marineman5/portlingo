import { Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import GlossaryPage from './components/GlossaryPage';
import GameScreen from './components/GameScreen';
import ScoreScreen from './components/ScoreScreen';
import CharacterSelectScreen from './components/CharacterSelectScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/glossary" element={<GlossaryPage />} />
      <Route path="/character-select" element={<CharacterSelectScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/score" element={<ScoreScreen />} />
    </Routes>
  );
}

export default App;
