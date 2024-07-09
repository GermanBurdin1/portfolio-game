import React from 'react';
import './Character.css';

const Character = ({ x, y }) => {
  return (
    <div className="character" style={{ left: `${x}px`, top: `${y}px` }}></div>
  );
};

export default Character;
