import { useEffect, useState } from 'react';
import './CoverTop.css';
import PrevBtn from '../../images/icon/undo.png';
import NextBtn from '../../images/icon/redo.png';
import SearchBtn from '../../images/icon/search.svg';

export default function CoverTop({ isOpen, isInfoOpen, searchInputOpen, setSearchInputOpen }) {

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

  const onSearchClicked = () => {
    if(isInfoOpen) return;
    
    setSearchInputOpen(!searchInputOpen);
  }

  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      {showContent && 
        <div className='CoverTop__content'>
          <button className='CoverTop__button' >
            <img className='CoverBottom__button-icon' src={PrevBtn} alt='Previous button'/>
          </button>
          <button className='CoverTop__center-button' onClick={() => onSearchClicked()}>
            <img className='CoverBottom__button-icon' src={SearchBtn} alt='Previous button'/>
          </button>
          
          <button className='CoverTop__button' >
            <img className='CoverBottom__button-icon' src={NextBtn} alt='Previous button'/>
          </button>
        </div>
      }
      <div className='CoverTop__background' />
    </div>
  );
}
