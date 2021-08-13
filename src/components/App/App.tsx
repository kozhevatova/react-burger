import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import appStyles from './App.module.css';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <BurgerConstructor/>
      <BurgerIngredients/>
    </div>
  );
}

export default App;
