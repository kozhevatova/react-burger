import classNames from "classnames";
import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const item = useSelector((store: any) => store.ingredients.currentIngredient);
  const nameClassName = classNames(
    styles.name,
    "text text_type_main-medium",
    "mt-4"
  );
  const textClassName = classNames(
    styles.text,
    "text text_type_main-default"
  );
  const digitClassName = classNames(
    styles.text,
    "text text_type_digits-default"
  );
  return (
    <div className={styles.details}>
      <img className={styles.image} src={item.image} alt={item.name} />
      <p className={nameClassName}>{item.name}</p>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Калории, ккал</p>
        <p className={digitClassName}>{item.calories}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Белки, г</p>
        <p className={digitClassName}>{item.proteins}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Жиры, г</p>
        <p className={digitClassName}>{item.fat}</p>
      </div>
      <div className={styles.nutritionalValue}>
        <p className={textClassName}>Углеводы, г</p>
        <p className={digitClassName}>{item.carbohydrates}</p>
      </div>
    </div>
  );
};

export default IngredientDetails;