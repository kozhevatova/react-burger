import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DELETE_ITEM, makeOrder } from "../../services/actions/order";
// import { totalPriceReducer } from "../../services/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import Bun from "../Bun/Bun";

const BurgerConstructor = ({ setEscListener }: { setEscListener: any }) => {
  const { orderedIngredients, totalPrice } = useSelector((store: any) => ({
    ...store.order,
  }));
  const isAppLoading = useSelector(
    (store: any) => store.ingredients.ingredientsRequest
  );
  const dispatch = useDispatch();
  const digitClassName = classNames("text text_type_digits-medium", "mr-2");

  useEffect(() => {
    console.log("data", orderedIngredients);
  }, [orderedIngredients]);

  const handleMakeOrderClick = () => {
    setEscListener();
    dispatch(makeOrder(orderedIngredients));
  };

  const handleItemDelete = (deletedItem: any) => {
    dispatch({ type: DELETE_ITEM, item: deletedItem });
  };

  const content = useMemo(() => {
    return (
      orderedIngredients.filling &&
      orderedIngredients.filling.length > 0 &&
      orderedIngredients.filling.map((item: any, index: number) => {
        return (
          <li
            className={burgerConstructorStyles.constructorElement}
            key={item._id + index}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => handleItemDelete(item)}
            />
          </li>
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppLoading, orderedIngredients]);

  return (
    <section className={burgerConstructorStyles.burgerConstructor}>
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
