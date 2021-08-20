import React, { SyntheticEvent, useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import appStyles from "./App.module.css";
import api from "../../utils/api";
import Modal from "../Modal/Modal";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
  });
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    api
      .getIngredients()
      .then((data) => {
        if (data.data) {
          setIngredients(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //закрытие всех модальных окон, удаление слушателя события нажатия на Esc
  const handleModalsClose = () => {
    setIngredientModalVisible(false);
    setOrderModalVisible(false);

    removeEscListener();
  };

  const handleIngredientModalOpen = (item: any) => {
    setCurrentItem(item);
    setIngredientModalVisible(true);
    setEscListener();
  };

  const handleOrderModalOpen = () => {
    setOrderId(24562);
    setOrderModalVisible(true);
    setEscListener();
  };

  //обработчик закрытия модальных окон при нажатии на фон
  const handleCloseByClickOnOverlay = (e: SyntheticEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    handleModalsClose();
  };

  //обработчик закрытия по нажатию Esc
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleModalsClose();
    }
  };

  const setEscListener = () => {
    document.addEventListener("keydown", handleEscClose);
  };

  const removeEscListener = () => {
    document.removeEventListener("keydown", handleEscClose);
  };

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <Main
        data={ingredients}
        handleIngredientModalOpen={handleIngredientModalOpen}
        handleOrderModalOpen={handleOrderModalOpen}
      />
      {ingredientModalVisible && (
        <Modal
          title={ingredientDetailsTitle}
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <IngredientDetails item={currentItem} />
        </Modal>
      )}
      {orderModalVisible && (
        <Modal
          title=""
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <OrderDetails id={orderId} />
        </Modal>
      )}
    </div>
  );
}

export default App;
