import axios from 'axios';
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
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
            <h1 className='PokemonInfo__title'>#{data.id}  {data.name}</h1>
          </div>
          
          <img className='PokemonInfo__image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />

          <div className={`PokemonInfo__info-container ${data.types[0].type.name}`}>
            <div className='PokemonInfo__body-container'>
              <p className='PokemonInfo__body-p'>height: {data.height / 10} m</p>
              <p className='PokemonInfo__body-p'>weight: {data.weight / 10} kg</p>
            </div>
          
            <div className='PokemonInfo__type-container'>
              <h2 className='PokemonInfo__type-h2'>Type</h2>
              <div className='PokemonInfo__type-type'>
                {
                  data.types.map((type) => {
                    return(
                      <p className={`type ${type.type.name}`}>{type.type.name}</p>
                    );
                  })
                }
              </div>
            </div>

            <div className='PokemonInfo__abilities-container'>
              <h2 className='PokemonInfo__type-h2'>Abilities</h2>
              <div className='PokemonInfo__ability-ability'>
                {
                  data.abilities.map((ability) => {
                    return(
                      <h4 className='PokemonInfo__ability-name'>{ability.ability.name}</h4>
                    )
                  })
                }
                </div>
            </div>
          </div>
          
          <div className='PokemonInfo__stats'>
            <h2 className='PokemonInfo__type-h2 stats-h2'>Base status</h2>
            <div className='PokemonInfo__stats-container'>
              {
                data.stats.map((stat) => {
                  return(
                    <>
                      <p className='PokemonInfo__stats-name'>{stat.stat.name}</p>
                      <ProgressBar completed={stat.base_stat} maxCompleted={200} />
                    </>
                  )
                })
              }
            </div>
          </div>
        </div>
      )}
    </>
    
  )
}