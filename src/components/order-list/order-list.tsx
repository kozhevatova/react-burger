import classNames from "classnames";
import React, { FC, useEffect } from "react";
import { useSelectorHook } from "../../services/store";
import { OrderType } from "../../types/types";
import OrderItem from "../order-item/order-item";
import style from "./order-list.module.css";

const OrderList: FC<{ wide: boolean; setEscListener: () => void }> = ({
  wide,
  setEscListener,
}) => {
  const { orders } = useSelectorHook((store:any) => store.ws);

  useEffect(() => {
    if (orders) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const listClassName = classNames(style.list, wide && style.listWide);
  return (
    <ul className={listClassName}>
      {orders &&
        orders.length &&
        orders.map((order: OrderType) => {
          return (
            <OrderItem
              order={order}
              wide={wide}
              setEscListener={setEscListener}
              key={order._id}
            />
          );
        })}
    </ul>
  );
};

export default OrderList;
