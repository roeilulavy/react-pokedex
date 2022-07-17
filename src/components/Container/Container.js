import axios from 'axios';
import { useEffect, useState } from 'react';
import './Container.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonList from '../PokemonList/PokemonList';
import PokemonInfoCard from '../PokemonInfoCard/PokemonInfoCard';
import CloseBtn from '../../images/icon/close.png';

export default function Container({ isInfoOpen, setIsInfoOpen, searchInputOpen }) {

  const [url] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  //Get all pokemons
  useEffect(() => {
    const getAllPokemons = async () => {
      const res = await axios.get(url+'?limit=100000&offset=0');

      if (res) {
        getPokemons(res.data.results);
      };
    };

    const getPokemons = async (res) => {
      res.map(async (pokemon) => {
        const result = await axios.get(pokemon.url);

        if(result) {
          setData(state => {
            state = [...state, result.data];
            state.sort((a,b) => a.id > b.id ? 1:-1);
            return state;
          });
        };
      });
    };

    getAllPokemons();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, [url]);

  return(
    <div className='Container'>
      {isLoading ?
        <img className='PokemonList__loader' src={Pokeload} alt='Loader'/>
      :
        <>
          {searchInputOpen &&
            <div className='Container__search-container'>
              <input className='Container__search-input' type='text' placeholder='Enter Name or ID'/>
              <button className='Container__search-close'>
                <img className='Container__search-close-icon' src={CloseBtn} alt='Close button'/>
              </button>
            </div>
          }
          <PokemonList
            data={data}
            setPokemonInfo={setPokemonInfo}
            isInfoOpen={isInfoOpen}
            setIsInfoOpen={setIsInfoOpen}
          />

          {pokemonInfo &&
            <PokemonInfoCard 
              pokemonInfo={pokemonInfo}
              isInfoOpen={isInfoOpen}
            />
          }
        </>
      }
    </div>
  );
}
