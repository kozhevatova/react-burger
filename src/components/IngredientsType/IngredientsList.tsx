import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../IngredientItem/IngredientItem";
import listStyles from './IngredientsList.module.css';
import classNames from "classnames";

const IngredientsList = ({ data, title, id }) => {
  const titleClassName = classNames(
    'text text_type_main-medium',
    listStyles.title,
  )
  return (
    <div>
      <h2 className={titleClassName}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a id={id}>{title}</a>
      </h2>
      <ul className={listStyles.list}>
        {data.map((item) => {
          return <IngredientItem item={item} />;
        })}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientsList;
