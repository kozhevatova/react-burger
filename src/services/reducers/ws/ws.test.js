import { wsReducer } from "./ws";
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

describe("Проверка экшенов и редюсеров сокета", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it("should ws connection success", () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should ws connection error", () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  
  it("should ws connection close", () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
});
