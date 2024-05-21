//frontend/pokedex-app/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
      setPokemons(response.data.results);
    };
    fetchPokemons();
    
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };
    fetchTypes();
  }, []);

  return (
    <div className="home-container">
      <section>
        <h2 className="section-title">MAIN POKEMONS</h2>
        <div className="pokemon-grid">
          {pokemons.map((pokemon, index) => (
            <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`} className="pokemon-card">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
              <div>{pokemon.name}</div>
              <div>#{String(index + 1).padStart(3, '0')}</div>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title">TYPES</h2>
        <div className="types-grid">
          {types.map((type) => (
            <Link key={type.name} to={`/${type.name}`} className="type-card">
              {type.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;