import classNames from 'classnames';
import React from 'react';
import detailsStyles from './IngredientDetails.module.css';

const IngredientDetails = ({item} : {item: any}) => {
  const nameClassName = classNames(
    detailsStyles.name,
    'text text_type_main-medium',
    'mt-4'
  )
  const textClassName = classNames(
    detailsStyles.text,
    'text text_type_main-default',
  );
  const digitClassName = classNames(
    detailsStyles.text,
    'text text_type_digits-default',
  )
  return(
    <div className={detailsStyles.details}>
      <img className={detailsStyles.image} src={item.image} alt={item.name}/>
      <p className={nameClassName}>{item.name}</p>
      <div className={detailsStyles.nutritionalValue}>
        <p className={textClassName}>Калории, ккал</p>
        <p className={digitClassName}>{item.calories}</p>
      </div>
      <div className={detailsStyles.nutritionalValue}>
        <p className={textClassName}>Белки, г</p>
        <p className={digitClassName}>{item.proteins}</p>
      </div>
      <div className={detailsStyles.nutritionalValue}>
        <p className={textClassName}>Жиры, г</p>
        <p className={digitClassName}>{item.fat}</p>
      </div>
      <div className={detailsStyles.nutritionalValue}>
        <p className={textClassName}>Углеводы, г</p>
        <p className={digitClassName}>{item.carbohydrates}</p>
      </div>
    </div>
  );
}

export default IngredientDetails;