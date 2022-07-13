import axios from 'axios';
import { useEffect, useState } from 'react';
import './PokemonInfo.css';

export default function PokemonInfo({ data }) {

  const [url] = useState(`https://pokeapi.co/api/v2/evolution-chain/${data.id}`);


  useEffect(() => {
    const getEvolutions = async () => {
      const res = await axios.get(url);

      if (res) {
        console.log(res.data)
      }
    }

    getEvolutions();
  }, [url])

  return(
    <>
      {(!data) ? "" : (
        <div className='PokemonInfo'>
          <div className='PokemonInfo__header'>
            <img src={data.sprites.front_default} alt={data.name} />
            <p className='PokemonInfo__title'>#{data.id}  {data.name}</p>
          </div>
          
          <img className='PokemonInfo__image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />
          <h2>height: {data.height} m</h2>
          <h2>weight: {data.weight} kg</h2>
          <div className='PokemonInfo__type'>
            {
              data.types.map((type, index) => {
                return(
                  <div className={type.type.name}>
                    <h4 key={index}>{type.type.name}</h4>
                  </div>
                )
              })
            }
          </div>
          <div className='PokemonInfo__abilities'>
            {
              data.abilities.map((ability, index) => {
                return(
                  <div className='PokemonInfo__ability-name'>
                    <h4 key={index}>{ability.ability.name}</h4>
                  </div>
                )
              })
            }
          </div>
          <div className='PokemonInfo__stats'>
            {
              data.stats.map((stat, index) => {
                return(
                  <div className='PokemonInfo__ability-name'>
                    <h6 key={index}>{stat.stat.name}: {stat.base_stat}</h6>
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
    </>
    
  )
}