import api from "../../utils/api";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const GET_ORDERED_INGREDIENTS = "GET_ORDERED_INGREDIENTS";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export const OPEN_MADE_ORDER_MODAL = "OPEN_MADE_ORDER_MODAL";
export const CLOSE_MADE_ORDER_MODAL = "CLOSE_MADE_ORDER_MODAL";

export const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
export const RESET_CURRENT_ORDER = "RESET_CURRENT_ORDER";

export const SWAP_INGREDIENTS = "SWAP_INGREDIENTS";

export const makeOrder = (orderedIngredients) => {
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
          dispatch({ type: MAKE_ORDER_FAILED });
        }
      })
      .catch((error) => {
        dispatch({ type: MAKE_ORDER_FAILED, error: error.message });
      });
  };
};

export const closeOrderModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
};

export const closeMadeOrderModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MADE_ORDER_MODAL });
  };
};
