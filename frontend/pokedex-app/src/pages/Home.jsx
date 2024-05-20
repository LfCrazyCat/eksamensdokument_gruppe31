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
    <div>
      <section>
        <h2>Main Pokemons</h2>
        <div>
          {pokemons.map((pokemon) => (
            <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`}>
              {pokemon.name}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2>Types</h2>
        <div>
          {types.map((type) => (
            <Link key={type.name} to={`/${type.name}`}>
              {type.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;