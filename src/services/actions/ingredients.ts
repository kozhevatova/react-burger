import api from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS = "RESET_INGREDIENT_DETAILS";

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";

export const TAB_SWITCH = "TAB_SWITCH";

export const getAllIngredients = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    api.getIngredients().then((res) => {
      if(res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        err: err,
      })
    });
  };
};
