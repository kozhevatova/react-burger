import { getCookie } from "./../../utils/utils";
import {
  ILoginFormSetValue,
  IForgotPasswordFormSetValue,
  IResetPasswordFormSetValue,
  IProfileFormSetValue,
} from "./../../types/action-types/user-types";
import { IRegisterFormSetValue } from "../../types/action-types/user-types";
import api from "../../utils/api";
import { setTokens, deleteCookie } from "../../utils/utils";
import store, { AppDispatch } from "../store";

export const LOGIN_FORM_SET_VALUE = "LOGIN_FORM_SET_VALUE" as const;
export const REGISTER_FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE" as const;
export const FORGOT_PASSWORD_FORM_SET_VALUE =
  "FORGOT_PASSWORD_FORM_SET_VALUE" as const;
export const RESET_PASSWORD_FORM_SET_VALUE =
  "RESET_PASSWORD_FORM_SET_VALUE" as const;
export const PROFILE_FORM_SET_VALUE = "PROFILE_FORM_SET_VALUE" as const;

export const LOGIN_FORM_SUBMIT = "LOGIN_FORM_SUBMIT" as const;
export const REGISTER_FORM_SUBMIT = "REGISTER_FORM_SUBMIT" as const;
export const FORGOT_PASSWORD_FORM_SUBMIT =
  "FORGOT_PASSWORD_FORM_SUBMIT" as const;
export const RESET_PASSWORD_FORM_SUBMIT = "RESET_PASSWORD_FORM_SUBMIT" as const;

export const LOGIN_FORM_SUBMIT_SUCCESS = "LOGIN_FORM_SUBMIT_SUCCESS" as const;
export const REGISTER_FORM_SUBMIT_SUCCESS =
  "REGISTER_FORM_SUBMIT_SUCCESS" as const;
export const FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS =
  "FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS" as const;
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS =
  "RESET_PASSWORD_FORM_SUBMIT_SUCCESS" as const;

export const LOGIN_FORM_SUBMIT_FAILED = "LOGIN_FORM_SUBMIT_FAILED" as const;
export const REGISTER_FORM_SUBMIT_FAILED =
  "REGISTER_FORM_SUBMIT_FAILED" as const;
export const FORGOT_PASSWORD_FORM_SUBMIT_FAILED =
  "FORGOT_PASSWORD_FORM_SUBMIT_FAILED" as const;
export const RESET_PASSWORD_FORM_SUBMIT_FAILED =
  "RESET_PASSWORD_FORM_SUBMIT_FAILED" as const;

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST" as const;
export const GET_USER_INFO_FAILED = "GET_USER_INFO_REQUEST_FAILED" as const;
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_REQUEST_SUCCESS" as const;

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST" as const;
export const UPDATE_USER_INFO_FAILED =
  "UPDATE_USER_INFO_REQUEST_FAILED" as const;
export const UPDATE_USER_INFO_SUCCESS =
  "UPDATE_USER_INFO_REQUEST_SUCCESS" as const;
export const CLOSE_UPDATE_INFO_MODAL = "CLOSE_UPDATE_INFO_MODAL" as const;

export const LOGOUT_REQUEST = "LOGOUT_REQUEST" as const;
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS" as const;
export const LOGOUT_REQUEST_FAILED = "LOGOUT_REQUEST_FAILED" as const;

export const setLoginFormValue = (
  field: string,
  value: string
): ILoginFormSetValue => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export const setRegisterFormValue = (
  field: string,
  value: string
): IRegisterFormSetValue => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});

export const setForgotPasswordFormValue = (
  field: string,
  value: string
): IForgotPasswordFormSetValue => ({
  type: FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const setResetPasswordFormValue = (
  field: string,
  value: string
): IResetPasswordFormSetValue => ({
  type: RESET_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const setProfileFormValue = (
  field: string,
  value: string
): IProfileFormSetValue => ({
  type: PROFILE_FORM_SET_VALUE,
  field,
  value,
});

export const registerFormSubmit: any = () => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({
      type: REGISTER_FORM_SUBMIT,
    });
    const { name, email, password } = getState().user.registerForm;
    api
      .register(name, email, password)
      .then((data) => {
        setTokens(data);
        dispatch({
          type: REGISTER_FORM_SUBMIT_SUCCESS,
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: REGISTER_FORM_SUBMIT_FAILED,
        });
      });
  };
};

export const loginFormSubmit: any = () => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({
      type: LOGIN_FORM_SUBMIT,
    });
    const { email, password } = getState().user.loginForm;
    api
      .login(email, password)
      .then((data) => {
        setTokens(data);
        dispatch({ type: LOGIN_FORM_SUBMIT_SUCCESS, data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: LOGIN_FORM_SUBMIT_FAILED });
      });
  };
};

export const forgotPasswordFormSubmit: any = () => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({
      type: FORGOT_PASSWORD_FORM_SUBMIT,
    });
    const { email } = getState().user.forgotPasswordForm;
    api
      .requestResetPassword(email)
      .then((data) => {
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS });
        localStorage.setItem("emailSent", JSON.stringify(true));
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
};

export const resetPasswordFormSubmit: any = () => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({
      type: RESET_PASSWORD_FORM_SUBMIT,
    });
    const { newPassword, token } = getState().user.resetPasswordForm;
    api
      .resetPassword(newPassword, token)
      .then((data) => {
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS });
        localStorage.removeItem("emailSent");
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
};

export const logout: any = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    api
      .logout()
      .then((res) => {
        deleteCookie("token");
        deleteCookie("refreshToken");
        dispatch({ type: LOGOUT_REQUEST_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: LOGOUT_REQUEST_FAILED });
      });
  };
};

const handleTokenExpire: (
  error: { message: string },
  dispatch: AppDispatch,
  repeatRequestAfterRefresh: any
) => void = (error, dispatch, repeatRequestAfterRefresh) => {
  if (error.message === "Ошибка: 403" || error.message === "Ошибка: 401") {
    api
      .refreshToken()
      .then((data) => {
        setTokens(data);
        dispatch(repeatRequestAfterRefresh);
      })
      .catch((error) => console.log(error));
  }
};

const checkToken = () => {
  if (!getCookie("token") && getCookie("refreshToken")) {
    api
      .refreshToken()
      .then((data) => {
        setTokens(data);
      })
      .catch((error) => console.log(error));
  }
};

export const getUserInfo: any = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
    checkToken();
    api
      .getUserInfo()
      .then((data) => {
        dispatch({ type: GET_USER_INFO_SUCCESS, user: data.user });
      })
      .catch((error) => {
        console.log(error.message);
        handleTokenExpire(error, dispatch, getUserInfo);
        dispatch({ type: GET_USER_INFO_FAILED });
      });
  };
};

export const updateUserInfo: any = () => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });
    const { name, email, password } = getState().user.profileForm;
    api
      .updateUserInfo(name, email, password)
      .then((data) => {
        dispatch({ type: UPDATE_USER_INFO_SUCCESS, user: data.user });
      })
      .catch((error) => {
        console.log(error.message);
        handleTokenExpire(error, dispatch, updateUserInfo);
        dispatch({ type: UPDATE_USER_INFO_FAILED });
      });
  };
};
