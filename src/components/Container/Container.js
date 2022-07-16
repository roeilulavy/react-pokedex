import axios from 'axios';
import { useEffect, useState } from 'react';
import './Container.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonList from '../PokemonList/PokemonList';
import PokemonInfoCard from '../PokemonInfoCard/PokemonInfoCard';

export default function Container({ isInfoOpen, setIsInfoOpen }) {

  const [url] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState();

  useEffect(() => {
    const getAllPokemons = async () => {
      const res = await axios.get(url+'?limit=100000&offset=0');

      if (res) {
        getPokemons(res.data.results);
        setIsLoading(false);
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

    // setTimeout(() => {

    // }, 1000);
  }, [url]);

  useEffect(() => {
    if(!isInfoOpen) {
      console.log(isInfoOpen);
      
    }
  }, [isInfoOpen]);

  return(
    <div className='Container'>
      {isLoading ?
        (<img className='PokemonList__loader' src={Pokeload} alt='Loader'/>)
      :
        (!isInfoOpen ?
          <PokemonList
            data={data}
            setPokemonInfo={setPokemonInfo}
            setIsInfoOpen={setIsInfoOpen}
          />
          :
          <PokemonInfoCard
            pokemonInfo={pokemonInfo}
          />
        )
      }

    </div>
  );
}