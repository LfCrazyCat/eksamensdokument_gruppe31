// frontend/pokedex-app/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import normal from '../assets/type-symbols/Normal.png';
import fighting from '../assets/type-symbols/Fighting.png';
import flying from '../assets/type-symbols/Flying.png';
import poison from '../assets/type-symbols/Poison.png';
import ground from '../assets/type-symbols/Ground.png';
import rock from '../assets/type-symbols/Rock.png';
import bug from '../assets/type-symbols/Bug.png';
import ghost from '../assets/type-symbols/Ghost.png';
import steel from '../assets/type-symbols/Steel.png';
import fire from '../assets/type-symbols/Fire.png';
import water from '../assets/type-symbols/Water.png';
import grass from '../assets/type-symbols/Grass.png';
import electric from '../assets/type-symbols/Electric.png';
import psychic from '../assets/type-symbols/Psychic.png';
import ice from '../assets/type-symbols/Ice.png';
import dragon from '../assets/type-symbols/Dragon.png';
import dark from '../assets/type-symbols/Dark.png';
import fairy from '../assets/type-symbols/Fairy.png';

const typeIcons = {
  normal,
  fighting,
  flying,
  poison,
  ground,
  rock,
  bug,
  ghost,
  steel,
  fire,
  water,
  grass,
  electric,
  psychic,
  ice,
  dragon,
  dark,
  fairy,
};

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
          {pokemons.map((pokemon) => (
            <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`} className="pokemon-card">
              {pokemon.name}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title">TYPES</h2>
        <div className="types-grid">
          {types.map((type) => (
            <Link key={type.name} to={`/${type.name}`} className={`type-card ${type.name}`}>
              <img src={typeIcons[type.name.toLowerCase()]} alt={type.name} />
              {type.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;