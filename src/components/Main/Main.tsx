import React from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PropTypes from "prop-types";
import mainStyles from "./Main.module.css";
import { dataItemProptypes } from "../../utils/utils";

const Main = ({
  data,
  handleIngredientModalOpen,
}: {
  data: any;
  handleIngredientModalOpen: any;
}) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={data} handleIngredientModalOpen={handleIngredientModalOpen}/>
      <BurgerConstructor data={data} />
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
  handleIngredientModalOpen: PropTypes.func.isRequired,
};

export default Main;
