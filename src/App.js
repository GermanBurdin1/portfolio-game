import React from 'react';
import Game from './components/Game';
import './App.css';

const projects = [
  { title: 'Project 1', description: 'Description of project 1' },
  { title: 'Project 2', description: 'Description of project 2' },
];

const App = () => {
  return (
    <div className="App">
      <h1>Portfolio Game</h1>
      <Game projects={projects} />
    </div>
  );
};

export default App;

