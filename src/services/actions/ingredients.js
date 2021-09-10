import api from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS = "RESET_INGREDIENT_DETAILS";

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";

export const TAB_SWITCH = "TAB_SWITCH";

export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const RESET_COUNT = "RESET_COUNT";

export const getAllIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    api.getIngredients().then((response) => {
      if(response && response.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: response.data.map((item) => ({...item, qty: 0})),
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        error: error.message,
      })
    });
  };
};
