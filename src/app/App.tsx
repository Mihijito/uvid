import React from 'react';
import RouterView from './router/RouterView';
import routes from './router/routes';
import './App.css';

const App: React.FC = () => (
  <div className="App" >
    <RouterView className="flex flex-col flex-grow w-full" routes={routes} />
  </div >
);

export default App;
