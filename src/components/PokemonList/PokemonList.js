import React from 'react';

export default function List({ props }) {
  return (
    <div className='list'>
      <p>{props.id}</p>
      <p>{props.name}</p>
      <img src={props.img} alt={props.imgName} />
    </div>
  );
}
