import classNames from "classnames";
import React from "react";
import { useSelectorHook } from "../../services/store";
import { OrderType } from "../../types/types";
import { maxAmountOrdersToShow } from "../../utils/constants";
import style from "./order-feed-info.module.css";

const OrderFeedInfo = () => {
  const { totalOrdersCount, todayOrdersCount, orders } = useSelectorHook(
    (store) => store.ws
  );
  const textClassName = classNames(style.text, "text text_type_main-medium");
  const orderIdClassName = classNames(
    style.orderId,
    "text text_type_digits-default"
  );
  const doneOrders = orders
    .filter((order: OrderType) => order.status === "done")
    .reverse()
    .slice(orders.length - maxAmountOrdersToShow, orders.length);
  const inProgressOrders = orders
    .filter((order: OrderType) => order.status !== "done")
    .reverse()
    .slice(orders.length - maxAmountOrdersToShow, orders.length);
  const countClassName = classNames(style.count, "text text_type_digits-large");

  return (
    <div className={style.info}>
      <div className={style.orderNums}>
        <p className={textClassName}>Готовы:</p>
        <ul className={style.list}>
          {doneOrders &&
            doneOrders.length &&
            doneOrders.map((order: OrderType) => {
              return (
                <p className={orderIdClassName} key={order._id}>
                  {order.number}
                </p>
              );
            })}
        </ul>
      </div>
      <div className={style.orderNums}>
        <p className={textClassName}>В работе:</p>
        <ul className={style.list}>
          {inProgressOrders &&
            inProgressOrders.length &&
            inProgressOrders.map((order: OrderType) => {
              return (
                <p className={orderIdClassName} key={order._id}>
                  {order.number}
                </p>
              );
            })}
        </ul>
      </div>
      <p className={textClassName}>Выполнено за все время:</p>
      <p className={countClassName}>{totalOrdersCount}</p>
      <p className={textClassName}>Выполнено за сегодня:</p>
      <p className={countClassName}>{todayOrdersCount}</p>
    </div>
  );
};

export default OrderFeedInfo;
