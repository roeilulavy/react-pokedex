import React, { useState } from "react";
import api from "../../utils/api";
import TopCover from "../CoverTop/CoverTop";
import BottomCover from "../CoverBottom/CoverBottom";
import Content from "../Content";
import '../index.css';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="page">
      <div className="page__wrapper">
        
      </div>
    </div>
  );
}

export default App;
