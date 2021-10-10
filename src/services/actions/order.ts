import { OrderedIngredientsType } from "./../../types/types";
import api from "../../utils/api";
import { AppDispatch } from "../store";

export const ADD_ITEM = "ADD_ITEM" as const;
export const DELETE_ITEM = "DELETE_ITEM" as const;
export const GET_ORDERED_INGREDIENTS = "GET_ORDERED_INGREDIENTS" as const;

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST" as const;
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS" as const;
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED" as const;

export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL" as const;
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL" as const;

export const OPEN_MADE_ORDER_MODAL = "OPEN_MADE_ORDER_MODAL" as const;
export const CLOSE_MADE_ORDER_MODAL = "CLOSE_MADE_ORDER_MODAL" as const;

export const SWAP_INGREDIENTS = "SWAP_INGREDIENTS" as const;

export const makeOrder: (
  orderedIngredients: OrderedIngredientsType
) => (dispatch: AppDispatch) => void = (orderedIngredients) => {
  return (dispatch) => {
    dispatch({
      type: MAKE_ORDER_REQUEST,
    });
    api
      .makeOrder(
        orderedIngredients.buns
          .concat(orderedIngredients.filling)
          .map((item) => {
            return item._id;
          })
      )
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: MAKE_ORDER_SUCCESS,
            orderId: response.order.number,
          });
          dispatch({ type: OPEN_ORDER_MODAL });
        } else {
          dispatch({ type: MAKE_ORDER_FAILED, error: "" });
        }
      })
      .catch((error) => {
        dispatch({ type: MAKE_ORDER_FAILED, error: error.message });
      });
  };
};

export const closeOrderModal: () => (dispatch: AppDispatch) => void = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
};

export const closeMadeOrderModal: () => (dispatch: AppDispatch) => void =
  () => {
    return (dispatch) => {
      dispatch({ type: CLOSE_MADE_ORDER_MODAL });
    };
  };
