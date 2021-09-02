import React, { useContext, useEffect, useReducer, useState } from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ConstructorContext } from "../../contexts/ConstructorContext";
import { topBunLabel, bottomBunLabel } from "../../utils/constants";
import { ADD_ITEM, DELETE_ITEM } from "../../services/actions/order";
import { totalPriceReducer } from "../../services/reducers/order";

const BurgerConstructor = ({ handleMakeOrder }: { handleMakeOrder: any }) => {
  //все ингредиенты, полученные с api
  const data = useContext(ConstructorContext);
  const bun = data.filter((item: any) => item.type === "bun")[0];
  const [fillingIngredients, setFillingIngredients] = useState(
    data.filter((item: any) => item.type === "main" || item.type === "sauce")
  );
  const [orderedIngredients, setOrderedIngredients] = useState([]);
  const digitClassName = classNames("text text_type_digits-medium", "mr-2");

  const initialTotalPriceState = {
    totalPrice: fillingIngredients.reduce(
      (acc: any, item: any) => acc + item.price,
      0
    ),
  };

  const [totalPriceState, dispatch] = useReducer(
    totalPriceReducer,
    initialTotalPriceState
  );

  useEffect(() => {
    console.log(totalPriceState.totalPrice);
  }, [totalPriceState]);

  // при монтировании добавляем булки и начинку в стейт заказа
  // для расчета полной стоимости и отправки на сервер
  useEffect(() => {
    const order = fillingIngredients.slice();
    for (let i = 0; i < 2; i++) {
      order.push(bun);
      dispatch({ type: ADD_ITEM, item: bun });
    }
    setOrderedIngredients(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMakeOrderClick = () => {
    handleMakeOrder(orderedIngredients);
  };

  const handleItemDelete = (deletedItem: any) => {
    dispatch({ type: DELETE_ITEM, item: deletedItem });
    setFillingIngredients(
      fillingIngredients.filter((item: any) => item._id !== deletedItem._id)
    );
    setOrderedIngredients(
      orderedIngredients.filter((item: any) => item._id !== deletedItem._id)
    );
  };

  return (
    <section className={burgerConstructorStyles.burgerConstructor}>
      <div className={burgerConstructorStyles.topElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun ? bun.name + topBunLabel : ""}
          price={bun ? bun.price : 0}
          thumbnail={bun ? bun.image : ""}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {fillingIngredients.map((item: any, index: number) => {
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
        })}
      </ul>
      <div className={burgerConstructorStyles.topElement}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun ? bun.name + bottomBunLabel : ""}
          price={bun ? bun.price : 0}
          thumbnail={bun ? bun.image : ""}
        />
      </div>
      <div className={burgerConstructorStyles.makeOrderInfo}>
        <div className={burgerConstructorStyles.price}>
          <p className={digitClassName}>{totalPriceState.totalPrice}</p>
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
  handleMakeOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
