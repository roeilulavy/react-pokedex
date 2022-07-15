import './CoverBottom.css';

export default function CoverBottom({ isOpen }) {
  return (
    <div className={`CoverBottom ${isOpen && 'CoverBottom_open'}`}>
      {isOpen && 
        <div className='CoverBottom__content'>
          <button className='CoverBottom__button' >back</button>
          <button className='CoverBottom__center-button' >search</button>
          <button className='CoverBottom__button' >next</button>
        </div>
      }
      <div className='CoverBottom__background' />
    </div>
  );
}
