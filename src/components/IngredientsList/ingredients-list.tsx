import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredients-list.module.css";
import classNames from "classnames";
import { dataItemProptypes } from "../../types/types";

const IngredientsList = ({
  anchorId,
  title,
  data,
  setEscListener,
}: {
  anchorId: string;
  title: string;
  data: any;
  setEscListener: any;
}) => {
  const titleClassName = classNames(
    "text text_type_main-medium",
    styles.title
  );

  return (
    <div className={styles.ingredients} id={anchorId}>
      <h2 className={titleClassName}>{title}</h2>
      <ul className={styles.list}>
        {data.map((item: any, index: number) => {
          return (
            <IngredientItem
              item={item}
              key={item._id + index}
              setEscListener={setEscListener}
            />
          );
        })}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
  title: PropTypes.string.isRequired,
  anchorId: PropTypes.string.isRequired,
  setEscListener: PropTypes.func.isRequired,
};

export default IngredientsList;
