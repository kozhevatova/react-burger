import React from "react";
import { NavLink } from "react-router-dom";
import classNames from 'classnames';

import burgerConstructorStyles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const linkClassName = classNames(
    burgerConstructorStyles.link, 
    'p-5',
  );
  const textClassName = classNames(
    'text',
    'text_type_main-default',
    'ml-2'
  );

  return (
    <header className={burgerConstructorStyles.header}>
      <NavLink to="#" className={linkClassName}>
        <BurgerIcon type="secondary" />
        <p className={textClassName}>
          Конструктор
        </p>
      </NavLink>
      <NavLink to="#" className={linkClassName}>
        <ListIcon type="secondary" />
        <p className={textClassName}>
          Лента заказов
        </p>
      </NavLink>
      <Logo />
      <NavLink to="#" className={linkClassName}>
        <ProfileIcon type="secondary" />
        <p className={textClassName}>
          Личный кабинет
        </p>
      </NavLink>
    </header>
  );
};

export default AppHeader;
