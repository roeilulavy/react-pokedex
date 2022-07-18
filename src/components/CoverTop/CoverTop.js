import { useEffect, useState } from 'react';
import './CoverTop.css';
import PrevBtn from '../../images/icon/undo.png';
import NextBtn from '../../images/icon/redo.png';
import SearchBtn from '../../images/icon/search.svg';

export default function CoverTop({ isOpen, isInfoOpen, searchInputOpen, setSearchInputOpen, onNextPokemonClick, onPrevPokemonClick }) {

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if(isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, 1000);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const onSearchClick = () => {
    if(isInfoOpen) return;
    setSearchInputOpen(!searchInputOpen);
  }

  const onNextClick = () => {
    if(!isInfoOpen) return;
    onNextPokemonClick();
  }

  const onPrevClick = () => {
    if(!isInfoOpen) return;
    onPrevPokemonClick()
  }

  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      {showContent && 
        <div className='CoverTop__content'>
          <button className='CoverTop__button' onClick={() => onPrevClick()}>
            <img className='CoverBottom__button-icon' src={PrevBtn} alt='Previous button'/>
          </button>
          <button className='CoverTop__center-button' onClick={() => onSearchClick()}>
            <img className='CoverBottom__button-icon' src={SearchBtn} alt='Previous button'/>
          </button>
          
          <button className='CoverTop__button' onClick={() => onNextClick()}>
            <img className='CoverBottom__button-icon' src={NextBtn} alt='Previous button'/>
          </button>
        </div>
      }
      <div className='CoverTop__background' />
    </div>
  );
}
