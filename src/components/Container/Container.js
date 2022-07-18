import './Container.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonList from '../PokemonList/PokemonList';
import PokemonInfoCard from '../PokemonInfoCard/PokemonInfoCard';
import CloseBtn from '../../images/icon/close.png';

export default function Container({ url, isLoading, pokemonList, pokemonId, setPokemonId, isInfoOpen, setIsInfoOpen, searchInputOpen, searchKeyword, setSearchKeyword }) {

  const clearText = () => {
    setSearchKeyword('');
  }

  return(
    <div className='Container'>
      {isLoading ?
        <img className='PokemonList__loader' src={Pokeload} alt='Loader'/>
      :
        <>
          {searchInputOpen &&
            <div className={`${isInfoOpen ? 'Container__search-container_close' : 'Container__search-container'}`}>
              <input
                className='Container__search-input'
                type='text'
                placeholder='Enter Name or ID'
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
              <button className='Container__search-clear' onClick={() => clearText()}>
                <img className='Container__search-clear-icon' src={CloseBtn} alt='Close button'/>
              </button>
            </div>
          }
          <PokemonList
            pokemonList={pokemonList}
            setPokemonId={setPokemonId}
            isInfoOpen={isInfoOpen}
            setIsInfoOpen={setIsInfoOpen}
            searchKeyword={searchKeyword}
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
