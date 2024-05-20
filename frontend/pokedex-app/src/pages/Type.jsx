//pokedex-app/src/pages/Type.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <div>
      <h1>{type} Type</h1>
      <ul>
        {pokemons.map((pokemonInfo) => (
          <li key={pokemonInfo.pokemon.name}>
            <Link to={`/pokemons/${pokemonInfo.pokemon.name}`}>
              {pokemonInfo.pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Type;