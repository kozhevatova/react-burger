import { TUserActions } from './../types/action-types/user-types';
import { TOrderActions } from './../types/action-types/order-types';
import { TIngredientsActions } from './../types/action-types/ingredient-types';
import { TWsActions } from './../types/action-types/ws-types';
import { wsUrl } from './../utils/constants';
import { applyMiddleware, createStore, compose, AnyAction, Dispatch } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import thunkMiddleware from "redux-thunk";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
} from "./actions/ws";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { SetStateAction } from 'react';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))
    )
  );

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;
export type TAppState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch<SetStateAction<any>>;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useSelectorHook:TypedUseSelectorHook<RootState> = useSelector;
export type ThunkType = ActionCreator<ThunkAction<Promise<Action>, RootState, void, AnyAction>> | (() => (dispatch: AppDispatch, getState: () => RootState) => void);
export type TActions = TWsActions | TIngredientsActions | TOrderActions | TUserActions | ThunkType;

export default store;