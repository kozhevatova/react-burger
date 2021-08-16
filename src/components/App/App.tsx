import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import appStyles from './App.module.css';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <Main/>
    </div>
  );
}

export default App;
