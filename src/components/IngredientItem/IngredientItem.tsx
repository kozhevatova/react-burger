import React from "react";
import classNames from "classnames";
import itemStyles from "./IngredientItem.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataItemProptypes } from "../../types/types";
import { useDispatch } from "react-redux";
import { ADD_ITEM } from "../../services/actions/order";
import { GET_INGREDIENT_DETAILS, OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredients";

const IngredientItem = ({
  item,
  setEscListener,
}: {
  item: any;
  setEscListener: any;
}) => {
  const textClassName = classNames(
    itemStyles.text,
    "text text_type_main-default"
  );
  const dispatch = useDispatch();
  const digitClassName = classNames(
    "text text_type_digits-default",
    itemStyles.digit,
    "mt-1 mb-1"
  );
  const handleCardClick = () => {
    setEscListener();
    dispatch({type: OPEN_INGREDIENT_MODAL});
    dispatch({ type: GET_INGREDIENT_DETAILS, item });
    dispatch({ type: ADD_ITEM, item });
  };

  return (
    <div className={itemStyles.card} onClick={handleCardClick}>
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
  setEscListener: PropTypes.func.isRequired,
};

export default IngredientItem;
