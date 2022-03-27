import React from 'react';

const List = (props) => {
  return (
    <div className='list'>
      <p>{props.id}</p>
      <p>{props.name}</p>
      <img src={props.img} alt={props.imgName} />
    </div>
  )
}

export default List;
