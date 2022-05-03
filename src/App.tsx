import { MoviesBuilder } from './features/movies/builders/MoviesBuilder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <MoviesBuilder />
        </span>
      </header>
    </div>
  );
}

export default App;
