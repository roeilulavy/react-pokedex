import axios from 'axios';
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Pokeload from '../../images/Pokeball-gif.gif';
import Error from '../../images/gastly-404.gif';
import './PokemonInfoCard.css';

export default function PokemonInfo({ url, pokemonId, isInfoOpen, setNameToRead, setTextToRead, setArrayToRead, setIsMute }) {

  const [isLoading, setIsLoading] = useState(true);  
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [typeColor, setTypeColor] = useState();
  const [color, setColor] = useState('');

  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonID, setPokemonID] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonImage, setPokemonImage] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonStats, setPokemonStats] = useState([]);

  useEffect(() => {
    setIsMute(true);
    setIsLoading(true);
    setImageLoading(true);

    const getPokemonDetails = async() => {
      return await axios.get(url + 'pokemon/' + pokemonId)
        .then(res => {
          setPokemonInfo(res.data);
        }).catch((err) => {
          console.log(err);
        });
    };
    getPokemonDetails();

  }, [pokemonId, setIsMute, url]);

  useEffect(() => {
    if(pokemonInfo === null) {
      return;
    } else {
      setPokemonID(pokemonInfo.id);
      setHeaderImage(pokemonInfo.sprites.front_default);
      setPokemonName(pokemonInfo.name);
      setPokemonHeight(pokemonInfo.height / 10);
      setPokemonWeight(pokemonInfo.weight / 10);
      setTypeColor(pokemonInfo.types[0].type.name);

      let pokemonTypeArray = [];
      pokemonInfo.types.map((type) => pokemonTypeArray.push(type.type.name));

      let pokemonTypeArrayToRead = [];
      pokemonInfo.types.map((type) => pokemonTypeArrayToRead.push(type.type.name + ', '));

      let pokemonAbilitiesArray = [];
      pokemonInfo.abilities.map((ability) => pokemonAbilitiesArray.push(ability.ability.name));

      let pokemonStatsArray = [];
      pokemonInfo.stats.map((stat) => pokemonStatsArray.push(stat));

      setPokemonTypes(pokemonTypeArray);
      setArrayToRead(pokemonTypeArrayToRead);
      setPokemonAbilities(pokemonAbilitiesArray);
      setPokemonStats(pokemonStatsArray);

      let string = pokemonInfo.name.replace(/[^a-zA-Z0-9Éé,.]/g, ', ');
      setNameToRead(string);

      const getImage = async() => {
        let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;
        return await axios.get(imageUrl)
          .then(res => {
            if(res.status === 200) {
              setPokemonImage(imageUrl);
              setImageLoading(false);
              setIsMute(false);
            }
          }).catch((err) => {
            console.log(err);
            setImageError(true);
          });
      };

      const getDescription = async() => {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.id}`)
          .then((res) => {
            let descriptionData = res.data.flavor_text_entries[0].flavor_text;
            let string = descriptionData.replace(/[^a-zA-Z0-9Éé,.]/g, ' ');

            setPokemonDescription(string);
            setTextToRead(string);
          }).catch((err) => {
            console.log(err.response);
            setPokemonDescription('Description not found...');
            setTextToRead('Description, Not found!');
          });
      };

      getImage();
      getDescription();

      setIsLoading(false);
    };
  }, [pokemonInfo, setIsMute, setNameToRead, setTextToRead, setArrayToRead]);

  useEffect(() => {
    switch(typeColor) {
      case 'normal':
        setColor('#d3d3af');
        break;
      
      case 'fighting':
        setColor('#d56723');
        break;
      
      case 'flying':
        setColor('#a1d1f8');
        break;
      
      case 'poison':
        setColor('#7fa8c9');
        break;
      
      case 'ground':
        setColor('#7c7e29');
        break;
      
      case 'rock':
        setColor('#a38c21');
        break;
      
      case 'bug':
        setColor('#729f3f');
        break;
      
      case 'ghost':
        setColor('#7b62a3');
        break;
      
      case 'steel':
        setColor('#9eb7b8');
        break;
      
      case 'fire':
        setColor('#fd7d24');
        break;
      
      case 'water':
        setColor('#4592c4');
        break;
      
        case 'grass':
        setColor('#9bcc50');
        break;
      
      case 'electric':
        setColor('#eed535');
        break;
      
      case 'psychic':
        setColor('#f366b9');
        break;
      
      case 'ice':
        setColor('#51c4e7');
        break;
      
      case 'dragon':
        setColor('#3d167c');
        break;
      
      case 'dark':
        setColor('#303030');
        break;
      
      case 'fairy':
        setColor('#fdb9e9');
        break;
      
      case 'unknown':
        setColor('#000');
        break;

      case 'shadow':
         setColor('#333');
         break;

      default:
        setColor('#ffffff');
    }
  }, [typeColor]);

  return(
    <div className={isInfoOpen ? 'PokemonInfo' : 'PokemonInfo_close'}>
      {
        isLoading ?
          <img className='PokemonInfo__loading' src={Pokeload} alt='Loading pokemon'/>
        :

        <>
          <div className='PokemonInfo__header'>
            <img className='PokemonInfo__header-image' src={headerImage} alt={pokemonName}/>
            <h1 className='PokemonInfo__title'>#{pokemonID}  {pokemonName}</h1>
          </div>

          {imageLoading ? 
            <img className='PokemonInfo__image' src={Pokeload} alt={'Loading..'}/>
            :
            (imageError ?
              <img className='PokemonInfo__image' src={Error} alt={'Error'}/>
              :
              <img className='PokemonInfo__image' src={pokemonImage} alt={pokemonName}/>
            )
          }
      
          <div className={`PokemonInfo__info-container ${typeColor}`}>
            <div className='PokemonInfo__type-container'>
              <h2 className='PokemonInfo__type-h2'>Description</h2>
              <p className='PokemonInfo__body-p'>{pokemonDescription}</p>
            </div>

            <div className='PokemonInfo__body-container'>
              <p className='PokemonInfo__body-p'>height: {pokemonHeight} m</p>
              <p className='PokemonInfo__body-p'>weight: {pokemonWeight} kg</p>
            </div>
      
            <div className='PokemonInfo__type-container'>
              <h2 className='PokemonInfo__type-h2'>Type</h2>
              <div className='PokemonInfo__type-type'>
                {
                  pokemonTypes.map((type, index) => {
                    return(
                      <p key={index} className={`type ${type}`}>{type}</p>
                    );
                  })
                }
              </div>
            </div>

            <div className='PokemonInfo__abilities-container'>
              <h2 className='PokemonInfo__type-h2'>Abilities</h2>
              <div className='PokemonInfo__ability-ability'>
                {
                  pokemonAbilities.map((ability, index) => {
                    return(
                      <h4 key={index} className='PokemonInfo__ability-name'>{ability}</h4>
                    );
                  })
                }
                </div>
            </div>
          </div>
    
          <div className='PokemonInfo__stats'>
            <h2 className='PokemonInfo__type-h2 stats-h2'>Base status</h2>
            <div className='PokemonInfo__stats-container'>
              {
                pokemonStats.map((stat, index) => {
                  return(
                    <div key={index}>
                      <p className='PokemonInfo__stats-name'>{stat.stat.name}</p>
                      <ProgressBar completed={stat.base_stat} maxCompleted={200} bgColor={color} borderRadius='5px' />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </>
      }
    </div>
  );
}
