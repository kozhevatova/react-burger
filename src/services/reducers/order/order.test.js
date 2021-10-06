import { orderReducer } from "./order";

import {
  ADD_ITEM,
  DELETE_ITEM,
  MAKE_ORDER_REQUEST,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  OPEN_MADE_ORDER_MODAL,
  CLOSE_MADE_ORDER_MODAL,
  SWAP_INGREDIENTS,
} from "../../actions/order";
import { BASE_URL } from "../../../utils/constants";

const initialState = {
  totalPrice: 0,
  orderedIngredients: {
    buns: [{_id: '0',
      price: 0,
      name: '',
      image: '',
      type: "bun",
      qty: 0,
      }],
    filling: [],
  },
  orderRequest: false,
  orderFailed: false,
  orderId: 0,
  isOrderModalOpen: false,
  isMadeOrderModalOpen: false,
  error: "",
};

const orderSourceItems = {
  buns: [
    { _id: "123", price: 123, type: "bun" },
    { _id: "123", price: 123, type: "bun" },
  ],
  filling: [
    { price: 123, _id: "1", uid: "1" },
    { price: 123, _id: "2", uid: "2" },
  ],
};

const orderSourceItemsWithAdded = {
  buns: [
    { _id: "123", price: 123, type: "bun" },
    { _id: "123", price: 123, type: "bun" },
  ],
  filling: [
    { price: 123, _id: "1", uid: "1" },
    { price: 123, _id: "2", uid: "2" },
    { price: 123, _id: "3242342", uid: "1234" },
  ],
};

const swappedFilling = [
  { price: 123, _id: "2", uid: "2" },
  { price: 123, _id: "1", uid: "1" },
  { price: 123, _id: "3242342", uid: "1234" },
];

const ingredientSourceItem = { price: 123, _id: "3242342", uid: "1234" };
const testBunItem = { type: "bun", price: 123, _id: "31342", uid: "12341" };

const resStateWithItems = {
  ...initialState,
  orderedIngredients: { ...orderSourceItems },
};

const resStateWithAddedItem = {
  ...initialState,
  orderedIngredients: { ...orderSourceItemsWithAdded },
  totalPrice: 123,
};

describe("Проверка экшенов и редюсеров заказа", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should add item", () => {
    const addAction = {
      type: ADD_ITEM,
      item: testBunItem,
    };
    expect(orderReducer(initialState, addAction)).toEqual({
      ...initialState,
      orderedIngredients: {
        ...initialState.orderedIngredients,
        buns: [testBunItem, testBunItem],
      },
      totalPrice: 246,
    });
  });

  it("should delete item", () => {
    const deleteAction = {
      type: DELETE_ITEM,
      item: ingredientSourceItem,
    };
    expect(orderReducer(resStateWithAddedItem, deleteAction)).toEqual(
      resStateWithItems
    );
  });

  it("should make order request", () => {
    expect(orderReducer(initialState, { type: MAKE_ORDER_REQUEST })).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("should open modal", () => {
    expect(orderReducer(initialState, { type: OPEN_ORDER_MODAL })).toEqual({
      ...initialState,
      isOrderModalOpen: true,
    });
  });

  it("should close modal", () => {
    expect(orderReducer(initialState, { type: CLOSE_ORDER_MODAL })).toEqual({
      ...initialState,
      isOrderModalOpen: false,
    });
  });

  it("should open made order modal", () => {
    expect(orderReducer(initialState, { type: OPEN_MADE_ORDER_MODAL })).toEqual(
      {
        ...initialState,
        isMadeOrderModalOpen: true,
      }
    );
  });

  it("should close made order modal", () => {
    expect(
      orderReducer(initialState, { type: CLOSE_MADE_ORDER_MODAL })
    ).toEqual({
      ...initialState,
      isMadeOrderModalOpen: false,
    });
  });

  it("should swap ingredients", () => {
    expect(
      orderReducer(resStateWithItems, {
        type: SWAP_INGREDIENTS,
        filling: swappedFilling,
      })
    ).toEqual({
      ...initialState,
      orderedIngredients: {
        ...resStateWithItems.orderedIngredients,
        filling: [...swappedFilling],
      },
    });
  });
});
