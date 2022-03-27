import React from 'react'
import Background from '../images/top.jpg';
import Prev from "../images/icon/undo.png";
import Search from "../images/icon/search.svg";
import Next from "../images/icon/redo.png";

const TopCover = () => {
  return (
    <div className='top-cover'>
      <img className='top-cover__background' src={Background} alt=""/>
      <div className='top-cover__container'>
        <img className='top-cover__button' src={Prev} alt='Prev'/>
        <img className='top-cover__button' src={Search} alt='Search'/>
        <img className='top-cover__button' src={Next} alt='Next'/>
      </div>
    </div>
  )
}

export default TopCover;
