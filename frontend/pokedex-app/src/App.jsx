//pokedex-app/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/teams" component={Teams} />
        <Route path="/:type" component={Type} />
        <Route path="/searchresults/:pokemon" component={SearchResult} />
        <Route path="/pokemons/:pokemon" component={Pokemon} />
      </Switch>
    </Router>
  );
};

export default App;