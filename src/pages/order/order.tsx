import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order.module.css";
import { IngredientType, OrderType } from "../../types/types";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { formatDate } from "../../utils/utils";

const Order:FC<{ isModal: boolean }> = ({ isModal }) => {
  const { id } = useParams<{ id?: string }>();
  const {url} = useRouteMatch();
  const dispatch = useAppDispatch();
  const orders = useSelectorHook((store) => store.ws.orders);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const order = orders.find((order: OrderType) => order.number && order.number === Number(id));
  const [ingredientsToShow, setIngredientsToShow] = useState<Array<IngredientType>>([]);
  const allIngredients = useSelectorHook((store) => store.ingredients.ingredients);

  useEffect(() => {
    if(!orders.length){
      if(url.match('feed')) {
        dispatch({type: WS_CONNECTION_START, payload: 'withoutAuth'})
      } else {
        dispatch({type: WS_CONNECTION_START, payload: 'withAuth'})
      }
    }
    return(() => {
      if(orders){
        dispatch({type: WS_CONNECTION_CLOSED});
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (order && allIngredients && order.ingredients) {
      let price = 0;
      const ingredientsList = order.ingredients.map((id: string) => {
        const ingredient = allIngredients.find(
          (ingredient: IngredientType) => {
            if (ingredient._id === id) {
              price += ingredient.price;
            }
            return ingredient._id === id;
          }
        );
        return { ...ingredient, qty: 1 };
      });
      setIngredientsToShow(
        (ingredientsList as (IngredientType[]))
          .reduce((prev: Array<IngredientType>, item: IngredientType) => {
            const index = prev.findIndex(
              (ingredient: IngredientType) => ingredient._id === item._id
            );
            if (index < 0) {
              return [...prev, item];
            } else {
              prev[index].qty += 1;
              return prev;
            }
          }, [])
          .reverse()
      );
      setTotalPrice(price);
    }
  }, [allIngredients, order]);

  const orderIdClassName = classNames({
    [style.orderId]: true,
    [style.orderIdModal]: isModal,
    "text text_type_digits-default": true,
  });
  const dateClassName = classNames(style.date, "text text_type_main-small");
  const textClassName = classNames(style.title, "text text_type_main-medium");
  const ingredientNameClassName = classNames(
    style.name,
    "text text_type_main-small"
  );
  const priceClassName = classNames(
    style.price,
    "text text_type_digits-default"
  );
  const statusClassName = classNames({
    [style.status]: true,
    [style.statusReady]: true,
    "text text_type_main-small": true,
  });

  return (
    <section className={style.order}>
      <p className={orderIdClassName}>#{order && order.number ? order.number : 0}</p>
      <h3 className={textClassName}>{order && order.name ? order.name : ''}</h3>
      <p className={statusClassName}>
        {order && order.status === "done" ? "????????????????" : "????????????"}
      </p>
      <p className={textClassName}>????????????:</p>
      <ul className={style.ingredients}>
        {ingredientsToShow &&
          ingredientsToShow.length &&
          ingredientsToShow.map((item: IngredientType) => {
            return (
              <li className={style.ingredient} key={item._id}>
                <img
                  className={style.image}
                  alt={item && item.name ? item.name : ""}
                  src={item && item.image ? item.image : ""}
                />
                <p className={ingredientNameClassName}>
                  {item && item.name ? item.name : ""}
                </p>
                <p className={priceClassName}>
                  {item.qty > 1 ? `${item.qty} x ` : ""}
                  {item.price} <CurrencyIcon type="primary" />
                </p>
              </li>
            );
          })}
      </ul>
      <div className={style.total}>
        <p className={dateClassName}>{order && order.createdAt ? formatDate(order.createdAt) : ''}</p>
        <p className={priceClassName}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
};

export default Order;
