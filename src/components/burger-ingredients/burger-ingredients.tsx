import React, { FC, SyntheticEvent, useEffect, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import classNames from "classnames";
import IngredientsList from "../ingredients-list/ingredients-list";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { TAB_SWITCH } from "../../services/actions/ingredients";
import { AppDispatch, useSelectorHook } from "../../services/store";
import { IngredientType } from "../../types/types";

const BurgerIngredients: FC<{ setEscListener: () => void }> = ({
  setEscListener,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const titleClassName = classNames(styles.title, "text text_type_main-large");
  const { data, currentTab } = useSelectorHook((store) => ({
    data: store.ingredients.ingredients,
    currentTab: store.ingredients.currentTab,
  }));

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(data));
  }, [data]);

  const handleScroll = () => {
    const scrollableList = document.getElementById("scrollable-list");
    const bunArea = document.getElementById("type-bun");
    const sauceArea = document.getElementById("type-sauce");
    const mainArea = document.getElementById("type-main");

    if (bunArea && mainArea && sauceArea && scrollableList) {
      let value = scrollableList.getBoundingClientRect().top;
      if (
        bunArea.getBoundingClientRect().top <= value &&
        bunArea.getBoundingClientRect().top > 0
      ) {
        dispatch({ type: TAB_SWITCH, tab: "bun" });
      }
      if (
        mainArea.getBoundingClientRect().top <= value &&
        mainArea.getBoundingClientRect().top > 0
      ) {
        dispatch({ type: TAB_SWITCH, tab: "main" });
      }
      if (
        sauceArea.getBoundingClientRect().top <= value &&
        sauceArea.getBoundingClientRect().top > 0
      ) {
        dispatch({ type: TAB_SWITCH, tab: "sauce" });
      }
    }
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    const scrollableList = document.getElementById("scrollable-list");
    const anchorTarget = document.getElementById(`type-${e.currentTarget.id}`);
    if (scrollableList && anchorTarget) {
      scrollableList.scrollTo({
        top: anchorTarget.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const setCurrentTab = (tab: string) => {
    dispatch({ type: TAB_SWITCH, tab });
  };

  const content = useMemo<JSX.Element>(() => {
    return (
      <ul
        className={styles.scrollableList}
        id="scrollable-list"
        onScroll={handleScroll}
      >
        <li className={styles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: IngredientType) => item.type === "bun")}
            anchorId="type-bun"
            title="Булки"
            setEscListener={setEscListener}
          />
        </li>
        <li className={styles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: IngredientType) => item.type === "sauce")}
            anchorId="type-sauce"
            title="Соусы"
            setEscListener={setEscListener}
          />
        </li>
        <li className={styles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: IngredientType) => item.type === "main")}
            anchorId="type-main"
            title="Начинки"
            setEscListener={setEscListener}
          />
        </li>
      </ul>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section className={styles.ingredients}>
      <h1 className={titleClassName}>Соберите бургер</h1>
      <nav>
        <ul className={styles.tabs}>
          <li onClick={handleClick} id="bun">
            <Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={() => setCurrentTab("bun")}
            >
              Булки
            </Tab>
          </li>
          <li onClick={handleClick} id="sauce">
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={() => setCurrentTab("sauce")}
            >
              Соусы
            </Tab>
          </li>
          <li onClick={handleClick} id="main">
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={() => setCurrentTab("main")}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      {content}
    </section>
  );
};

export default BurgerIngredients;
