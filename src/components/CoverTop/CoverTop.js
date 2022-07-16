import './CoverTop.css';

export default function CoverTop({ isOpen }) {
  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      {isOpen && 
        <div className='CoverTop__content'>
          <button className='CoverTop__button' >P</button>
          <button className='CoverTop__center-button' >S</button>
          <button className='CoverTop__button' >N</button>
        </div>
      }
      <div className='CoverTop__background' />
    </div>
  );
}
