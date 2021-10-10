import { TWsState } from "./../../../types/types";
import { TWsActions } from "./../../../types/action-types/ws-types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START
} from "../../actions/ws";

const initialState: TWsState = {
  wsConnected: false,
  wsStarted: false,
  orders: [],
  totalOrdersCount: 0,
  todayOrdersCount: 0,
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsStarted: true,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsStarted: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...initialState,
        wsConnected: false,
        wsStarted: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders:
          action.orders.orders && action.orders.orders.length
            ? [...action.orders.orders]
            : [],
        totalOrdersCount: action.orders.total,
        todayOrdersCount: action.orders.totalToday,
      };

    default: {
      return state;
    }
  }
};
