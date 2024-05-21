// pokedex-app/src/pages/Pokemon.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const Pokemon = () => {
  const { pokemon } = useParams();
  const [data, setData] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      setData(response.data);

      const abilitiesData = await Promise.all(
        response.data.abilities.map(async (ability) => {
          const abilityResponse = await axios.get(ability.ability.url);
          const effectEntry = abilityResponse.data.effect_entries.find(
            (entry) => entry.language.name === 'en'
          );
          return {
            name: ability.ability.name,
            effect: effectEntry.effect,
            shortEffect: effectEntry.short_effect,
          };
        })
      );
      setAbilities(abilitiesData);
    };
    fetchPokemon();
  }, [pokemon]);

  if (!data) return <div>Loading...</div>;

  return (
    <article className="pokeDetailContainer">
      <div className="pokeDetailHeader">
        <h1>{data.name}</h1>
        <img src={data.sprites.other['official-artwork'].front_default} alt={data.name} />
      </div>
      <div className="pokeDetailBody">
        <div className="pokeTypes">
          <h2>TYPE(S)</h2>
          <ul className="pokeType">
            {data.types.map((type) => (
              <li key={type.type.name} className={`type-badge ${type.type.name}`}>
                <img src={typeIcons[type.type.name.toLowerCase()]} alt={type.type.name} className="type-icon" />
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokeStats">
          <h2>STATS</h2>
          <ul>
            {data.stats.map((stat, index) => (
              <li key={index}>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pokeAbilities">
        <h2>ABILITIES</h2>
        {abilities.map((ability, index) => (
          <div key={index} className="ability">
            <strong>{ability.name}</strong>
            <p>Effect: {ability.effect}</p>
            <p>Short effect: {ability.shortEffect}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Pokemon;