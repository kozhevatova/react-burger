import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef } from "react";
import { MonitorEventEmitter, useDrag, useDrop } from "react-dnd";
import { DECREASE_COUNT } from "../../services/actions/ingredients";
import { DELETE_ITEM } from "../../services/actions/order";
import styles from "./filling-item.module.css";
import { IFillingItem, IngredientType } from "../../types/types";
import { useAppDispatch } from "../../services/store";

const FillingItem: FC<IFillingItem> = ({ index, swapIngredients, item }) => {
  const ref = useRef<HTMLLIElement>(null);
  const { name, _id, uid, image, price } = item;
  const dispatch = useAppDispatch();
  const [{ isDragging }, drag] = useDrag({
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
    hover(item: { _id: string; index: number }, monitor: MonitorEventEmitter) {
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

  const handleItemDelete = (deletedItem: {_id: string; price: number; uid: string | undefined;}) => {
    dispatch({ type: DELETE_ITEM, item: deletedItem as IngredientType});
    dispatch({ type: DECREASE_COUNT, item: deletedItem as IngredientType });
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

export default FillingItem;
