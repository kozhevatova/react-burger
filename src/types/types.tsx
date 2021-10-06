import { SyntheticEvent } from "react";

// export const dataItemProptypes = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired,
//   calories: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   image_mobile: PropTypes.string.isRequired,
//   image_large: PropTypes.string.isRequired,
// });

export interface LocationState {
  from: {
    pathname: string;
  };
  state: string[];
}

export type IconType = { burger: string; list: string; profile: string };
export type IconTypeKey = keyof IconType;

export type LinkType = { text: string; path: string; linkText: string };

export interface IAuthForm {
  title: string;
  buttonTitle: string;
  links: Array<LinkType>;
  onSubmit: (e: SyntheticEvent) => void;
}

export type IngredientType = {
  readonly _id: string;
  readonly price: number;
  readonly name: string;
  readonly image: string;
  readonly type: "bun" | "main" | "sauce";
  readonly uid?: string;
  qty: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
};

export type OrderedIngredientsType = {
  buns: Array<IngredientType>;
  filling: Array<IngredientType>;
};

export type OrderType = {
  _id: string;
  number?: number;
  createdAt: string;
  name: string;
  ingredients: Array<string>;
  status: string;
};

export interface IFillingItem {
  item: IngredientType;
  swapIngredients: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface IIngredientItem {
  item: IngredientType;
  setEscListener: () => void;
}

export interface IIngredientList {
  anchorId: string;
  title: string;
  data: IngredientType[];
  setEscListener: () => void;
}

export interface IModal {
  handleModalClose: () => void;
  handleCloseByClickOnOverlay: (e: SyntheticEvent) => void;
  title: string;
}

export interface IOrder {
  order: OrderType;
  wide: boolean;
  setEscListener: () => void;
}

export type TIngredientsState = {
  ingredients: Array<IngredientType>;
  currentIngredient: IngredientType | {};
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  isIngredientModalOpen: boolean;
  isLoading: boolean;
  error: string;
  currentTab: string;
};

export type TOrderState = {
  totalPrice: number;
  orderedIngredients: OrderedIngredientsType;
  orderRequest: boolean;
  orderFailed: boolean;
  orderId: number;
  isOrderModalOpen: boolean;
  isMadeOrderModalOpen: boolean;
  error: string;
};

export type TUserState = {
  user: { name: string; email: string };
  loginForm: {
    email: string;
    password: string;
  };
  registerForm: {
    email: string;
    password: string;
    name: string;
  };
  forgotPasswordForm: {
    email: string;
  };
  resetPasswordForm: {
    newPassword: string;
    token: string;
  };
  profileForm: {
    email: string;
    password: string;
    name: string;
  };
  registrationRequest: boolean;
  registrationFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  emailSent: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetSuccess: boolean;
  userInfoRequest: boolean;
  userInfoFailed: boolean;
  updateSuccess: boolean;
  updateUserInfoRequest: boolean;
  updateUserInfoRequestFailed: boolean;
  logoutRequest: boolean;
  logoutRequestFailed: boolean;
};

export type TWsState = {
  wsConnected: boolean;
  wsStarted: boolean;
  orders: Array<OrderType>;
  totalOrdersCount: number;
  todayOrdersCount: number;
};
