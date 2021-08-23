import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from "prop-types";
import mainStyles from "./Main.module.css";
import { dataItemProptypes } from "../../types/types";

const Main = ({
  data,
  handleIngredientModalOpen,
  handleOrderModalOpen,
}: {
  data: any;
  handleIngredientModalOpen: any;
  handleOrderModalOpen: any;
}) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients
        data={data}
        handleIngredientModalOpen={handleIngredientModalOpen}
      />
      <BurgerConstructor
        data={data}
        handleOrderModalOpen={handleOrderModalOpen}
      />
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
  handleIngredientModalOpen: PropTypes.func.isRequired,
  handleOrderModalOpen: PropTypes.func.isRequired,
};

export default Main;
