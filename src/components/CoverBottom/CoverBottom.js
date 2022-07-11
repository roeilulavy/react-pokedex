import './CoverBottom.css';

export default function CoverBottom({ isOpen }) {
  return (
    <div className={`CoverBottom ${isOpen && 'CoverBottom_open'}`}>

    </div>
  );
}
