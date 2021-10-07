import React, { FC } from "react";
import classNames from "classnames";
import styles from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  GET_INGREDIENT_DETAILS,
  OPEN_INGREDIENT_MODAL,
} from "../../services/actions/ingredients";
import { useDrag } from "react-dnd";
import { NavLink, useLocation } from "react-router-dom";
import { IngredientType, LocationState } from "../../types/types";
import { useAppDispatch } from "../../services/store";

const IngredientItem: FC<{item:IngredientType}> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return item;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const cardClassName = classNames(
    styles.card,
    `${isDragging && styles.dragCard}`
  );
  const textClassName = classNames(styles.text, "text text_type_main-default");
  const digitClassName = classNames(
    "text text_type_digits-default",
    styles.digit,
    "mt-1 mb-1"
  );
  const handleCardClick = () => {
    dispatch({ type: OPEN_INGREDIENT_MODAL });
    dispatch({ type: GET_INGREDIENT_DETAILS, item });
  };
  
  return (
    <NavLink
      to={{pathname: `/ingredients/${item._id}`, state: {background: location}}}
      className={cardClassName}
      onClick={handleCardClick}
      ref={dragRef}
      draggable
      id="ingredient"
    >
      {(item.qty > 0) && (<Counter count={item.qty} size="default" />)}
      <img src={item.image} alt={item.name} />
      <div className={styles.price}>
        <p className={digitClassName}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={textClassName}>{item.name}</p>
    </NavLink>
  );
};

export default IngredientItem;
