import React from "react";
import classNames from "classnames";
import itemStyles from "./IngredientItem.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataItemProptypes } from "../../utils/data";

const IngredientItem = ({ item }: { item: any }) => {
  const textClassName = classNames(
    itemStyles.text,
    "text text_type_main-default"
  );

  const digitClassName = classNames(
    "text text_type_digits-default",
    itemStyles.digit,
    "mt-1 mb-1"
  );
  return (
    <div className={itemStyles.card}>
      <Counter count={1} size="default" />
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
  item: dataItemProptypes.isRequired,
};

export default IngredientItem;
