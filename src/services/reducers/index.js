import { combineReducers } from "redux";
import {ingredientsReducer} from './ingredients/ingredients';
import {orderReducer} from './order/order';
import {userInfoReducer} from './user/user';
import {wsReducer} from './ws/ws';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  user: userInfoReducer,
  ws: wsReducer,
});
