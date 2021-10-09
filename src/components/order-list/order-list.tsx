import classNames from "classnames";
import React, { FC } from "react";
import { useSelectorHook } from "../../services/store";
import { OrderType } from "../../types/types";
import OrderItem from "../order-item/order-item";
import style from "./order-list.module.css";

const OrderList: FC<{ wide: boolean }> = ({ wide }) => {
  const { orders } = useSelectorHook((store) => store.ws);

  const listClassName = classNames(style.list, wide && style.listWide);

  const compareOrders = (a: OrderType, b: OrderType) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if(a.createdAt === b.createdAt) {
      return 0;
    }
    return -1;
  };

  return (
    <ul className={listClassName}>
      {orders &&
        orders.length &&
        orders.sort(compareOrders).map((order: OrderType) => {
          return <OrderItem order={order} wide={wide} key={order._id} />;
        })}
    </ul>
  );
};

export default OrderList;
