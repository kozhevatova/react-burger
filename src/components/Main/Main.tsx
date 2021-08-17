import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from 'prop-types';
import mainStyles from "./Main.module.css";

const Main = ({data}:{data:Array<Object>}) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(Object),
}

export default Main;
