import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../IngredientItem/IngredientItem";
import listStyles from "./IngredientsList.module.css";
import classNames from "classnames";
import { dataItemProptypes } from "../../types/types";

const IngredientsList = ({
  anchorId,
  title,
  data,
  handleIngredientModalOpen,
}: {
  anchorId: string;
  title: string;
  data: any;
  handleIngredientModalOpen: any;
}) => {
  const titleClassName = classNames(
    "text text_type_main-medium",
    listStyles.title
  );
  return (
    <div className={listStyles.ingredients} id={anchorId}>
      <h2 className={titleClassName}>{title}</h2>
      <ul className={listStyles.list}>
        {data.map((item: any, index: number) => {
          return (
            <IngredientItem
              item={item}
              key={item._id + index}
              handleIngredientModalOpen={handleIngredientModalOpen}
            />
          );
        })}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(dataItemProptypes).isRequired,
  title: PropTypes.string.isRequired,
  anchorId: PropTypes.string.isRequired,
  handleIngredientModalOpen: PropTypes.func.isRequired,
};

export default IngredientsList;
