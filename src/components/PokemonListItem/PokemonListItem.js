import { useEffect, useState } from 'react';
import './PokemonListItem.css';
import Pokeload from '../../images/pokeball-jump.gif';

export default function PokemonItem({ item, id, image, name, setPokemonId, setIsInfoOpen }) {

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  function onPokemonClick(pokemonData) {
    setPokemonId(pokemonData);
    setIsInfoOpen(true);
  };

  useEffect(() => {
    if (image) {
      setIsImageLoading(false);
    };
    
    if (image === null) {
      setImageError(true);
    } else {
      setImageError(false);
    };
  }, [image]);

  return(
    <div className='PokemonItem' key={id} onClick={() => onPokemonClick(item)}>
    
      {isImageLoading ? 
        <img className='PokemonItem__image' src={Pokeload} alt='Loading pokemon'/>
      :
        <>
          <p className='PokemonItem__id'>{id}</p>
          {imageError ?
            <img className='PokemonItem__image' src={Pokeload} alt='Loading pokemon'/>
            :
            <img className='PokemonItem__image' src={image} alt={name}/>
          }
          <p className='PokemonItem__name'>{name}</p>
        </>
      }
      
    </div>
  );
}
