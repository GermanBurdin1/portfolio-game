import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = ({ projects }) => {
  const [characterPosition, setCharacterPosition] = useState({ top: 60, left: 20 });
  const [coinPositions, setCoinPositions] = useState([
    { top: 80, left: 150 },
    { top: 220, left: 90 },
    { top: 350, left: 270 },
    { top: 470, left: 90 },
    { top: 590, left: 270 },
  ]);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [karma, setKarma] = useState(() => parseInt(localStorage.getItem('karma')) || 0);
  const [visitedProjects, setVisitedProjects] = useState(() => JSON.parse(localStorage.getItem('visitedProjects')) || []);
  const [hasAura, setHasAura] = useState(false);

  useEffect(() => {
    localStorage.setItem('karma', karma);
    localStorage.setItem('visitedProjects', JSON.stringify(visitedProjects));
  }, [karma, visitedProjects]);

  const mazeWalls = [
    { top: 50, left: 0, width: 600, height: 10 },
    { top: 50, left: 0, width: 10, height: 600 },
    { top: 650, left: 0, width: 600, height: 10 },
    { top: 50, left: 590, width: 10, height: 600 },
    { top: 100, left: 50, width: 400, height: 10 },
    { top: 100, left: 50, width: 10, height: 150 },
    { top: 200, left: 50, width: 350, height: 10 },
    { top: 200, left: 440, width: 10, height: 90 },
    { top: 290, left: 150, width: 290, height: 10 },
    { top: 400, left: 50, width: 290, height: 10 },
    { top: 400, left: 440, width: 10, height: 90 },
    { top: 490, left: 150, width: 290, height: 10 },
    { top: 600, left: 50, width: 400, height: 10 },
  ];

  const handleKeyPress = (event) => {
    const { top, left } = characterPosition;

    const moveCharacter = (newTop, newLeft) => {
      if (!isCollidingWithWalls(newTop, newLeft)) {
        setCharacterPosition({ top: newTop, left: newLeft });
      }
    };

    if (hoveredProjectIndex === null) {
      switch (event.key) {
        case 'ArrowUp':
          moveCharacter(top - 10, left);
          break;
        case 'ArrowDown':
          moveCharacter(top + 10, left);
          break;
        case 'ArrowLeft':
          moveCharacter(top, left - 10);
          break;
        case 'ArrowRight':
          moveCharacter(top, left + 10);
          break;
        default:
          break;
      }
    } else {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedProjectIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : projects[hoveredProjectIndex].items.length - 1
          );
          break;
        case 'ArrowDown':
          setSelectedProjectIndex((prevIndex) =>
            prevIndex < projects[hoveredProjectIndex].items.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          setHoveredProjectIndex(null);
          setSelectedProjectIndex(null);
          break;
        case 'Enter':
          if (selectedProjectIndex !== null) {
            const projectId = `${hoveredProjectIndex}-${selectedProjectIndex}`;
            if (!visitedProjects.includes(projectId)) {
              setVisitedProjects([...visitedProjects, projectId]);
              setKarma(karma + 1);
            }
            setHasAura(true);
            setTimeout(() => setHasAura(false), 1000); // Убрать ауру через 1 секунду
            window.location.href = projects[hoveredProjectIndex].items[selectedProjectIndex].url;
          }
          break;
        default:
          break;
      }
    }
  };

  const isCollidingWithWalls = (newTop, newLeft) => {
    const character = { top: newTop, left: newLeft, width: 20, height: 20 };
    return mazeWalls.some((wall) => {
      return !(
        character.top + character.height <= wall.top ||
        character.top >= wall.top + wall.height ||
        character.left + character.width <= wall.left ||
        character.left >= wall.left + wall.width
      );
    });
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
      } else if (hoveredProjectIndex === index) {
        setHoveredProjectIndex(null);
        setSelectedProjectIndex(null);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [characterPosition, hoveredProjectIndex, selectedProjectIndex, karma, visitedProjects]);

  useEffect(() => {
    checkCollision();
  }, [characterPosition]);

  return (
    <div className="game">
      <div className="karma-counter">Karma: {karma}</div>
      <div className={`character ${hasAura ? 'aura' : ''}`} style={characterPosition}>
        <i className="fas fa-walking"></i>
      </div>
      {coinPositions.map((coin, index) => (
        <div
          key={index}
          className={`coin coin-${index}`}
          style={coin}
          onMouseEnter={() => setHoveredProjectIndex(index)}
          onMouseLeave={() => {
            setHoveredProjectIndex(null);
            setSelectedProjectIndex(null);
          }}
        ></div>
      ))}
      {mazeWalls.map((wall, index) => (
        <div
          key={index}
          className="wall"
          style={{ top: wall.top, left: wall.left, width: wall.width, height: wall.height }}
        ></div>
      ))}
      {hoveredProjectIndex !== null && (
        <div
          className="projects-list"
          style={{
            top: coinPositions[hoveredProjectIndex].top + 20,
            left: coinPositions[hoveredProjectIndex].left + 20,
          }}
          onMouseEnter={() => setHoveredProjectIndex(hoveredProjectIndex)}
          onMouseLeave={() => {
            setHoveredProjectIndex(null);
            setSelectedProjectIndex(null);
          }}
        >
          <h3>{projects[hoveredProjectIndex].category}</h3>
          {projects[hoveredProjectIndex].items.map((project, idx) => (
            <div
              key={idx}
              className={`project ${selectedProjectIndex === idx ? 'selected' : ''}`}
              onClick={() => window.location.href = project.url}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.url}>{project.url}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
