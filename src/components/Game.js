import React, { useState, useEffect } from 'react';
import Character from './Character';
import Coin from './Coin';
import ProjectList from './ProjectList';
import './Game.css';

const Game = ({ projects }) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [coins, setCoins] = useState(generateCoins(projects.length));
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = characterPosition;
      if (e.key === 'ArrowUp') y -= 10;
      if (e.key === 'ArrowDown') y += 10;
      if (e.key === 'ArrowLeft') x -= 10;
      if (e.key === 'ArrowRight') x += 10;

      setCharacterPosition({ x, y });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [characterPosition]);

  return (
    <div className="game">
      <Character x={characterPosition.x} y={characterPosition.y} />
      {coins.map((coin, index) => (
        <div
          key={index}
          className="coin-container"
          onMouseEnter={() => setHoveredProjectIndex(index)}
          onMouseLeave={() => setHoveredProjectIndex(null)}
        >
          <Coin x={coin.x} y={coin.y} />
          {hoveredProjectIndex === index && (
            <ProjectList projects={projects[index]} />
          )}
        </div>
      ))}
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
