import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IconTypeKey } from "../../types/types";

const AppHeader:FC = () => {
  const [iconType, setIconType] = useState({
    burger: "secondary",
    list: "secondary",
    profile: "secondary",
  });
  const linkClassName = classNames(styles.link, "p-5", "mt-4", "mb-4", "mr-2");
  const textClassName = classNames("text", "text_type_main-default", "ml-2");

  //меняет тип иконки  при hover
  const changeIconType = (iconName: IconTypeKey, primary: Boolean) => {
    setIconType({
      ...iconType,
      [iconName]: primary ? "secondary" : "primary",
    });
  };

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
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
        to="/feed"
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
      <NavLink to="/" className={linkClassName}>
        <Logo />
      </NavLink>
      <NavLink
        to="/profile"
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
