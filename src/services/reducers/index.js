import { combineReducers } from "redux";
import {ingredientsReducer} from './ingredients';
import {orderReducer} from './order';
import {userInfoReducer} from './user';
import {wsReducer} from './ws';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  user: userInfoReducer,
  ws: wsReducer,
});
