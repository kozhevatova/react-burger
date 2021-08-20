import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from 'prop-types';
import mainStyles from "./Main.module.css";
import { dataItemProptypes } from "../../utils/data";

const Main = ({data}:{data:any}) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
}

export default Main;
