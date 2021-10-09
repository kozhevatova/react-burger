import classNames from "classnames";
import React, { FC } from "react";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient-item-page.module.css";

const IngredientItemPage:FC = () => {
  const titleClassName = classNames(styles.title, "text text_type_main-large");

  return (
    <section className={styles.page}>
      <h1 className={titleClassName}>{ingredientDetailsTitle}</h1>
      <IngredientDetails />
    </section>
  );
};

export default IngredientItemPage;
