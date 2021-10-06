import { wsUrl } from './../utils/constants';
import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import thunkMiddleware from "redux-thunk";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "./actions/ws";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
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
export type AppDispatch = typeof store.dispatch;
export const useSelectorHook:TypedUseSelectorHook<RootState> = useSelector;
export type ThunkType = ActionCreator<ThunkAction<Promise<Action>, RootState, void, any>>

export default store;