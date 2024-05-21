// pokedex-app/src/pages/PokeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/style.css";

const PokeDetail = () => {
  const { pokemon } = useParams();
  const [data, setData] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);

          const abilitiesData = await Promise.all(
            data.abilities.map(async (ability) => {
              const abilityResponse = await fetch(ability.ability.url);
              if (abilityResponse.ok) {
                const abilityData = await abilityResponse.json();
                return {
                  name: ability.ability.name,
                  effect: abilityData.effect_entries.find(
                    (entry) => entry.language.name === "en"
                  ).effect,
                  shortEffect: abilityData.effect_entries.find(
                    (entry) => entry.language.name === "en"
                  ).short_effect,
                };
              } else {
                console.error(`Failed to fetch ability data`);
                return {
                  name: ability.ability.name,
                  effect: "No effect information available",
                  shortEffect: "No short effect information available",
                };
              }
            })
          );
          setAbilities(abilitiesData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pokemon]);

  if (!data) return <p>Loading...</p>;

  return (
    <section className="pokeDetailContainer">
      <div className="pokeDetailHeader">
        <h1>{data.name}</h1>
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className={data.types[0].type.name} // Apply the type-specific background color
        />
      </div>
      <div className="pokeDetailBody">
        <div className="pokeTypes">
          <h2>TYPE(S)</h2>
          <ul>
            {data.types.map((type) => (
              <li key={type.slot} className={`type-container ${type.type.name}`}>
                <img
                  src={`/src/assets/type-symbols/${type.type.name}.png`}
                  alt={type.type.name}
                />
                <span className="type-name">{type.type.name}</span>
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
            <p>Short Effect: {ability.shortEffect}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokeDetail;