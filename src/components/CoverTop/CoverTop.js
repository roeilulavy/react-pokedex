import './CoverTop.css';

export default function CoverTop({ isOpen }) {
  return (
    <div className={`CoverTop ${isOpen && 'CoverTop_open'}`}>
      <div className='CoverTop__content'>

      </div>
    </div>
  );
}
