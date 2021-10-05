import {
  ADD_ITEM,
  DELETE_ITEM,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SWAP_INGREDIENTS,
  OPEN_MADE_ORDER_MODAL,
  CLOSE_MADE_ORDER_MODAL,
} from "../../actions/order";
import { v4 } from "uuid";

const initialState = {
  totalPrice: 0,
  orderedIngredients: {
    buns: [{ _id: 0, price: 0 }],
    filling: [],
  },
  orderRequest: false,
  orderFailed: false,
  orderId: 0,
  isOrderModalOpen: false,
  isMadeOrderModalOpen: false,
  error: "",
};

export const orderReducer = (state = initialState, action) => {
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
            action.item.type === "bun" &&
            state.orderedIngredients.buns[0]._id !== action.item._id
              ? [action.item, action.item]
              : [...state.orderedIngredients.buns],
          filling:
            action.item.type !== "bun"
              ? [
                  ...state.orderedIngredients.filling,
                  { ...action.item, uid: v4() },
                ]
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
                  (item) => item.uid !== action.item.uid
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
        error: action.error,
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
    case OPEN_MADE_ORDER_MODAL: {
      return {
        ...state,
        isMadeOrderModalOpen: true,
      };
    }
    case CLOSE_MADE_ORDER_MODAL: {
      return {
        ...state,
        isMadeOrderModalOpen: false,
      };
    }
    
    case SWAP_INGREDIENTS: {
      return {
        ...state,
        orderedIngredients: {
          ...state.orderedIngredients,
          filling: [...action.filling],
        },
      };
    }
    default:
      return state;
  }
};
