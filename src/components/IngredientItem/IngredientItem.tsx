import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import itemStyles from "./IngredientItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ item }) => {
  const textClassName = classNames(
    itemStyles.text,
    "text text_type_main-default"
  );

  const digitClassName = classNames(
    "text text_type_digits-default",
    itemStyles.digit,
    'mt-1 mb-1'
  );
  return (
    <div className={itemStyles.card}>
      <img src={item.image} alt={item.name} />
      <div className={itemStyles.price}>
        <p className={digitClassName}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={textClassName}>{item.name}</p>
    </div>
  );
};

IngredientItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientItem;
