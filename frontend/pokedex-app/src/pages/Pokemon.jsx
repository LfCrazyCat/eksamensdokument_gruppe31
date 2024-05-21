//pokedex-app/src/pages/Pokemon.jsx
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/styles.css"

const PokeDetail = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [abilities, setAbilities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        if (response.ok) {
          const data = await response.json()
          setPokemon(data)

          const abilitiesData = await Promise.all(
            data.abilities.map(async (ability) => {
              const abilityResponse = await fetch(ability.ability.url)
              if (abilityResponse.ok) {
                const abilityData = await abilityResponse.json()
                return {
                  name: ability.ability.name,
                  effect: abilityData.effect_entries.find(
                    (entry) => entry.language.name === "en"
                  ).effect,
                  shortEffect: abilityData.effect_entries.find(
                    (entry) => entry.language.name === "en"
                  ).short_effect,
                }
              } else {
                console.error(`Failed to fetch ability data`)
                return {
                  name: ability.ability.name,
                  effect: "No effect information available",
                  shortEffect: "No short effect information available",
                }
              }
            })
          )
          setAbilities(abilitiesData)
        } else {
          console.error("Failed to fetch data")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [name])

 
  if (!pokemon) {
    return <p>Loading...</p>
  }

  
  return (
    <section className="pokeDetailContainer">
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <section className="pokeTypeContainer">
        <h2>TYPE(S)</h2>
        <ul className="pokeType">
          {pokemon.types.map((type) => (
            <li key={type.slot}>{type.type.name}</li>
          ))}
        </ul>
        <h2>STATS</h2>
        <ul className="pokeStats">
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              <span>{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </section>
      <ul className="pokeAbility">
        <h3>ABILITIES</h3>
        {abilities.map((ability, index) => (
          <li key={index}>
            <strong>{ability.name}</strong>
            <p>Effect:{ability.effect}</p>
            <p>Short Effect:{ability.shortEffect}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PokeDetail