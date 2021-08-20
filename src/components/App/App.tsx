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
  const [orderModalVisible, setOrderModalVisible] = useState(true);
  const [currentItem, setCurrentItem] = useState({});

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
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
