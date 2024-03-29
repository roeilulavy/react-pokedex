import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './App.css';
import CoverTop from '../CoverTop/CoverTop';
import CoverBottom from '../CoverBottom/CoverBottom';
import Container from '../Container/Container';

export default function App() {

  const [url] = useState('https://pokeapi.co/api/v2/');

  const {speak, cancel, voices} = useSpeechSynthesis();
  const voice = voices[1] || null;

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonId, setPokemonId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [searchInputOpen, setSearchInputOpen] =useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [nameToRead, setNameToRead] = useState('');
  const [textToRead, setTextToRead] = useState('');
  const [arrayToRead, setArrayToRead] = useState([]);

  useEffect(() => {
    const getAllPokemons = async () => {
      const res = await axios.get(url + 'pokemon/?limit=100000&offset=0');

      if (res) {
        getPokemons(res.data.results);
      };
    };

    const getPokemons = async (res) => {
      res.map(async (pokemon) => {
        const result = await axios.get(pokemon.url);

        if(result) {
          setPokemonList(state => {
            state = [...state, result.data];
            state.sort((a,b) => a.id > b.id ? 1:-1);
            return state;
          });
        };
      });
    };

    getAllPokemons();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [url]);

  const onNextPokemonClick = () => {
    if (pokemonId === pokemonList.length) return;

    let next = pokemonId + 1;
    setPokemonId(next);
  };

  const onPrevPokemonClick = () => {
    if (pokemonId === 1) return;

    let prev = pokemonId - 1;
    setPokemonId(prev);
  };

  const resetTextToSpech = () => {
    setTextToRead('');
    setTextToRead('');
    setArrayToRead([]);
  }

  useEffect(() => {
    if (nameToRead === '' || textToRead === '' || arrayToRead.length === 0) {
      return;
    } else if (!isInfoOpen || !isOpen) {
      resetTextToSpech();
      cancel();
    } else if (isMute) {
      cancel();
    } else {
      setTimeout(() => {
        let text = nameToRead + ', Type: ' + arrayToRead + textToRead;
        speak({text: text, voice, rate: 0.8, pitch: 1});
      }, 500);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoOpen, isMute, textToRead]);

  return (
    <div className="App">
      <CoverTop
        isOpen={isOpen}
        isInfoOpen={isInfoOpen}
        searchInputOpen={searchInputOpen}
        setSearchInputOpen={setSearchInputOpen}
        onNextPokemonClick={onNextPokemonClick}
        onPrevPokemonClick={onPrevPokemonClick}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {
        isOpen ? 
          <Container
            url={url}
            isLoading={isLoading}
            pokemonList={pokemonList}
            pokemonId={pokemonId}
            setPokemonId={setPokemonId}
            isInfoOpen={isInfoOpen}
            setIsInfoOpen={setIsInfoOpen}
            searchInputOpen={searchInputOpen}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            setIsMute={setIsMute}
            setNameToRead={setNameToRead}
            setTextToRead={setTextToRead}
            setArrayToRead={setArrayToRead}
          />
        :
          <button className='App__button' onClick={() => setIsOpen(true)}>POKÉDEX</button>
      }
      <CoverBottom
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isInfoOpen={isInfoOpen}
        setIsInfoOpen={setIsInfoOpen}
        setSearchInputOpen={setSearchInputOpen}
        isMute={isMute}
        setIsMute={setIsMute}
      />
    </div>
  );
}
