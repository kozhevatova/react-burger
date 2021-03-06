import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_DETAILS,
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  TAB_SWITCH,
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT,
} from "../../actions/ingredients";

import { TIngredientsActions } from "../../../types/action-types/ingredient-types";
import { TIngredientsState } from "../../../types/types";

const initialState: TIngredientsState = {
  ingredients: [],
  currentIngredient: {},
  ingredientsRequest: false,
  ingredientsFailed: false,
  isIngredientModalOpen: false,
  isLoading: false,
  error: "",
  currentTab: "bun",
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
        error: initialState.error,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        error: initialState.error,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        error: action.error,
      };
    }
    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: true,
      };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        currentIngredient: {},
        isIngredientModalOpen: false,
      };
    }
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.tab,
      };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => {
          if (action.item.type === "bun" && item.type === "bun") {
            if (item._id === action.item._id) {
              return { ...item, qty: 1 };
            } else {
              return { ...item, qty: 0 };
            }
          } else if (item._id === action.item._id) {
            return { ...item, qty: ++item.qty };
          }
          return item;
        }),
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item._id ? { ...item, qty: --item.qty } : item
        ),
      };
    }
    case RESET_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => ({
          ...item,
          qty: 0,
        })),
      };
    }
    default: {
      return state;
    }
  }
};
