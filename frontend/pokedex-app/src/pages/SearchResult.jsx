//pokedex-app/src/pages/SearchResult.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { pokemon } = useParams();
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        setResult(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    fetchSearchResult();
  }, [pokemon]);

  if (notFound) return <div>Pokemon not found</div>;
  if (!result) return <div>Loading...</div>;

  return (
    <div>
      <h1>{result.name}</h1>
      <img src={result.sprites.front_default} alt={result.name} />
      <div>
        <h2>Types</h2>
        <ul>
          {result.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Stats</h2>
        <ul>
          {result.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Abilities</h2>
        <ul>
          {result.abilities.map((abilityInfo) => (
            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResult;