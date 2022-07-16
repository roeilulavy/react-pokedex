import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

export default function PokemonList({ data, setPokemonInfo, setIsInfoOpen }) {

  return (
    <div className='PokemonList'>
      {data.map((item, index) => {
        return (
          <PokemonListItem
            key={index}
            item={item}
            id={item.id}
            image={item.sprites.front_default}
            name={item.name}
            setPokemonInfo={pokemon => setPokemonInfo(pokemon)}
            setIsInfoOpen={setIsInfoOpen}
          />
        )
      })}
    </div>
  );
}
