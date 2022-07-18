import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import './PokemonInfoCard.css';

export default function PokemonInfo({ url, pokemonId, isInfoOpen }) {

  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [typeColor, setTypeColor] = useState();
  const [color, setColor] = useState('');
  const ref = useRef();

  useEffect(() => {
    

    const getPokemonDetails = async() => {
      return await axios.get(url + 'pokemon/' + pokemonId)
        .then(res => {
          console.log(res.data);
          setPokemonInfo(res.data);
        }).catch((err) => {
          console.log(err);
        })
    }
    getPokemonDetails();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonInfo === null) {
      return;
    } else {
      ref.current.scrollIntoView();
      setTypeColor(pokemonInfo.types[0].type.name);
    }
  }, [pokemonInfo]);

  useEffect(() => {
    switch(typeColor) {
      case 'normal':
        setColor('#d3d3af');
        break;
      
      case 'fighting':
        setColor('#d56723');
        break;
      
      case 'flying':
        setColor('#a1d1f8');
        break;
      
      case 'poison':
        setColor('#7fa8c9');
        break;
      
      case 'ground':
        setColor('#7c7e29');
        break;
      
      case 'rock':
        setColor('#a38c21');
        break;
      
      case 'bug':
        setColor('#729f3f');
        break;
      
      case 'ghost':
        setColor('#7b62a3');
        break;
      
      case 'steel':
        setColor('#9eb7b8');
        break;
      
      case 'fire':
        setColor('#fd7d24');
        break;
      
      case 'water':
        setColor('#4592c4');
        break;
      
        case 'grass':
        setColor('#9bcc50');
        break;
      
      case 'electric':
        setColor('#eed535');
        break;
      
      case 'psychic':
        setColor('#f366b9');
        break;
      
      case 'ice':
        setColor('#51c4e7');
        break;
      
      case 'dragon':
        setColor('#3d167c');
        break;
      
      case 'dark':
        setColor('#303030');
        break;
      
      case 'fairy':
        setColor('#fdb9e9');
        break;
      
      case 'unknown':
        setColor('#000');
        break;

      case 'shadow':
         setColor('#333');
         break;

      default:
        setColor('#ffffff');
    }
  }, [typeColor]);

  return(
    <>
      {(!pokemonInfo) ? "" : (
        <div className={isInfoOpen ? 'PokemonInfo' : 'PokemonInfo_close'}>
          <div className='PokemonInfo__header' ref={ref}>
            <img className='PokemonInfo__header-image' src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
            <h1 className='PokemonInfo__title'>#{pokemonInfo.id}  {pokemonInfo.name}</h1>
          </div>
          
          <img className='PokemonInfo__image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`} alt={pokemonInfo.name} />

          <div className={`PokemonInfo__info-container ${pokemonInfo.types[0].type.name}`}>
            <div className='PokemonInfo__body-container'>
              <p className='PokemonInfo__body-p'>height: {pokemonInfo.height / 10} m</p>
              <p className='PokemonInfo__body-p'>weight: {pokemonInfo.weight / 10} kg</p>
            </div>
          
            <div className='PokemonInfo__type-container'>
              <h2 className='PokemonInfo__type-h2'>Type</h2>
              <div className='PokemonInfo__type-type'>
                {
                  pokemonInfo.types.map((type, index) => {
                    return(
                      <p key={index} className={`type ${type.type.name}`}>{type.type.name}</p>
                    );
                  })
                }
              </div>
            </div>

            <div className='PokemonInfo__abilities-container'>
              <h2 className='PokemonInfo__type-h2'>Abilities</h2>
              <div className='PokemonInfo__ability-ability'>
                {
                  pokemonInfo.abilities.map((ability, index) => {
                    return(
                      <h4 key={index} className='PokemonInfo__ability-name'>{ability.ability.name}</h4>
                    );
                  })
                }
                </div>
            </div>
          </div>
          
          <div className='PokemonInfo__stats'>
            <h2 className='PokemonInfo__type-h2 stats-h2'>Base status</h2>
            <div className='PokemonInfo__stats-container'>
              {
                pokemonInfo.stats.map((stat, index) => {
                  return(
                    <div key={index}>
                      <p className='PokemonInfo__stats-name'>{stat.stat.name}</p>
                      <ProgressBar completed={stat.base_stat} maxCompleted={200} bgColor={color} borderRadius='5px' />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className='PokemonInfo__spacer' />
        </div>
      )}
    </>
  );
}
