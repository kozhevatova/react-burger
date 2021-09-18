import { combineReducers } from "redux";
import {ingredientsReducer} from './ingredients';
import {orderReducer} from './order';
import {formReducer} from './form';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  form: formReducer,
});
