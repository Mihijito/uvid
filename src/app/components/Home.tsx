import React from 'react';
import logo from '../../assets/logo.svg';

const Home: React.FC = () => (
  <div className="mt-12 mb-12 flex flex-col items-center">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
        </p>
    <div className="my-12">
      SUP
        </div>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
        </a>
  </div>
);

export default Home;
