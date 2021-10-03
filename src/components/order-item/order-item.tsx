import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-item.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CURRENT_ORDER,
  OPEN_MADE_ORDER_MODAL,
} from "../../services/actions/order";
import { maxAmountOfIngredients } from "../../utils/constants";
import defaultPic from "../../images/ingredient.png";

const OrderItem = ({
  order,
  wide,
  setEscListener,
}: {
  order: any;
  wide: boolean;
  setEscListener?: any;
}) => {
  const [isLeft, setIsLeft] = useState(false);
  const [leftCount, setLeftCount] = useState(0);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const allIngredients = useSelector(
    (store: any) => store.ingredients.ingredients
  );

  const { number, createdAt, name, ingredients, status } = order;
  let price = 0;

  const orderIngredients = ingredients.map((id: string) => {
    return allIngredients.find((item: any) => {
      if (item._id === id) {
        price += item.price;
      }
      return item._id === id;
    });
  });

  const orderClassName = classNames(
    style.order,
    "mb-4",
    wide && style.orderWide
  );
  const orderIdClassName = classNames(
    style.orderId,
    "text text_type_digits-default"
  );
  const dateClassName = classNames(style.date, "text text_type_main-small");
  const titleClassName = classNames(style.title, "text text_type_main-medium");
  const priceClassName = classNames(
    style.price,
    "text text_type_digits-default"
  );
  const leftNumClassName = classNames(
    style.leftNum,
    "text text_type_digits-small"
  );
  const statusClassName = classNames({
    [style.status]: true,
    [style.statusReady]: status === "done",
    "text text_type_main-small": true,
  });

  useEffect(() => {
    if (orderIngredients.length > maxAmountOfIngredients) {
      setLeftCount(orderIngredients.length - maxAmountOfIngredients);
      setIsLeft(true);
    } else {
      setLeftCount(0);
      setIsLeft(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderClick = () => {
    setEscListener();
    dispatch({ type: OPEN_MADE_ORDER_MODAL });
    dispatch({ type: GET_CURRENT_ORDER, order });
  };

  return (
    <li>
      <Link
        to={`${url}/${number}`}
        className={orderClassName}
        onClick={handleOrderClick}
      >
        <p className={orderIdClassName}>#{number}</p>
        <p className={dateClassName}>{createdAt}</p>
        <div className={style.titleContainer}>
          <h3 className={titleClassName}>{name}</h3>
          {wide && (
            <p className={statusClassName}>
              {status === "done" ? "Выполнен" : "Создан"}
            </p>
          )}
        </div>
        <ul className={style.ingredients}>
          {orderIngredients &&
            orderIngredients.length &&
            orderIngredients
              .reverse()
              .slice(0, maxAmountOfIngredients)
              .map((ingredient: any, index: number) => {
                return (
                  <li className={style.ingredient} key={index}>
                    <img
                      className={style.ingredientImage}
                      src={
                        ingredient && ingredient.image
                          ? ingredient.image
                          : defaultPic
                      }
                      alt={ingredient && ingredient.name ? ingredient.name : ""}
                    />
                    {isLeft && (
                      <div className={style.left}>
                        <p className={leftNumClassName}>+{leftCount}</p>
                      </div>
                    )}
                  </li>
                );
              })}
        </ul>
        <p className={priceClassName}>
          {price} <CurrencyIcon type="primary" />
        </p>
      </Link>
    </li>
  );
};

export default OrderItem;
