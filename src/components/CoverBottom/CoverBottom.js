import './CoverBottom.css';

export default function CoverBottom({ isOpen, setIsOpen, isInfoOpen, setIsInfoOpen }) {

  const onBackButtonClick = () => {
    if (isInfoOpen) {
      setIsInfoOpen(false);
    } else {
      return;
    };
  }

  const onCloseButtonClick = () => {
    setIsOpen(false);
  }

  return (
    <div className={`CoverBottom ${isOpen && 'CoverBottom_open'}`}>
      {isOpen && 
        <div className='CoverBottom__content'>
          <button className='CoverBottom__button' onClick={() => onBackButtonClick()}>back</button>
          <button className='CoverBottom__center-button'>mute</button>
          <button className='CoverBottom__button' onClick={() => onCloseButtonClick()}>close</button>
        </div>
      }
      <div className='CoverBottom__background' />
    </div>
  );
}
