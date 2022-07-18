import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

export default function PokemonList({ pokemonList, setPokemonId, isInfoOpen, setIsInfoOpen }) {
  return (
    <div className={isInfoOpen ? 'PokemonList_close' : 'PokemonList'}>
      {pokemonList.map((item, index) => {
        return (
          <PokemonListItem
            key={index}
            item={item}
            id={item.id}
            image={item.sprites.front_default}
            name={item.name}
            setPokemonId={pokemon => setPokemonId(pokemon.id)}
            setIsInfoOpen={setIsInfoOpen}
          />
        );
      })}
    </div>
  );
}
