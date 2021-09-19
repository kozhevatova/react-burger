import { combineReducers } from "redux";
import {ingredientsReducer} from './ingredients';
import {orderReducer} from './order';
import {userInfoReducer} from './user';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  user: userInfoReducer,
});
