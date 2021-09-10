import React from "react";
import { useSelector } from "react-redux";
import bunStyles from "./bun.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { bottomBunLabel, topBunLabel } from "../../utils/constants";
import PropTypes from "prop-types";

const Bun = ({ top }: { top: any }) => {
  const bun = useSelector(
    (store: any) => store.order.orderedIngredients.buns[0]
  );
  return (
    <div className={bunStyles.bun}>
      {bun.name && (
        <ConstructorElement
          type={top ? "top" : "bottom"}
          isLocked={true}
          text={bun.name + (top ? topBunLabel : bottomBunLabel)}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}
    </div>
  );
};

Bun.propTypes = {
  top: PropTypes.bool.isRequired,
};

export default Bun;
