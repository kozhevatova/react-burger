import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { DECREASE_COUNT } from "../../services/actions/ingredients";
import { DELETE_ITEM } from "../../services/actions/order";
import styles from "./filling-item.module.css";
import PropTypes from 'prop-types';

const FillingItem = ({
  index,
  swapIngredients,
  name,
  _id,
  uid,
  image,
  price,
}: {
  index: any;
  swapIngredients: any;
  name: any;
  _id: any;
  uid: any;
  image: any;
  price: any;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const [{isDragging}, drag] = useDrag({
    type: "ingredient1",
    item: () => {
      return { _id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isHover }, drop] = useDrop({
    accept: "ingredient1",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    hover(item: any, monitor: any) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!ref.current) {
        return;
      }
      if (dragIndex === hoverIndex) {
        return;
      }
      
      swapIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  useEffect(() => {
    console.log('item filling')
  },[])
  const handleItemDelete = (deletedItem: any) => {
    dispatch({ type: DELETE_ITEM, item: deletedItem });
    dispatch({type: DECREASE_COUNT, item: deletedItem});
  };

  return (
    <li
      className={styles.constructorElement}
      ref={ref}
      style={isHover || isDragging ? { opacity: 0 } : { opacity: 1 }}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleItemDelete({ _id, price, uid })}
      />
    </li>
  );
};

FillingItem.propTypes = {
  index: PropTypes.number.isRequired,
  swapIngredients: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default FillingItem;
