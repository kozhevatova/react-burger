import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from "prop-types";
import mainStyles from "./Main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main = ({ setEscListener }: { setEscListener: any }) => {
  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients setEscListener={setEscListener} />
        <BurgerConstructor setEscListener={setEscListener} />
      </DndProvider>
      
    </main>
  );
};

Main.propTypes = {
  setEscListener: PropTypes.func.isRequired,
};

export default Main;
