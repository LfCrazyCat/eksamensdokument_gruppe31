//pokedex-app/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Type from './pages/Type';
import SearchResult from './pages/SearchResult';
import Teams from './pages/Teams';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <a href="/">UIN POKEDEX</a>
          <a href="/teams">Teams</a>
          <input type="text" placeholder="Search..." />
          <button><img src="/assets/search-icon.png" alt="Search" /></button>
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