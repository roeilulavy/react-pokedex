import { useState } from 'react';
import './App.css';
import CoverTop from '../CoverTop/CoverTop';
import CoverBottom from '../CoverBottom/CoverBottom';
import PokemonList from '../PokemonList/PokemonList';

export default function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="App">
      <CoverTop isOpen={isOpen} />
      {
        isOpen ? 
          <PokemonList isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
        :
          <button className='App__button' onClick={() => setIsOpen(true)}>POKÉDEX</button>
      }
      <CoverBottom isOpen={isOpen} setIsOpen={setIsOpen} isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
    </div>
  );
}
