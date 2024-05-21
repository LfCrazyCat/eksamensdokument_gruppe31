// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import PokeDetail from './pages/PokeDetail';
import Type from './pages/Type';
import SearchResult from './pages/SearchResult';
import Teams from './pages/Teams';
import pokeball from './assets/pokeball.png';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/searchresults/${searchQuery.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="container">
      <header>
        <nav>
          <img src={pokeball} alt="Pokeball" className="pokeball-icon" />
          <a href="/">UIN POKEDEX</a>
          <a href="/teams">TEAMS</a>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Søk etter pokemon"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/:type" element={<Type />} />
          <Route path="/searchresults/:pokemon" element={<SearchResult />} />
          <Route path="/pokemons/:pokemon" element={<PokeDetail />} />
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;