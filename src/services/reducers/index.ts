import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "./../actions/ingredients";
import { combineReducers } from "redux";
import { ADD_ITEM, DELETE_ITEM } from "./../actions/order";

const initialState = {
  ingredients: [],
  currentIngredient: {},
  totalPrice: 0,
  orderedIngredients: {
    buns: [{id:0,price:0}],
    filling: [],
  },
  ingredientsRequest: false,
  ingredientsFailed: false,
  isLoading: false,
  err: "",
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        totalPrice:
          state.totalPrice +
          (action.item.type === "bun"
            ? action.item.price * 2 - state.orderedIngredients.buns[0].price*2
            : action.item.price),
        orderedIngredients: {
          ...state.orderedIngredients,
          buns: action.item.type === "bun"
            ? [action.item, action.item]
            : [...state.orderedIngredients.buns],
          filling:
            action.item.type !== "bun"
              ? [...state.orderedIngredients.filling, action.item]
              : [...state.orderedIngredients.filling],
        },
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        totalPrice: state.totalPrice - action.item.price,
        orderedIngredients: {
          ...state.orderedIngredients,
          filling:
            action.item.type !== "bun"
              ? [...state.orderedIngredients.filling].filter(
                  (item: any) => item._id !== action.item._id
                )
              : [...state.orderedIngredients.filling],
        },
      };
    }
    default:
      return state;
  }
};

const ingredientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        err: action.err,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
});
