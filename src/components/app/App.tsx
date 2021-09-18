import React, { SyntheticEvent, useCallback, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {
  CLOSE_INGREDIENT_MODAL,
  getAllIngredients,
} from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ORDER_MODAL } from "../../services/actions/order";
import MainContent from "../main-content/main-content";
import Modal from "../modal/modal";
import { Route, Switch } from "react-router-dom";
import Login from "../login/login";
import Register from "../register/register";
import ForgotPassword from "../forgot-password/forgot-password";
import Profile from "../profile/profile";
import ResetPassword from "../reset-password/reset-password";

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
    <div className={styles.App}>
      <AppHeader />
      <Switch>
        <Route exact path="/">
          {isAppLoading && <p>Loading...</p>}
          {!isAppLoading && <MainContent setEscListener={setEscListener} />}
          {isOrderModalOpen && (
            <Modal
              title=""
              handleModalClose={handleModalsClose}
              handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
            >
              <OrderDetails />
            </Modal>
          )}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword/>
        </Route>
      </Switch>
      {/* временная замена лоудеру */}
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
