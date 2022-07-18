import './Container.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonList from '../PokemonList/PokemonList';
import PokemonInfoCard from '../PokemonInfoCard/PokemonInfoCard';
import CloseBtn from '../../images/icon/close.png';

export default function Container({ url, isLoading, pokemonList, pokemonId, setPokemonId, isInfoOpen, setIsInfoOpen, searchInputOpen }) {
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
            pokemonList={pokemonList}
            setPokemonId={setPokemonId}
            isInfoOpen={isInfoOpen}
            setIsInfoOpen={setIsInfoOpen}
          />

          {pokemonId &&
            <PokemonInfoCard 
              url={url}
              pokemonId={pokemonId}
              isInfoOpen={isInfoOpen}
            />
          }
        </>
      }
    </div>
  );
}
