import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-item.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { OPEN_MADE_ORDER_MODAL } from "../../services/actions/order";
import { maxAmountOfIngredients } from "../../utils/constants";
import defaultPic from "../../images/ingredient.png";
import { IngredientType, IOrder, LocationState } from "../../types/types";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { formatDate } from "../../utils/utils";

const OrderItem: FC<IOrder> = ({ order, wide }) => {
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [leftCount, setLeftCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  const { url } = useRouteMatch();
  const allIngredients = useSelectorHook(
    (store) => store.ingredients.ingredients
  );

  const { number, createdAt, name, ingredients, status } = order;
  let price = 0;

  const orderIngredients = ingredients.map((id: string) => {
    return allIngredients.find((item: IngredientType) => {
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
    dispatch({ type: OPEN_MADE_ORDER_MODAL });
  };

  return (
    <li>
      <Link
        to={{pathname: `${url}/${number}`, state:{background: location}}}
        className={orderClassName}
        onClick={handleOrderClick}
      >
        <p className={orderIdClassName}>#{number}</p>
        <p className={dateClassName}>{formatDate(createdAt)}</p>
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
              .map((ingredient: IngredientType | undefined, index: number) => {
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
