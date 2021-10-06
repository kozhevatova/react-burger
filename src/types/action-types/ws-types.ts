import { OrderType } from "./../types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from "../../services/actions/ws";

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly orders: {
    orders: Array<OrderType>;
    total: number;
    totalToday: number;
  };
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export type TWsActions =
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders
  | IWsConnectionStart;
