import React, { FC } from "react";
import bunStyles from "./bun.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { bottomBunLabel, topBunLabel } from "../../utils/constants";
import { useSelectorHook } from "../../services/store";

const Bun: FC<{ top: boolean }> = ({top}) => {
  const bun =
    useSelectorHook((store) => store.order.orderedIngredients.buns[0]);
  return (
    <div className={bunStyles.bun}>
      {bun && bun.name && (
        <ConstructorElement
          type={top ? "top" : "bottom"}
          isLocked={true}
          text={
            bun.name +
            (top ? topBunLabel : bottomBunLabel)
          }
          price={bun.price}
          thumbnail={bun.image}
        />
      )}
    </div>
  );
};

export default Bun;
