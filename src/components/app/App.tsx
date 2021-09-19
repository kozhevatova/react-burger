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
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../login/login";
import Register from "../register/register";
import ForgotPassword from "../forgot-password/forgot-password";
import Profile from "../profile/profile";
import ResetPassword from "../reset-password/reset-password";
import { getUserInfo } from "../../services/actions/user";
import IngredientItemPage from "../ingredient-item-page/ingredient-item-page";
import ProtectedRoute from "../protected-route/protected-route";
import { getCookie } from "../../utils/utils";
import ProfileForm from "../profile-form/profile-form";
import ProfileOrders from "../profile-orders/profile-orders";

function App() {
  const history = useHistory();
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

  useEffect(() => {
    if (getCookie("refreshToken")) {
      dispatch(getUserInfo());
    }
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
    history.replace({ pathname: "/" });
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
          {/* временная замена лоудеру */}
          {isAppLoading && <p>Loading...</p>}
          {!isAppLoading && <MainContent setEscListener={setEscListener} />}
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <Profile>
            <ProfileOrders/>
          </Profile>
        </ProtectedRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/ingredients/:id">
          {isIngredientModalOpen ? (
            <Modal
              title={ingredientDetailsTitle}
              handleModalClose={handleModalsClose}
              handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
            >
              <IngredientDetails />
            </Modal>
          ) : (
            <IngredientItemPage />
          )}
        </Route>
      </Switch>

      {isOrderModalOpen && (
        <Modal
          title=""
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <OrderDetails />
        </Modal>
      )}
      {/* {isIngredientModalOpen && (
        <Modal
          title={ingredientDetailsTitle}
          handleModalClose={handleModalsClose}
          handleCloseByClickOnOverlay={handleCloseByClickOnOverlay}
        >
          <IngredientDetails />
        </Modal>
      )} */}
    </div>
  );
}

export default App;
