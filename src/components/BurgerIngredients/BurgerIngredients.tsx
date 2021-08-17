import React, { SyntheticEvent, useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import IngredientsList from "../IngredientsType/IngredientsList";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {dataItemProptypes} from '../../utils/data';
const BurgerIngredients = ({ data }: { data: any }) => {
  const [currentTab, setCurrentTab] = useState("bun");

  const titleClassName = classNames(
    burgerIngredientsStyles.title,
    "text text_type_main-large"
  );

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

  return (
    <section className={burgerIngredientsStyles.ingredients}>
      <h1 className={titleClassName}>Соберите бургер</h1>
      <nav>
        <ul className={burgerIngredientsStyles.tabs}>
          <li onClick={handleClick} id="bun">
            <Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={setCurrentTab}
            >
              Булки
            </Tab>
          </li>
          <li onClick={handleClick} id="sauce">
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={setCurrentTab}
            >
              Соусы
            </Tab>
          </li>
          <li onClick={handleClick} id="main">
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={setCurrentTab}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <ul
        className={burgerIngredientsStyles.scrollableList}
        id="scrollable-list"
      >
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "bun")}
            anchorId="type-bun"
            title="Булки"
          />
        </li>
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "sauce")}
            anchorId="type-sauce"
            title="Соусы"
          />
        </li>
        <li className={burgerIngredientsStyles.scrollableListItem}>
          <IngredientsList
            data={data.filter((item: any) => item.type === "main")}
            anchorId="type-main"
            title="Начинки"
          />
        </li>
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
};

export default BurgerIngredients;
