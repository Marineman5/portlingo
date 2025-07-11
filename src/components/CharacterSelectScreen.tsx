import React from 'react';
import { Link } from 'react-router-dom';

interface Character {
  id: string;
  name: string;
  description: string;
  image: string; // Placeholder for character image
}

const characters: Character[] = [
  {
    id: 'supervisor',
    name: '監督',
    description: '現場を仕切るベテラン。厳しいが頼りになる。',
    image: 'https://via.placeholder.com/100x100?text=監督',
  },
  {
    id: 'local_aunt',
    name: '地方配属のおばさん',
    description: '港町の情報通。世間話からヒントがもらえるかも？',
    image: 'https://via.placeholder.com/100x100?text=おばさん',
  },
  {
    id: 'customer',
    name: 'お客さん',
    description: '貨物のことで困っている様子。丁寧な対応が求められる。',
    image: 'https://via.placeholder.com/100x100?text=お客さん',
  },
];

const CharacterSelectScreen: React.FC = () => {
  return (
    <div className="bg-bg-base min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-primary-600 mb-8">相手を選んで勝負！</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {characters.map(character => (
          <Link 
            key={character.id} 
            to={`/game?character=${character.id}`}
            className="bg-white p-6 rounded-2xl shadow-card flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold text-neutral-700 mb-2">{character.name}</h2>
            <p className="text-sm text-neutral-700">{character.description}</p>
          </Link>
        ))}
      </div>
      <Link to="/" className="mt-8 text-primary-600 text-lg">{'<'} スタート画面に戻る</Link>
    </div>
  );
};

export default CharacterSelectScreen;
