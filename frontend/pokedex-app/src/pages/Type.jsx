// pokedex-app/src/pages/Type.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// Import type symbols
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

const Type = () => {
  const { type } = useParams();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchType = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      setPokemons(response.data.pokemon);
    };
    fetchType();
  }, [type]);

  return (
    <section>
      <div className={`type-card ${type}`}>
        <img src={typeIcons[type.toLowerCase()]} alt={type} className="type-icon" />
        <h1>{type} Type</h1>
      </div>
      <div className="pokemon-grid">
        {pokemons.map((pokemonInfo) => (
          <Link key={pokemonInfo.pokemon.name} to={`/pokemons/${pokemonInfo.pokemon.name}`} className="pokemon-card">
            {pokemonInfo.pokemon.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Type;