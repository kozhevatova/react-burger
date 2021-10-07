import classNames from "classnames";
import React, { FC } from "react";
import styles from "./ingredient-details.module.css";
import { useSelectorHook } from "../../services/store";
import { IngredientType } from "../../types/types";
import { useParams } from "react-router";

const IngredientDetails:FC = () => {
  const ingredients = useSelectorHook((store) => store.ingredients.ingredients);
  const { id } = useParams<{ id?: string }>();
  const item = ingredients.find((item: IngredientType) => item._id === id);
  const nameClassName = classNames(
    styles.name,
    "text text_type_main-medium",
    "mt-4"
  );
  const textClassName = classNames(styles.text, "text text_type_main-default");
  const digitClassName = classNames(
    styles.text,
    "text text_type_digits-default"
  );
  return (
    <div className={styles.details}>
      <img className={styles.image} src={item && item.image ? item.image : ''} alt={item && item.name ? item.name : ''} />
      <p className={nameClassName}>{item && item.name ? item.name : ''}</p>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Калории, ккал</p>
        <p className={digitClassName}>{item && item.calories ? item.calories : 0}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Белки, г</p>
        <p className={digitClassName}>{item && item.proteins ? item.proteins : 0}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Жиры, г</p>
        <p className={digitClassName}>{item && item.fat ? item.fat : 0}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Углеводы, г</p>
        <p className={digitClassName}>{item && item.carbohydrates ? item.carbohydrates : 0}</p>
      </div>
    </div>
  );
};

export default IngredientDetails;
