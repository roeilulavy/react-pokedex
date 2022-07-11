import React from 'react'
import Background from '../images/top.png';
import Prev from "../images/icon/undo.png";
import Search from "../images/icon/search.svg";
import Next from "../images/icon/redo.png";

export default function TopCover({ isOpen }) {
  return (
    <div className='top-cover'>
      <img className='top-cover__background' src={Background} alt=""/>
      {isOpen && 
        <div className='top-cover__container'>
          <img className='top-cover__button' src={Prev} alt='Prev'/>
          <img className='top-cover__button' src={Search} alt='Search'/>
          <img className='top-cover__button' src={Next} alt='Next'/>
        </div>
      }
    </div>
  );
}
