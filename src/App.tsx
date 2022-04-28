import React from 'react';
import logo from './logo.svg';
import { MoviesManager } from './features/movies/MoviesManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>
          <MoviesManager />
        </span>
      </header>
    </div>
  );
}

export default App;
