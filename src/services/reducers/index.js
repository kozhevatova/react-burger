import { combineReducers } from "redux";
import {ingredientsReducer} from './ingredients';
import {orderReducer} from './order';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
});
