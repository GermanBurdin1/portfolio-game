import React from 'react';
import Game from './components/Game';
import './App.css';

const projects = [
  [
    { title: 'Project 1A', description: 'Description of project 1A', url: '#' },
    { title: 'Project 1B', description: 'Description of project 1B', url: '#' },
  ],
  [
    { title: 'Project 2A', description: 'Description of project 2A', url: '#' },
    { title: 'Project 2B', description: 'Description of project 2B', url: '#' },
  ],
  [
    { title: 'Project 3A', description: 'Description of project 3A', url: '#' },
    { title: 'Project 3B', description: 'Description of project 3B', url: '#' },
  ],
  [
    { title: 'Project 4A', description: 'Description of project 4A', url: '#' },
    { title: 'Project 4B', description: 'Description of project 4B', url: '#' },
  ],
  [
    { title: 'Project 5A', description: 'Description of project 5A', url: '#' },
    { title: 'Project 5B', description: 'Description of project 5B', url: '#' },
  ],
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
