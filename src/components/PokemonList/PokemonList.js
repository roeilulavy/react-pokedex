import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

export default function PokemonList({ pokemonList, setPokemonId, isInfoOpen, setIsInfoOpen, searchKeyword }) {

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  function checkIfStringStartsWith(str, numbers) {
    return numbers.some(number => str.startsWith(number));
  };

  return (
    <div className={isInfoOpen ? 'PokemonList_close' : 'PokemonList'}>

      {pokemonList.filter((item) => {
        if (checkIfStringStartsWith(searchKeyword, numbers)) {
          let id = (item.id).toString();
          return id.includes(searchKeyword);
        } else {
          return item.name.toLowerCase().includes(searchKeyword);
        }
      }).map((item, index) => {
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
