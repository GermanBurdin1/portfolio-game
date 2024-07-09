import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = ({ projects }) => {
  const [characterPosition, setCharacterPosition] = useState({ top: 0, left: 0 });
  const [coinPositions, setCoinPositions] = useState([
    { top: 100, left: 100 },
    { top: 200, left: 200 },
    { top: 300, left: 300 },
    { top: 400, left: 400 },
    { top: 500, left: 500 },
  ]);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);

  const handleKeyPress = (event) => {
    const { top, left } = characterPosition;
    switch (event.key) {
      case 'ArrowUp':
        setCharacterPosition({ top: Math.max(top - 10, 0), left });
        break;
      case 'ArrowDown':
        setCharacterPosition({ top: Math.min(top + 10, 590), left });
        break;
      case 'ArrowLeft':
        setCharacterPosition({ top, left: Math.max(left - 10, 0) });
        break;
      case 'ArrowRight':
        setCharacterPosition({ top, left: Math.min(left + 10, 590) });
        break;
      default:
        break;
    }
  };

  const checkCollision = () => {
    const character = document.querySelector('.character');
    coinPositions.forEach((coin, index) => {
      const coinElement = document.querySelector(`.coin-${index}`);
      if (!character || !coinElement) return;

      const characterRect = character.getBoundingClientRect();
      const coinRect = coinElement.getBoundingClientRect();

      if (
        characterRect.top < coinRect.bottom &&
        characterRect.bottom > coinRect.top &&
        characterRect.left < coinRect.right &&
        characterRect.right > coinRect.left
      ) {
        setHoveredProjectIndex(index);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [characterPosition]);

  useEffect(() => {
    checkCollision();
  }, [characterPosition]);

  return (
    <div className="game">
      <div className="character" style={characterPosition}></div>
      {coinPositions.map((coin, index) => (
        <div
          key={index}
          className={`coin coin-${index}`}
          style={coin}
          onMouseEnter={() => setHoveredProjectIndex(index)}
          onMouseLeave={() => setHoveredProjectIndex(null)}
        ></div>
      ))}
      {hoveredProjectIndex !== null && (
        <div className="projects-list">
          {projects[hoveredProjectIndex].map((project, idx) => (
            <div key={idx} className="project">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.url}>Learn More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
