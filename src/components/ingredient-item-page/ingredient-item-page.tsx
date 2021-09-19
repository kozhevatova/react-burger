import classNames from "classnames";
import React from "react";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./ingredient-item-page.module.css";
import { useParams } from "react-router-dom";

const IngredientItemPage = () => {
  const { id } = useParams<{ id?: string }>();

  const titleClassName = classNames(styles.title, "text text_type_main-large");

  return (
    <section className={styles.page}>
      <h1 className={titleClassName}>{ingredientDetailsTitle}</h1>
      <IngredientDetails itemId={id} />
    </section>
  );
};

export default IngredientItemPage;
