import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { ingredientDetailsTitle } from "../../utils/constants";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {
  CLOSE_INGREDIENT_MODAL,
  getAllIngredients,
} from "../../services/actions/ingredients";
import {
  CLOSE_MADE_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
} from "../../services/actions/order";
import MainContent from "../../pages/main-content/main-content";
import Modal from "../modal/modal";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import { CLOSE_UPDATE_INFO_MODAL, getUserInfo } from "../../services/actions/user";
import IngredientItemPage from "../../pages/ingredient-item-page/ingredient-item-page";
import ProtectedRoute from "../protected-route/protected-route";
import ProfileForm from "../profile-form/profile-form";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Feed from "../../pages/feed/feed";
import OrderList from "../order-list/order-list";
import Order from "../../pages/order/order";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { LocationState } from "../../types/types";

function App() {
  const history = useHistory();
  const { isOrderModalOpen, isMadeOrderModalOpen } = useSelectorHook(
    (store) => store.order
  );
  const { isIngredientModalOpen } = useSelectorHook(
    (store) => store.ingredients
  );
  const isAppLoading = useSelectorHook(
    (store) => store.ingredients.ingredientsRequest
  );
  const updateSuccess = useSelectorHook((store) => store.user.updateSuccess);
  const location = useLocation<LocationState>();
  let background: typeof location | undefined;
  if (history.action !== "POP" && location.state) {
    background = location.state.background;
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  //закрытие всех модальных окон
  const handleModalsClose = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
    dispatch({ type: CLOSE_UPDATE_INFO_MODAL });
    dispatch({ type: CLOSE_MADE_ORDER_MODAL });
  };

  return (
    <div className={styles.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          {/* временная замена лоудеру */}
          {isAppLoading && <p>Loading...</p>}
          {!isAppLoading && <MainContent />}
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <Profile>
            <OrderList wide />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <Order isModal={false} />
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
          <IngredientItemPage />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route path="/feed/:id">
          <Order isModal={false} />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      {background && isIngredientModalOpen && (
        <Route path="/ingredients/:id">
          <Modal
            title={ingredientDetailsTitle}
            handleModalClose={handleModalsClose}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && isMadeOrderModalOpen && (
        <Route path="/feed/:id">
          <Modal title="" handleModalClose={handleModalsClose}>
            <Order isModal={true} />
          </Modal>
        </Route>
      )}
      {background && isMadeOrderModalOpen && (
        <ProtectedRoute path="/profile/orders/:id">
          <Modal title="" handleModalClose={handleModalsClose}>
            <Order isModal={true} />
          </Modal>
        </ProtectedRoute>
      )}
      {isOrderModalOpen && (
        <Modal title="" handleModalClose={handleModalsClose}>
          <OrderDetails />
        </Modal>
      )}
      {updateSuccess && (
        <Modal title="Уведомление" handleModalClose={handleModalsClose}>
          <p className="text text_type_main-medium">Данные успешно обновлены</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
