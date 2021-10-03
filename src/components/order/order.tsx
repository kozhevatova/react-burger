import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order.module.css";

const Order = ({ isModal }: { isModal: boolean }) => {
  const { id } = useParams<{ id?: string }>();

  const orders = localStorage.getItem("orders");
  const [totalPrice, setTotalPrice] = useState(0);
  const order =
    orders &&
    id &&
    JSON.parse(orders).find((order: any) => order.number === Number(id));
  const { number, createdAt, name, ingredients, status } = order;
  const [ingredientsToShow, setIngredientsToShow] = useState<Array<any>>([]);
  const allIngredients = localStorage.getItem("ingredients");

  useEffect(() => {
    if (order && allIngredients && ingredients) {
      let price = 0;
      const ingredientsList = ingredients.map((id: any) => {
        const ingredient = JSON.parse(allIngredients).find(
          (ingredient: any) => {
            if (ingredient._id === id) {
              price += ingredient.price;
            }
            return ingredient._id === id;
          }
        );
        return { ...ingredient, qty: 1 };
      });
      setIngredientsToShow(
        ingredientsList
          .reduce((prev: any, item: any) => {
            const index = prev.findIndex(
              (ingredient: any) => ingredient._id === item._id
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <p className={orderIdClassName}>#{number}</p>
      <h3 className={textClassName}>{name}</h3>
      <p className={statusClassName}>
        {status === "done" ? "Выполнен" : "Создан"}
      </p>
      <p className={textClassName}>Состав:</p>
      <ul className={style.ingredients}>
        {ingredientsToShow &&
          ingredientsToShow.length &&
          ingredientsToShow.map((item: any) => {
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
        <p className={dateClassName}>{createdAt}</p>
        <p className={priceClassName}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
};

export default Order;
