import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { DECREASE_COUNT } from "../../services/actions/ingredients";
import { DELETE_ITEM } from "../../services/actions/order";
import fillingStyles from "./FillingItem.module.css";
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
  const [, drag] = useDrag({
    type: "ingredient1",
    item: () => {
      return { _id, index };
    },
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
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      swapIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleItemDelete = (deletedItem: any) => {
    dispatch({ type: DELETE_ITEM, item: deletedItem });
    dispatch({type: DECREASE_COUNT, item: deletedItem});
  };

  return (
    <li
      className={fillingStyles.constructorElement}
      ref={ref}
      style={isHover ? { opacity: 0 } : { opacity: 1 }}
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
