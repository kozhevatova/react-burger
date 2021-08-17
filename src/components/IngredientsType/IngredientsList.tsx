import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../IngredientItem/IngredientItem";
import listStyles from "./IngredientsList.module.css";
import classNames from "classnames";

const IngredientsList = ({
  anchorId,
  title,
  data,
}: {
  anchorId: string;
  title: string;
  data: any;
}) => {
  const titleClassName = classNames(
    "text text_type_main-medium",
    listStyles.title
  );
  return (
    <div className={listStyles.ingredients} id={anchorId}>
      <h2 className={titleClassName}>{title}</h2>
      <ul className={listStyles.list}>
        {data.map((item: any) => {
          return <IngredientItem item={item} key={item._id} />;
        })}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  anchorId: PropTypes.string.isRequired,
};

export default IngredientsList;
