import './CoverTop.css';

export default function CoverTop({ isOpen }) {
  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      {isOpen && 
        <div className='CoverTop__content'>

        </div>
      }
      <div className='CoverTop__background' />
    </div>
  );
}
