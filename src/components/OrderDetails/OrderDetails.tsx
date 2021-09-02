import React, { useContext } from "react";
import orderStyles from "./OrderDetails.module.css";
import classNames from "classnames";
import done from "../../images/done.svg";
import { OrderDetailContext } from '../../contexts/OrderDetailContext';

const OrderDetails = () => {
  const orderId = useContext(OrderDetailContext);
  const idClassName = classNames(
    orderStyles.id,
    "text text_type_digits-large",
    "mt-4"
  );
  const textClassName = classNames(
    orderStyles.info,
    "mb-2",
    "text text_type_main-default"
  );
  const titleClassName = classNames(
    orderStyles.title,
    "text text_type_main-medium"
  );
  return (
    <div className={orderStyles.order}>
      <p className={idClassName}>{orderId}</p>
      <p className={titleClassName}>идентификатор заказа</p>
      <img className={orderStyles.image} src={done} alt="Готовность заказа." />
      <p className={textClassName}>Ваш заказ начали готовить</p>
      <p className={textClassName}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
