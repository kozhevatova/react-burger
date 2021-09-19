import React, { useMemo, useCallback } from "react";
import styles from "./burger-constructor.module.css";
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
import Bun from "../bun/bun";
import { useDrop } from "react-dnd";
import FillingItem from "../filling-item/filling-item";
import {
  INCREASE_COUNT,
  RESET_COUNT,
} from "../../services/actions/ingredients";
import { useHistory } from "react-router-dom";

const BurgerConstructor = ({ setEscListener }: { setEscListener: any }) => {
  const { orderedIngredients, totalPrice, orderRequest } = useSelector(
    (store: any) => ({
      ...store.order,
    })
  );
  const user = useSelector((store: any) => store.user.user);
  const history = useHistory();

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
    styles.burgerConstructor,
    `${isHover && styles.hoveredContainer}`
  );
  const handleMakeOrderClick = () => {
    if (!user.name) {
      history.replace({ pathname: "/login" });
    } else {
      setEscListener();
      dispatch({ type: RESET_COUNT });
      dispatch(makeOrder(orderedIngredients));
    }
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

  return !orderRequest ? (
    <section className={containerClassName} ref={dropRef}>
      <Bun top />
      <ul className={styles.list}>{content}</ul>
      <Bun top={false} />
      {(orderedIngredients.filling.length ||
        orderedIngredients.buns.length > 1) && (
        <div className={styles.makeOrderInfo}>
          <div className={styles.price}>
            <p className={digitClassName}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleMakeOrderClick}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  ) : (
    // временная замена лоудеру
    <p
      style={{
        minHeight: 760,
        marginTop: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 600,
      }}
    >
      Loading...
    </p>
  );
};

BurgerConstructor.propTypes = {
  setEscListener: PropTypes.func.isRequired,
};

export default BurgerConstructor;
