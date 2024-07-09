import React, { useState, useEffect } from 'react';
import Character from './Character';
import Coin from './Coin';
import Project from './Project';
import './Game.css';

const Game = ({ projects }) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [coins, setCoins] = useState(generateCoins(projects.length));
  const [collectedCoins, setCollectedCoins] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = characterPosition;
      if (e.key === 'ArrowUp') y -= 10;
      if (e.key === 'ArrowDown') y += 10;
      if (e.key === 'ArrowLeft') x -= 10;
      if (e.key === 'ArrowRight') x += 10;

      setCharacterPosition({ x, y });

      coins.forEach((coin, index) => {
        if (Math.abs(x - coin.x) < 20 && Math.abs(y - coin.y) < 20) {
          setCollectedCoins((prev) => [...prev, index]);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [characterPosition, coins]);

  return (
    <div className="game">
      <Character x={characterPosition.x} y={characterPosition.y} />
      {coins.map((coin, index) =>
        collectedCoins.includes(index) ? null : (
          <Coin key={index} x={coin.x} y={coin.y} />
        )
      )}
      <div className="projects">
        {collectedCoins.map((index) => (
          <Project key={index} project={projects[index]} />
        ))}
      </div>
    </div>
  );
};

const generateCoins = (num) => {
  const coins = [];
  for (let i = 0; i < num; i++) {
    coins.push({
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
    });
  }
  return coins;
};

export default Game;
