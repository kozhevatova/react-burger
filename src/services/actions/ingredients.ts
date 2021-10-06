import { IngredientType } from './../../types/types';
import api from "../../utils/api";
import { AppDispatch } from "../store";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST" as const;
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS"  as const;
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED" as const;

export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS" as const;
export const RESET_INGREDIENT_DETAILS = "RESET_INGREDIENT_DETAILS" as const;

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL" as const;
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL" as const;

export const TAB_SWITCH = "TAB_SWITCH" as const;

export const INCREASE_COUNT = "INCREASE_COUNT" as const;
export const DECREASE_COUNT = "DECREASE_COUNT" as const;
export const RESET_COUNT = "RESET_COUNT" as const;

export const getAllIngredients: any = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    api.getIngredients().then((response) => {
      if(response && response.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: response.data.map((item: IngredientType) => ({...item, qty: 0})),
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: ''
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
