import './CoverTop.css';

export default function CoverTop({ isOpen }) {
  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      {isOpen && 
        <div className='CoverTop__content'>
          <button className='CoverTop__button' >back</button>
          <button className='CoverTop__center-button' >search</button>
          <button className='CoverTop__button' >next</button>
        </div>
      }
      <div className='CoverTop__background' />
    </div>
  );
}
