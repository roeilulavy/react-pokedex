import './Container.css';
import Pokeload from '../../images/Pokeball-gif.gif';
import PokemonList from '../PokemonList/PokemonList';
import PokemonInfoCard from '../PokemonInfoCard/PokemonInfoCard';

export default function Container({ url, isLoading, pokemonList, pokemonId, setPokemonId, isInfoOpen, setIsInfoOpen, searchKeyword, setNameToRead, setTextToRead, setArrayToRead, setIsMute }) {
  return(
    <div className='Container'>
      {isLoading ?
        <img className='PokemonList__loader' src={Pokeload} alt='Loader'/>
      :
        <>
          <PokemonList
            pokemonList={pokemonList}
            setPokemonId={setPokemonId}
            isInfoOpen={isInfoOpen}
            setIsInfoOpen={setIsInfoOpen}
            searchKeyword={searchKeyword}
          />

          {pokemonId &&
            (isInfoOpen &&
              <PokemonInfoCard 
                url={url}
                pokemonId={pokemonId}
                isInfoOpen={isInfoOpen}
                setNameToRead={setNameToRead}
                setTextToRead={setTextToRead}
                setArrayToRead={setArrayToRead}
                setIsMute={setIsMute}
              />
            )
          }
        </>
      }
    </div>
  );
}
