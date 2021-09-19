import api from "../../utils/api";
import { getCookie, setTokens, deleteCookie } from "../../utils/utils";

export const LOGIN_FORM_SET_VALUE = "LOGIN_FORM_SET_VALUE";
export const REGISTER_FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE";
export const FORGOT_PASSWORD_FORM_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";
export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE";
export const PROFILE_FORM_SET_VALUE = "PROFILE_FORM_SET_VALUE";

export const LOGIN_FORM_SUBMIT = "LOGIN_FORM_SUBMIT";
export const REGISTER_FORM_SUBMIT = "REGISTER_FORM_SUBMIT";
export const FORGOT_PASSWORD_FORM_SUBMIT = "FORGOT_PASSWORD_FORM_SUBMIT";
export const RESET_PASSWORD_FORM_SUBMIT = "RESET_PASSWORD_FORM_SUBMIT";

export const LOGIN_FORM_SUBMIT_SUCCESS = "LOGIN_FORM_SUBMIT_SUCCESS";
export const REGISTER_FORM_SUBMIT_SUCCESS = "REGISTER_FORM_SUBMIT_SUCCESS";
export const FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS =
  "FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS";
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS =
  "RESET_PASSWORD_FORM_SUBMIT_SUCCESS";

export const LOGIN_FORM_SUBMIT_FAILED = "LOGIN_FORM_SUBMIT_FAILED";
export const REGISTER_FORM_SUBMIT_FAILED = "REGISTER_FORM_SUBMIT_FAILED";
export const FORGOT_PASSWORD_FORM_SUBMIT_FAILED =
  "FORGOT_PASSWORD_FORM_SUBMIT_FAILED";
export const RESET_PASSWORD_FORM_SUBMIT_FAILED =
  "RESET_PASSWORD_FORM_SUBMIT_FAILED";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_REQUEST_FAILED";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_REQUEST_SUCCESS";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_FAILED = "UPDATE_USER_INFO_REQUEST_FAILED";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_REQUEST_SUCCESS";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";
export const LOGOUT_REQUEST_FAILED = "LOGOUT_REQUEST_FAILED";

export const setLoginFormValue = (field, value) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export const setRegisterFormValue = (field, value) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});

export const setForgotPasswordFormValue = (field, value) => ({
  type: FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const setResetPasswordFormValue = (field, value) => ({
  type: RESET_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const setProfileFormValue = (field, value) => ({
  type: PROFILE_FORM_SET_VALUE,
  field,
  value,
});

export const registerFormSubmit = () => {
  return (dispatch, getState) => {
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

export const loginFormSubmit = () => {
  return (dispatch, getState) => {
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

export const forgotPasswordFormSubmit = () => {
  return (dispatch, getState) => {
    dispatch({
      type: FORGOT_PASSWORD_FORM_SUBMIT,
    });
    const { email } = getState().user.forgotPasswordForm;
    api
      .requestResetPassword(email)
      .then((data) => {
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
};

export const resetPasswordFormSubmit = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_PASSWORD_FORM_SUBMIT,
    });
    const { newPassword, token } = getState().user.resetPasswordForm;
    api
      .resetPassword(newPassword, token)
      .then((data) => {
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    api
      .logout()
      .then((res) => {
        deleteCookie('token');
        deleteCookie('refreshToken');
        dispatch({ type: LOGOUT_REQUEST_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: LOGOUT_REQUEST_FAILED });
      });
  };
}

const handleTokenExpire = (error, dispatch, repeatRequestAfterRefresh) => {
  if (error.message==='Ошибка: 403') {
    api
      .refreshToken()
      .then((data) => {
        console.log(data)
        setTokens(data);
        dispatch(repeatRequestAfterRefresh);
      })
      .catch((error) => console.log(error));
  }
}

export const getUserInfo = () => {
  console.log('getuserinfo',getCookie('token'))
  return (dispatch) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
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

export const updateUserInfo = () => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });
    const {name, email, password} = getState().user.profileForm;
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
}
