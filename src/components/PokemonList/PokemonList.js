import { useState } from 'react';
import './PokemonList.css';
import Pokeload from '../../images/Pokeball-gif.gif';

export default function PokemonList() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='PokemonList'>
      {isLoading &&
        <img className='PokemonList__loader' src={Pokeload} alt='Loader'/>
      
      }
    </div>
  );
}
