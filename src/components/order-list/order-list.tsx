import classNames from "classnames";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import OrderItem from "../order-item/order-item";
import style from "./order-list.module.css";

const OrderList = ({
  wide,
  setEscListener,
}: {
  wide: boolean;
  setEscListener: any;
}) => {
  const orders = useSelector((store: any) => store.ws.orders);

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
        orders.map((order: any) => {
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
