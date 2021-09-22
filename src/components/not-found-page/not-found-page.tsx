import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./not-found-page.module.css";

const NotFoundPage = () => {
  const history = useHistory();

  const titleClassName = classNames(styles.title, "text text_type_main-large");

  const textClassName = classNames(styles.text, "text text_type_main-medium");

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <section className={styles.page}>
      <h1 className={titleClassName}>404</h1>
      <p className={textClassName}>Страница не найдена</p>
      <Button type="secondary" onClick={handleGoBack}>
        Назад
      </Button>
    </section>
  );
};

export default NotFoundPage;
