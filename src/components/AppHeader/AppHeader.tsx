import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import burgerConstructorStyles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const [iconType, setIconType] = useState({
    burger: "secondary",
    list: "secondary",
    profile: "secondary",
  });
  const linkClassName = classNames(
    burgerConstructorStyles.link,
    "p-5",
    "mt-4",
    "mb-4",
    "mr-2"
  );
  const textClassName = classNames("text", "text_type_main-default", "ml-2");

  type IconType = { burger: string; list: string; profile: string };
  type IconTypeKey = keyof IconType;

  //меняет тип иконки  при hover
  const changeIconType = (iconName: IconTypeKey, primary: Boolean) => {
    setIconType({
      ...iconType,
      [iconName]: primary ? "secondary" : "primary",
    });
  };

  return (
    <header className={burgerConstructorStyles.header}>
      <NavLink
        to="#"
        className={linkClassName}
        onMouseOver={() => changeIconType("burger", false)}
        onMouseLeave={() => changeIconType("burger", true)}
      >
        {iconType.burger === "primary" ? (
          <BurgerIcon type="primary" />
        ) : (
          <BurgerIcon type="secondary" />
        )}
        <p className={textClassName}>Конструктор</p>
      </NavLink>
      <NavLink
        to="#"
        className={linkClassName}
        onMouseOver={() => changeIconType("list", false)}
        onMouseLeave={() => changeIconType("list", true)}
      >
        {iconType.list === "primary" ? (
          <ListIcon type="primary" />
        ) : (
          <ListIcon type="secondary" />
        )}
        <p className={textClassName}>Лента заказов</p>
      </NavLink>
      <Logo />
      <NavLink
        to="#"
        className={linkClassName}
        onMouseOver={() => changeIconType("profile", false)}
        onMouseLeave={() => changeIconType("profile", true)}
      >
        {iconType.profile === "primary" ? (
          <ProfileIcon type="primary" />
        ) : (
          <ProfileIcon type="secondary" />
        )}
        <p className={textClassName}>Личный кабинет</p>
      </NavLink>
    </header>
  );
};

export default AppHeader;
