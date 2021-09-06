import React, { useMemo, useCallback } from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  ADD_ITEM,
  makeOrder,
  SWAP_INGREDIENTS,
} from "../../services/actions/order";
import { useDispatch, useSelector } from "react-redux";
import Bun from "../Bun/Bun";
import { useDrop } from "react-dnd";
import FillingItem from "../FillingItem/FillingItem";
import {
  INCREASE_COUNT,
  RESET_COUNT,
} from "../../services/actions/ingredients";

const BurgerConstructor = ({ setEscListener }: { setEscListener: any }) => {
  const { orderedIngredients, totalPrice } = useSelector((store: any) => ({
    ...store.order,
  }));
  const dispatch = useDispatch();

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({ type: ADD_ITEM, item });
      dispatch({ type: INCREASE_COUNT, item });
    },
  });
  const digitClassName = classNames("text text_type_digits-medium", "mr-2");
  const containerClassName = classNames(
    burgerConstructorStyles.burgerConstructor,
    `${isHover && burgerConstructorStyles.hoveredContainer}`
  );
  const handleMakeOrderClick = () => {
    setEscListener();
    dispatch({ type: RESET_COUNT });
    dispatch(makeOrder(orderedIngredients));
  };

  const swapIngredients = useCallback(
    (dragIndex: any, hoverIndex: any) => {
      const draggedItem = orderedIngredients.filling[dragIndex];
      const swappedFilling = [...orderedIngredients.filling];
      swappedFilling.splice(dragIndex, 1);
      swappedFilling.splice(hoverIndex, 0, draggedItem);
      dispatch({ type: SWAP_INGREDIENTS, filling: swappedFilling });
    },
    [dispatch, orderedIngredients.filling]
  );

  const content = useMemo(() => {
    return (
      orderedIngredients.filling &&
      orderedIngredients.filling.length > 0 &&
      orderedIngredients.filling.map((item: any, index: number) => {
        return (
          <FillingItem
            key={item.uid}
            index={index}
            swapIngredients={swapIngredients}
            {...item}
          />
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedIngredients]);

  return (
    <section className={containerClassName} ref={dropRef}>
      <Bun top />
      <ul className={burgerConstructorStyles.list}>{content}</ul>
      <Bun top={false} />
      <div className={burgerConstructorStyles.makeOrderInfo}>
        <div className={burgerConstructorStyles.price}>
          <p className={digitClassName}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleMakeOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  setEscListener: PropTypes.func.isRequired,
};

export default BurgerConstructor;
