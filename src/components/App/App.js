import { useState } from 'react';
import './App.css';
import CoverTop from '../CoverTop/CoverTop';
import CoverBottom from '../CoverBottom/CoverBottom';
import PokemonList from '../PokemonList/PokemonList';

export default function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <CoverTop isOpen={isOpen} />
      <button className={`App__button ${isOpen && 'App__button_open'}`} onClick={() => setIsOpen(true)}>POKÉDEX</button>
      {isOpen && <PokemonList />}
      <CoverBottom isOpen={isOpen} />
    </div>
  );
}
