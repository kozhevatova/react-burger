import React, { useEffect, useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import classNames from 'classnames';
import { data } from "../../utils/data";
import IngredientsList from "../IngredientsType/IngredientsList";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const [anchorTarget, setAnchorTarget] = useState(null);

  const titleClassName = classNames(
    burgerIngredientsStyles.title,
    'text text_type_main-large'
  );

  useEffect(() => {
    setAnchorTarget(document.getElementById(`type-${currentTab}`));
  }, [currentTab]);

  const handleClick = (e) => {
    e.preventDefault();
    //document.getElementById('scrollable-list').scrollTop = 300;
    anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={burgerIngredientsStyles.ingredients} id='scrolling-container'>
      <h1 className={titleClassName}>Соберите бургер</h1>
      <nav>
        <ul className={burgerIngredientsStyles.tabs}>
          <li className={burgerIngredientsStyles.tabsItem}>
            <a href="#type-bun" className={burgerIngredientsStyles.tab} onClick={handleClick}>
              <Tab
                value="bun"
                active={currentTab === "bun"}
                onClick={setCurrentTab}
              >
                Булки
              </Tab>
            </a>
          </li>
          <li className={burgerIngredientsStyles.tabsItem}>
            <a href="#type-sauce" className={burgerIngredientsStyles.tab} onClick={handleClick}>
              <Tab
                value="sauce"
                active={currentTab === "sauce"}
                onClick={setCurrentTab}
              >
                Соусы
              </Tab>
            </a>
          </li>
          <li className={burgerIngredientsStyles.tabsItem}>
            <a href="#type-main" className={burgerIngredientsStyles.tab} onClick={handleClick}>
              <Tab
                value="main"
                active={currentTab === "main"}
                onClick={setCurrentTab}
              >
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>
      <div className={burgerIngredientsStyles.scrollableList} id='scrollable-list'>
        <IngredientsList
        data={data.filter((item) => item.type === "bun")}
        id="type-bun"
        title="Булки"
      />
      <IngredientsList
        data={data.filter((item) => item.type === "sauce")}
        id="type-sauce"
        title="Соусы"
      />
      <IngredientsList
        data={data.filter((item) => item.type === "main")}
        id="type-main"
        title="Начинки"
      />
      </div>
      
    </section>
  );
};

export default BurgerIngredients;
