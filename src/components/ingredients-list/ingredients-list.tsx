import React, { FC } from "react";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredients-list.module.css";
import classNames from "classnames";
import { IIngredientList, IngredientType } from "../../types/types";

const IngredientsList:FC<IIngredientList> = ({
  anchorId,
  title,
  data,
}) => {
  const titleClassName = classNames("text text_type_main-medium", styles.title);

  return (
    <div className={styles.ingredients} id={anchorId}>
      <h2 className={titleClassName}>{title}</h2>
      <ul className={styles.list}>
        {data.map((item: IngredientType, index: number) => {
          return (
            <IngredientItem
              item={item}
              key={item._id + index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientsList;
