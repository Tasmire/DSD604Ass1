import { React, useState } from 'react';
import './App.css';
import MainGame from './components/MainGame';

import Select from 'react-select';
import { selectCustomStyles } from './utilities/SelectReactSetting';

function App() {
  return (
    <MainGame />
  );
};

export default App;
