import { IngredientType } from "./../types";
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
} from "../../services/actions/order";

export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly item: IngredientType;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly item: IngredientType;
}

export interface IMakeOrderRequest {
  readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderSuccess {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly orderId: number;
}

export interface IMakeOrderFailed {
  readonly type: typeof MAKE_ORDER_FAILED;
  readonly error: string;
}

export interface IOpenMadeOrderModal {
  readonly type: typeof OPEN_MADE_ORDER_MODAL;
}

export interface ICloseMadeOrderModal {
  readonly type: typeof CLOSE_MADE_ORDER_MODAL;
}

export interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface ISwapIngredients {
  readonly type: typeof SWAP_INGREDIENTS;
  readonly filling: Array<IngredientType>;
}

export type TOrderActions =
  | IAddItem
  | IDeleteItem
  | IMakeOrderRequest
  | IMakeOrderSuccess
  | IMakeOrderFailed
  | IOpenMadeOrderModal
  | ICloseMadeOrderModal
  | IOpenOrderModal
  | ICloseOrderModal
  | ISwapIngredients;
