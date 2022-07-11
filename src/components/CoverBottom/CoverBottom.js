import React, {useState} from 'react';
import Background from '../images/bottom.png';
import Back from '../images/icon/u-turn-left.png';
import Audio from '../images/icon/audio.png';
import Mute from '../images/icon/mute.png';
import Close from '../images/icon/close.png';
import './CoverBottom.css';

export default function BottomCover({ isOpen }) {
  
  const [audio, isAudio] = useState(false);

  return (
    <div className='bottom-cover'>
      {isOpen && 
        <div className='bottom-cover__container'>
          <img className='bottom-cover__button' src={Back} alt='Back'/>
          {isAudio ? (
            <img className='bottom-cover__button' src={Audio} alt='Audio'/>
          ) : (
            <img className='bottom-cover__button' src={Mute} alt='Audio'/>
          )}
          {/* <img className='bottom-cover__button' src={Audio} alt='Audio'/> */}
          <img className='bottom-cover__button' src={Close} alt='Close'/>
        </div>
      }
      <img className='bottom-cover__background' src={Background} alt=""/>
    </div>
  );
}
