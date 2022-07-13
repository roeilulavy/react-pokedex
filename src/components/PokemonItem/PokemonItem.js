import './PokemonItem.css';
import Pokeload from '../../images/pokeball-jump.gif';

export default function PokemonItem({ isPokemonLoading, item, id, image, name, infoPokemon, setIsInfoOpen }) {

  function onPokemonClick(item) {
    infoPokemon(item);
    setIsInfoOpen(true);
  }

  return(
    <div className='PokemonItem' key={id} onClick={() => onPokemonClick(item)}>
      {isPokemonLoading ? 
        <img className='PokemonItem__image' src={Pokeload} alt='Loading pokemon'/>
      :
        <>
          <p className='PokemonItem__id' >{id}</p>
          {image ? <img className='PokemonItem__image' src={image} alt={name}/> : <img className='PokemonItem__image' src={Pokeload} alt='Loading pokemon'/>}
          <p className='PokemonItem__name'>{name}</p>
        </>
      }
      
    </div>
  );
}