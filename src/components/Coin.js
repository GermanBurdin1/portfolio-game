import React from 'react';
import './Coin.css';

const Coin = ({ x, y }) => {
  return (
    <div className="coin" style={{ left: `${x}px`, top: `${y}px` }}></div>
  );
};

export default Coin;
