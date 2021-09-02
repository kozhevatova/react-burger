import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from "prop-types";
import mainStyles from "./Main.module.css";

const Main = ({
  handleIngredientModalOpen,
  handleMakeOrder,
}: {
  handleIngredientModalOpen: any;
  handleMakeOrder: any;
}) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients
        handleIngredientModalOpen={handleIngredientModalOpen}
      />
      <BurgerConstructor handleMakeOrder={handleMakeOrder} />
    </main>
  );
};

Main.propTypes = {
  handleIngredientModalOpen: PropTypes.func.isRequired,
  handleMakeOrder: PropTypes.func.isRequired,
};

export default Main;
