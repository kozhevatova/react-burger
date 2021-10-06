import React, { FC } from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./main-content.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainContent: FC<{ setEscListener: () => void }> = ({
  setEscListener,
}) => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients setEscListener={setEscListener} />
        <BurgerConstructor setEscListener={setEscListener} />
      </DndProvider>
    </main>
  );
};

export default MainContent;
