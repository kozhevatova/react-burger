import { ingredientsReducer } from "./ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENT_DETAILS,
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  TAB_SWITCH,
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT,
} from "../../actions/ingredients";

const initialState = {
  ingredients: [{ qty: 0 }],
  currentIngredient: {},
  ingredientsRequest: false,
  ingredientsFailed: false,
  isIngredientModalOpen: false,
  isLoading: false,
  error: "",
  currentTab: "bun",
};

const testItem = { _id: "123", type: "main", qty: 1 };
const testIngredients = [{ _id: "123", type: "main", qty: 1 }, { _id: "124", type: "main", qty: 1 }]

const stateWithItem = {
  ...initialState,
  ingredients: [testItem],
};

const stateWithIncreasedItem = {
  ...initialState,
  ingredients: [{ ...testItem, qty: 2 }],
};

const stateWithDecreasedItem = {
  ...initialState,
  ingredients: [{ ...testItem, qty: 1 }],
};

describe("Проверка экшенов и редюсеров ингредиентов", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should get ingredients request", () => {
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
      error: "",
    });
  });

  it("should get ingredietns details", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENT_DETAILS,
        item: testItem,
      })
    ).toEqual({
      ...initialState,
      currentIngredient: testItem,
    });
  });

  it("should open ingredient modal", () => {
    expect(
      ingredientsReducer(initialState, { type: OPEN_INGREDIENT_MODAL })
    ).toEqual({
      ...initialState,
      isIngredientModalOpen: true,
    });
  });

  it("should close ingredient modal", () => {
    expect(
      ingredientsReducer(initialState, { type: CLOSE_INGREDIENT_MODAL })
    ).toEqual({
      ...initialState,
      isIngredientModalOpen: false,
    });
  });

  it("should switch tab", () => {
    expect(
      ingredientsReducer(initialState, { type: TAB_SWITCH, tab: "bun" })
    ).toEqual({
      ...initialState,
      currentTab: "bun",
    });
  });

  it("should increase count", () => {
    expect(
      ingredientsReducer(stateWithItem, {
        type: INCREASE_COUNT,
        item: testItem,
      })
    ).toEqual(stateWithIncreasedItem);
  });

  it("should decrease count", () => {
    expect(
      ingredientsReducer(stateWithIncreasedItem, {
        type: DECREASE_COUNT,
        item: testItem,
      })
    ).toEqual(stateWithDecreasedItem);
  });

  it("should reset count", () => {
    expect(
      ingredientsReducer(stateWithItem, { type: RESET_COUNT, item: testItem })
    ).toEqual({
      ...initialState,
      ingredients: [{ ...testItem, qty: 0 }],
    });
  });
});
