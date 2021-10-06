import { IngredientType } from './../types';
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
} from "../../services/actions/ingredients";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<IngredientType>
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly error: string
}

export interface IGetIngredientDetails {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  readonly item: IngredientType
}

export interface IOpenIngredientModal {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
}

export interface ICloseIngredientModal {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export interface ITabSwitch {
  readonly type: typeof TAB_SWITCH;
  readonly tab: string;
}

export interface IIncreaseCount {
  readonly type: typeof INCREASE_COUNT;
  readonly item: IngredientType;
}

export interface IDecreaseCount {
  readonly type: typeof DECREASE_COUNT;
  readonly item: IngredientType;
}

export interface IResetCount {
  readonly type: typeof RESET_COUNT;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IGetIngredientDetails
  | IOpenIngredientModal
  | ICloseIngredientModal
  | ITabSwitch
  | IIncreaseCount
  | IDecreaseCount
  | IResetCount;
