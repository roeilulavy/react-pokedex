import { useEffect, useState } from 'react';
import './PokemonListItem.css';
import Pokeload from '../../images/pokeball-jump.gif';

export default function PokemonItem({ item, id, image, name, setPokemonId, setIsInfoOpen }) {

  const [isImageLoading, setIsImageLoading] = useState(false);

  function onPokemonClick(pokemonData) {
    setPokemonId(pokemonData);
    setIsInfoOpen(true);
  }

  useEffect(() => {
    if (image) {
      setIsImageLoading(false)
    }
  }, [image]);

  return(
    <div className='PokemonItem' key={id} onClick={() => onPokemonClick(item)}>
      {isImageLoading ? 
        <img className='PokemonItem__image' src={Pokeload} alt='Loading pokemon'/>
      :
        <>
          <p className='PokemonItem__id' >{id}</p>
          <img className='PokemonItem__image' src={image} alt={name}/>
          <p className='PokemonItem__name'>{name}</p>
        </>
      }
      
    </div>
  );
}