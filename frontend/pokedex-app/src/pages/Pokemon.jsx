//pokedex-app/src/pages/Pokemon.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pokemon = () => {
  const { pokemon } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      setData(response.data);
    };
    fetchPokemon();
  }, [pokemon]);

  if (!data) return <div>Loading...</div>;

  return (
    <article>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <section>
        <h2>Types</h2>
        <ul>
          {data.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
          ))}
        </ul>
        </section>
      <section>
        <h2>Stats</h2>
        <ul>
          {data.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        </section>
      <section>
        <h2>Abilities</h2>
        <ul>
          {data.abilities.map((abilityInfo) => (
            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Pokemon;