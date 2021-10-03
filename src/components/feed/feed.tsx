import React, { useEffect } from "react";
import classNames from "classnames";
import OrderFeedInfo from "../order-feed-info/order-feed-info";
import OrderList from "../order-list/order-list";
import style from "./feed.module.css";
import { WS_CONNECTION_START } from "../../services/actions/ws";
import { useDispatch } from "react-redux";

const Feed = ({ setEscListener }: { setEscListener: any }) => {
  const dispatch = useDispatch();

  const titleClassName = classNames(
    style.title,
    "text text_type_main-large",
    "mb-5"
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "withoutAuth" });
  }, [dispatch]);

  return (
    <section className={style.feed}>
      <h1 className={titleClassName}>Лента заказов</h1>
      <div className={style.content}>
        <OrderList wide={false} setEscListener={setEscListener} />
        <OrderFeedInfo />
      </div>
    </section>
  );
};

export default Feed;
