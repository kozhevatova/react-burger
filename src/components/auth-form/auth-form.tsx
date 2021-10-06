import React, { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./auth-form.module.css";
import classNames from "classnames";
import { Redirect, useLocation } from "react-router";
import { IAuthForm, LinkType, LocationState } from "../../types/types";
import "./form.css";
import { useSelectorHook } from "../../services/store";

const AuthForm:FC<IAuthForm> = (props) => {
  const { children, title, buttonTitle, links, onSubmit } = props;
  const location = useLocation<LocationState>();
  const user = useSelectorHook((store) => store.user.user);

  if (user.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  const titleClassname = classNames(styles.title, "text text_type_main-medium");
  const textClassName = classNames("text text_type_main-small", styles.text);

  const linkClassName = classNames("text text_type_main-small", styles.link);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={titleClassname}>{title}</h2>
      {children}
      <Button type="primary" size="medium">
        {buttonTitle}
      </Button>
      <ul className={styles.list}>
        {links.map((link: LinkType, index: number) => {
          return (
            <li className={styles.listItem} key={index}>
              <p className={textClassName}>{link.text}</p>
              <NavLink to={link.path} className={linkClassName}>
                {link.linkText}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default AuthForm;
