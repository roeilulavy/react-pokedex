import './CoverBottom.css';

export default function CoverBottom({ isOpen }) {
  return (
    <div className={`CoverBottom ${isOpen && 'CoverBottom_open'}`}>
      {isOpen && 
        <div className='CoverBottom__content'>

        </div>
      }
      <div className='CoverBottom__background' />
    </div>
  );
}
