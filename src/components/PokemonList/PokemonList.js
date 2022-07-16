import axios from 'axios';
import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonItem from '../PokemonItem/PokemonItem';
import PokemonInfo from '../PokemonInfo/PokemonInfo';

export default function PokemonList({ isInfoOpen, setIsInfoOpen }) {

  const [pokedata, setPokedata] = useState([]);
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);
  const [url] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scroll, setScroll] = useState(0);

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
          setIsPokemonLoading(false);
          setPokedata(state => {
            state = [...state, result.data];
            state.sort((a,b) => a.id > b.id ? 1:-1);
            return state;
          });
        };
      });
    };

    setTimeout(() => {
      getAllPokemons();
    }, 1000);
  }, [url]);

  useEffect(() => {
    if(!isInfoOpen) {
      console.log(isInfoOpen);
      window.scrollTo(0, 50000)
    }
  }, [isInfoOpen])

  const onitemClick = () => {
    console.log(scroll);
    setScrollPosition(scroll);
  }

  return (
    <div id='PokemonList' className='PokemonList' onScroll={(e) => setScroll(e.target.scrollTop)}>
      {isLoading ?
        (<img className='PokemonList__loader' src={Pokeload} alt='Loader'/>)
      :
        (!isInfoOpen ?
          <div className='PokemonList__container'>
            {pokedata.map((item, index) => {
              return (
                <PokemonItem
                  isPokemonLoading={isPokemonLoading}
                  key={index}
                  item={item}
                  id={item.id}
                  image={item.sprites.front_default}
                  name={item.name}
                  infoPokemon={poke => setInfo(poke)}
                  setIsInfoOpen={setIsInfoOpen}
                  onitemClick={onitemClick}
                />
              )
            })}
          </div>
          :
          <PokemonInfo data={info} />
          )
      }
    </div>
  );
}
