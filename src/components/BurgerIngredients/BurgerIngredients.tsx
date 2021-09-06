import React, { SyntheticEvent, useMemo } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import IngredientsList from "../IngredientsList/IngredientsList";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { TAB_SWITCH } from "../../services/actions/ingredients";

const BurgerIngredients = ({ setEscListener }: { setEscListener: any }) => {
  const dispatch = useDispatch();
  const titleClassName = classNames(
    burgerIngredientsStyles.title,
    "text text_type_main-large"
  );
  const { data, currentTab } = useSelector((store: any) => ({
    data: store.ingredients.ingredients,
    currentTab: store.ingredients.currentTab,
  }));

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

  const setCurrentTab = (tab: any) => {
    dispatch({ type: TAB_SWITCH, tab });
  };

  const content = useMemo(() => {
    return (
      <ul
        className={burgerIngredientsStyles.scrollableList}
        id="scrollable-list"
        onScroll={handleScroll}
      >
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "bun")}
            anchorId="type-bun"
            title="Булки"
            setEscListener={setEscListener}
          />
        </li>
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "sauce")}
            anchorId="type-sauce"
            title="Соусы"
            setEscListener={setEscListener}
          />
        </li>
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "main")}
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
    <section className={burgerIngredientsStyles.ingredients}>
      <h1 className={titleClassName}>Соберите бургер</h1>
      <nav>
        <ul className={burgerIngredientsStyles.tabs}>
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

BurgerIngredients.propTypes = {
  setEscListener: PropTypes.func.isRequired,
};

export default BurgerIngredients;
