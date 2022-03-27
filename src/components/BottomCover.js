import React from 'react'
import Background from '../images/bottom.jpg';
import Back from '../images/icon/u-turn-left.png';
import Audio from '../images/icon/audio.png';
import Mute from '../images/icon/mute.png';
import Close from '../images/icon/close.png';

const BottomCover = () => {
  return (
    <div className='bottom-cover'>
      <div className='bottom-cover__container'>
        <img className='bottom-cover__button' src={Back} alt='Back'/>
        <img className='bottom-cover__button' src={Audio} alt='Audio'/>
        <img className='bottom-cover__button' src={Close} alt='Close'/>
      </div>
      <img className='bottom-cover__background' src={Background} alt=""/>
    </div>
  )
}

export default BottomCover;
