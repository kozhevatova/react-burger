import React from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataItemProptypes } from "../../utils/data";
import classNames from "classnames";

const BurgerConstructor = ({ data }: { data: any }) => {
  const image = data.filter((item: any) => item.type === "bun")[0].image;
  const tempIngredients = data.filter(
    (item: any) => item.type === "main" || item.type === "sauce"
  );
  const digitClassName = classNames("text text_type_digits-medium", "mr-2");
  return (
    <section className={burgerConstructorStyles.burgerConstructor}>
      <div className={burgerConstructorStyles.topElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={image}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {tempIngredients.map((item: any) => {
          return (
            <li
              className={burgerConstructorStyles.constructorElement}
              key={item._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>
      <div className={burgerConstructorStyles.topElement}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={image}
        />
      </div>
      <div className={burgerConstructorStyles.makeOrderInfo}>
        <div className={burgerConstructorStyles.price}>
          <p className={digitClassName}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
};

export default BurgerConstructor;
