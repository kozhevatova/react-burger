import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_DETAILS,
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  TAB_SWITCH,
} from "./../actions/ingredients";
import { combineReducers } from "redux";
import {
  ADD_ITEM,
  DELETE_ITEM,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
} from "./../actions/order";

const initialState = {
  ingredients: [],
  currentIngredient: {},
  totalPrice: 0,
  orderedIngredients: {
    buns: [{ id: 0, price: 0 }],
    filling: [],
  },
  ingredientsRequest: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderFailed: false,
  orderId: 0,
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
  isLoading: false,
  err: "",
  currentTab: 'bun',
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        totalPrice:
          state.totalPrice +
          (action.item.type === "bun"
            ? action.item.price * 2 - state.orderedIngredients.buns[0].price * 2
            : action.item.price),
        orderedIngredients: {
          ...state.orderedIngredients,
          buns:
            action.item.type === "bun"
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
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderId: action.orderId,
        orderedIngredients: initialState.orderedIngredients,
        totalPrice: initialState.totalPrice,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderId: initialState.orderId,
        err: action.err,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: false,
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
        err: initialState.err,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        err: initialState.err,
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
      }
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
