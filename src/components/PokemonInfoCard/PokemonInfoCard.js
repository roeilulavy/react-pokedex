import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import ProgressBar from "@ramonak/react-progress-bar";
import Pokeload from '../../images/Pokeball-gif.gif';
import Error from '../../images/gastly-404.gif';
import './PokemonInfoCard.css';

export default function PokemonInfo({ url, pokemonId, isInfoOpen, isMute }) {

  const {speak, cancel, speaking, voices} = useSpeechSynthesis();
  const voice = voices[1] || null;
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imageError, setImageError] = useState(false);
  const [typeColor, setTypeColor] = useState();
  const [color, setColor] = useState('');
  const ref = useRef();

  const [nameToRead, setNameToRead] = useState('');
  const [textToRead, setTextToRead] = useState('');
  const [arrayToRead, setArrayToRead] = useState([]);


  useEffect(() => {
    setId(pokemonId);
    const getPokemonDetails = async() => {
      return await axios.get(url + 'pokemon/' + id)
        .then(res => {
          setPokemonInfo(res.data);
        }).then(() => {
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
        });
    }
    getPokemonDetails();
  }, [url, isInfoOpen, pokemonId, id]);

  useEffect(() => {
    if (pokemonInfo === null) {
      return;
    } else {
      ref.current.scrollIntoView();
      setTypeColor(pokemonInfo.types[0].type.name);

      let string = pokemonInfo.name.replace(/[^a-zA-Z0-9Éé,.]/g, ', ');
      setNameToRead(string);
      console.log(string)

      const getImage = async() => {
        try {
          let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;

          return await axios.get(imageUrl)
            .then(res => {
              if (res.status === 200) {
                setImage(imageUrl);
                setImageError(false);
              } else {
                setImageError(true);
              }
            }).catch((err) => {
              console.log(err);
              setImageError(true);
            });
        } catch (err) {
          console.log(err);
          setImageError(true);
        }
      }

      const getDescription = async() => {
        let descriptionUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.id}`;

        let typeArray = [];
        pokemonInfo.types.map((type) => typeArray.push(type.type.name + ', '));

        setArrayToRead(typeArray);

        return await axios.get(descriptionUrl)
          .then((res) => {
            if(res.statusCode) {
              console.log(res.statusCode)
            }
            let descriptionData = res.data.flavor_text_entries[0].flavor_text;
            let string = descriptionData.replace(/[^a-zA-Z0-9Éé,.]/g, ' ');

            setDescription(string);
            setTextToRead(string);

          }).catch((err) => {
            console.log(err.response);
            setTextToRead('Description, Not found!');
            setDescription('Description not found...');
          });
      }

      getImage();
      getDescription();
    }
  }, [pokemonInfo, isInfoOpen]);

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

  useEffect(() => {
    if(!isInfoOpen) {
      if(speaking) {
        cancel();
      }
      setDescription('');
    }
  }, [cancel, isInfoOpen, speaking]);

  useEffect(() => {
    if (isMute || pokemonId !== id) {
      cancel();
      return;
    } else if (textToRead === '') {
      return;
    } else {
      setTimeout(() => {
        let text = nameToRead + ', Type: ' + arrayToRead + textToRead;
        speak({text: text, voice, rate: 0.8, pitch: 1});
      }, 500);
    }
  }, [textToRead, isMute, pokemonId]);

  return(
      <div className={isInfoOpen ? 'PokemonInfo' : 'PokemonInfo_close'}>
        {pokemonInfo ?
         <>
            <div className='PokemonInfo__header' ref={ref}>
              <img className='PokemonInfo__header-image' src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
              <h1 className='PokemonInfo__title'>#{pokemonInfo.id}  {pokemonInfo.name}</h1>
            </div>
          
            {imageError ?
              <img className='PokemonInfo__image' src={Error} alt={pokemonInfo.name} />
            :
              <img className='PokemonInfo__image' src={image} alt={pokemonInfo.name} />
            }

            <div className={`PokemonInfo__info-container ${pokemonInfo.types[0].type.name}`}>
              <div className='PokemonInfo__type-container'>
                <h2 className='PokemonInfo__type-h2'>Description</h2>
                <p className='PokemonInfo__body-p'>{description}</p>
              </div>

              <div className='PokemonInfo__body-container'>
                <p className='PokemonInfo__body-p'>height: {pokemonInfo.height / 10} m</p>
                <p className='PokemonInfo__body-p'>weight: {pokemonInfo.weight / 10} kg</p>
              </div>
            
              <div className='PokemonInfo__type-container'>
                <h2 className='PokemonInfo__type-h2'>Type</h2>
                <div className='PokemonInfo__type-type'>
                  {
                    pokemonInfo.types.map((type, index) => {
                      return(
                        <p key={index} className={`type ${type.type.name}`}>{type.type.name}</p>
                      );
                    })
                  }
                </div>
              </div>

              <div className='PokemonInfo__abilities-container'>
                <h2 className='PokemonInfo__type-h2'>Abilities</h2>
                <div className='PokemonInfo__ability-ability'>
                  {
                    pokemonInfo.abilities.map((ability, index) => {
                      return(
                        <h4 key={index} className='PokemonInfo__ability-name'>{ability.ability.name}</h4>
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
                  pokemonInfo.stats.map((stat, index) => {
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
        :
          (isLoading && <img className='PokemonInfo__loading' src={Pokeload} alt='Loading pokemon'/>)
        }
      </div>
    );
}
