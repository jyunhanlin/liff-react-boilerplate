import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { liffContext } from './hooks/useLiff';

function App() {
  const liffCxt = useContext(liffContext);
  console.log(liffCxt);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Building React with LIFFv2
        </a>
      </header>
    </div>
  );
}

export default App;
