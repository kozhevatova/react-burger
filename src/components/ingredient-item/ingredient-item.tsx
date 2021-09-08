import React from "react";
import classNames from "classnames";
import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataItemProptypes } from "../../types/types";
import { useDispatch } from "react-redux";
import { GET_INGREDIENT_DETAILS, OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredients";
import { useDrag } from "react-dnd";

const IngredientItem = ({
  item,
  setEscListener,
}: {
  item: any;
  setEscListener: any;
}) => {
  const dispatch = useDispatch();
  const [{isDragging},dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return item ;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const cardClassName = classNames(
    styles.card,
    `${isDragging && styles.dragCard}`
  )
  const textClassName = classNames(
    styles.text,
    "text text_type_main-default"
  );
  const digitClassName = classNames(
    "text text_type_digits-default",
    styles.digit,
    "mt-1 mb-1"
  );
  const handleCardClick = () => {
    setEscListener();
    dispatch({type: OPEN_INGREDIENT_MODAL});
    dispatch({ type: GET_INGREDIENT_DETAILS, item });
  };


  return (
    <div className={cardClassName} onClick={handleCardClick} ref={dragRef} draggable>
      {item.qty > 0 && <Counter count={item.qty} size="default" />}
      <img src={item.image} alt={item.name} />
      <div className={styles.price}>
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
