//pokedex-app/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Type from './pages/Type';
import SearchResult from './pages/SearchResult';
import Teams from './pages/Teams';
import pokeball from './assets/pokeball.png';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <img src={pokeball} alt="Pokeball" className="pokeball-icon" />
          <a href="/">UIN POKEDEX</a>
          <a href="/teams">TEAMS</a>
          <input type="text" placeholder="Søk etter pokemon" />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/:type" element={<Type />} />
        <Route path="/searchresults/:pokemon" element={<SearchResult />} />
        <Route path="/pokemons/:pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
  );
};

export default App;