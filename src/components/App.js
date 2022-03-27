import React, { useState } from "react";
import api from "../utils/api";
import TopCover from "./TopCover";
import BottomCover from "./BottomCover";
import Content from "./Content";
import '../index.css';

function App() {

  return (
    <div className="page">
      <div className="page__wrapper">
        <TopCover />
        <Content />
        <BottomCover />
      </div>
    </div>
  );
}

export default App;
