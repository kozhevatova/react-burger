import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from "prop-types";
import mainStyles from "./Main.module.css";

const Main = ({ setEscListener }: { setEscListener: any }) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients setEscListener={setEscListener} />
      <BurgerConstructor setEscListener={setEscListener} />
    </main>
  );
};

Main.propTypes = {
  setEscListener: PropTypes.func.isRequired,
};

export default Main;
