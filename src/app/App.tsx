import React from 'react';
import RouterView from './router/RouterView';
import routes from './router/routes';
import './App.css';

const App: React.FC = () => (
  <div className="App" >
    <header className="App-header">
      <RouterView className="flex flex-col flex-grow mt-12 w-full" routes={routes} />
    </header>
  </div >
);

export default App;
