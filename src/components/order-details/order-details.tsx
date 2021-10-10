import React, { FC } from "react";
import styles from "./order-details.module.css";
import classNames from "classnames";
import done from "../../images/done.svg";
import { useSelectorHook } from "../../services/store";

const OrderDetails:FC = () => {
  const {orderId} = useSelectorHook((store) => store.order);
  const idClassName = classNames(
    styles.id,
    "text text_type_digits-large",
    "mt-4"
  );
  const textClassName = classNames(
    styles.info,
    "mb-2",
    "text text_type_main-default"
  );
  const titleClassName = classNames(styles.title, "text text_type_main-medium");
  return (
    <div className={styles.order}>
      <p className={idClassName}>{orderId}</p>
      <p className={titleClassName}>идентификатор заказа</p>
      <img className={styles.image} src={done} alt="Готовность заказа." />
      <p className={textClassName}>Ваш заказ начали готовить</p>
      <p className={textClassName}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
