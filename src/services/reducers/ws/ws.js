import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../../actions/ws";

const initialState = {
  wsConnected: false,
  orders: [],
  totalOrdersCount: 0,
  todayOrdersCount: 0,
  history: [],
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
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
    
    default:
      return state;
  }
};
