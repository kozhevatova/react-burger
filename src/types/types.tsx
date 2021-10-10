import { SyntheticEvent } from "react";

export type LocationState = {
  from: Location;
  background?: any;
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
  _id: string;
  price: number;
  name: string;
  image: string;
  type: "bun" | "main" | "sauce";
  uid?: string;
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


export interface IIngredientList {
  anchorId: string;
  title: string;
  data: IngredientType[];
}

export interface IModal {
  handleModalClose: () => void;
  title: string;
}

export interface IOrder {
  order: OrderType;
  wide: boolean;
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
