import { useEffect } from 'react';
import { useState } from 'react';
import './CoverBottom.css';
import BackBtn from '../../images/icon/u-turn-left.png';
import CloseBtn from '../../images/icon/close.png';
import MuteBtn from '../../images/icon/audio.png';

export default function CoverBottom({ isOpen, setIsOpen, isInfoOpen, setIsInfoOpen, setSearchInputOpen }) {

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

  const onBackButtonClick = () => {
    if (isInfoOpen) {
      setIsInfoOpen(false);
    } else {
      return;
    };
  }

  const onCloseButtonClick = () => {
    setSearchInputOpen(false);
    setIsInfoOpen(false);
    setIsOpen(false);
  }

  return (
    <div className={`CoverBottom ${isOpen && 'CoverBottom_open'}`}>
      {showContent && 
        <div className='CoverBottom__content'>
          <button className='CoverBottom__button' onClick={() => onBackButtonClick()}>
            <img className='CoverBottom__button-icon' src={BackBtn} alt='Back button'/>
          </button>

          <button className='CoverBottom__center-button'>
            <img className='CoverBottom__button-icon' src={MuteBtn} alt='Mute button'/>
          </button>

          <button className='CoverBottom__button' onClick={() => onCloseButtonClick()}>
            <img className='CoverBottom__button-icon' src={CloseBtn} alt='Close button'/>
          </button>
        </div>
      }
      <div className='CoverBottom__background' />
    </div>
  );
}
