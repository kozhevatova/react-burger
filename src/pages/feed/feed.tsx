import React, { FC, useEffect } from "react";
import classNames from "classnames";
import OrderFeedInfo from "../../components/order-feed-info/order-feed-info";
import OrderList from "../../components/order-list/order-list";
import style from "./feed.module.css";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { useAppDispatch } from "../../services/store";

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const titleClassName = classNames(
    style.title,
    "text text_type_main-large",
    "mb-5"
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "withoutAuth" });
    return(() => {
      dispatch({type: WS_CONNECTION_CLOSED});
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className={style.feed}>
      <h1 className={titleClassName}>Лента заказов</h1>
      <div className={style.content}>
        <OrderList wide={false} />
        <OrderFeedInfo />
      </div>
    </section>
  );
};

export default Feed;
