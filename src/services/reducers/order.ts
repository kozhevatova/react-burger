import { ADD_ITEM, DELETE_ITEM } from './../actions/order';

export const totalPriceReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        totalPrice: state.totalPrice + action.item.price,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        totalPrice: state.totalPrice - action.item.price,
      };
    }
    default:
      return state;
  }
};