import React, { SyntheticEvent, useCallback, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import appStyles from "./App.module.css";
import Modal from "../Modal/Modal";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  CLOSE_INGREDIENT_MODAL,
  getAllIngredients,
} from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ORDER_MODAL } from "../../services/actions/order";

function App() {
  const { isOrderModalOpen, isIngredientModalOpen } = useSelector(
    (store: any) => ({
      isOrderModalOpen: store.order.isOrderModalOpen,
      isIngredientModalOpen: store.ingredients.isIngredientModalOpen,
    })
  );
  const isAppLoading = useSelector(
    (store: any) => store.ingredients.ingredientsRequest
  );
  const dispatch = useDispatch();

  useEffect(() => {
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
    dispatch({ type: CLOSE_ORDER_MODAL });
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
    removeEscListener();
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

  return (
    <div className={appStyles.App}>
      <AppHeader />
      {/* временная замена лоудеру */}
      {isAppLoading && <p>Loading...</p>}
      {!isAppLoading && <Main setEscListener={setEscListener} />}
      {isOrderModalOpen && (
        <Modal
          title=""
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <OrderDetails />
        </Modal>
      )}
      {isIngredientModalOpen && (
        <Modal
          title={ingredientDetailsTitle}
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
