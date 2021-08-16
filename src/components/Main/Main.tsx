import React from 'react';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import mainStyles from './Main.module.css';

const Main = () => {
  
  return(
    <main className={mainStyles.main}>
      <BurgerIngredients/>
      <BurgerConstructor />
    </main>
  );
}

export default Main;