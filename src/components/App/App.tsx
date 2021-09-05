import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import appStyles from "./App.module.css";
import api from "../../utils/api";
import Modal from "../Modal/Modal";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ConstructorContext } from "../../contexts/ConstructorContext";
import { OrderDetailContext } from "../../contexts/OrderDetailContext";
import { getAllIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const dispatch = useDispatch();
  const isAppLoading = useSelector((store:any) => store.ingredients.ingredientsRequest);
  useEffect(() => {
    setIsLoading(true);
    // api
    //   .getIngredients()
    //   .then((data) => {
    //     if (data.data) {
    //       setIngredients(data.data);
    //     }
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    dispatch(getAllIngredients());
  }, [dispatch]);

  const setEscListener = () => {
    document.addEventListener("keydown", handleEscClose);
  };

  const removeEscListener = () => {
    document.removeEventListener("keydown", handleEscClose);
  };

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
  const handleEscClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleModalsClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //обработка заказа
  const handleMakeOrder = (ingredients: any) => {
    api
      .makeOrder(ingredients.map((item: any) => item._id))
      .then((res) => {
        if (res && res.success) {
          setOrderId(res.order.number);
          handleOrderModalOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <OrderDetailContext.Provider value={orderId}>
        <ConstructorContext.Provider value={ingredients}>
          {/* временная замена лоудеру */}
          {/* {isLoading && <p>Loading...</p>} */}
          {!isAppLoading && (
            <Main
              handleIngredientModalOpen={handleIngredientModalOpen}
              handleMakeOrder={handleMakeOrder}
            />)}
        </ConstructorContext.Provider>
        {orderModalVisible && (
          <Modal
            title=""
            handleModalClose={handleModalsClose}
            handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
          >
            <OrderDetails />
          </Modal>
        )}
      </OrderDetailContext.Provider>
      {ingredientModalVisible && (
        <Modal
          title={ingredientDetailsTitle}
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <IngredientDetails item={currentItem} />
        </Modal>
      )}
    </div>
  );
}

export default App;
