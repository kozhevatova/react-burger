import api from "../../utils/api";

export const LOGIN_FORM_SET_VALUE = "LOGIN_FORM_SET_VALUE";
export const REGISTER_FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE";
export const FORGOT_PASSWORD_FORM_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";
export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE";
export const PROFILE_FORM_SET_VALUE = "PROFILE_FORM_SET_VALUE";

export const LOGIN_FORM_SUBMIT = "LOGIN_FORM_SUBMIT";
export const REGISTER_FORM_SUBMIT = "REGISTER_FORM_SUBMIT";
export const FORGOT_PASSWORD_FORM_SUBMIT = "FORGOT_PASSWORD_FORM_SUBMIT";
export const RESET_PASSWORD_FORM_SUBMIT = "RESET_PASSWORD_FORM_SUBMIT";
export const PROFILE_FORM_SUBMIT = "PROFILE_FORM_SUBMIT";

export const LOGIN_FORM_SUBMIT_SUCCESS = "LOGIN_FORM_SUBMIT_SUCCESS";
export const REGISTER_FORM_SUBMIT_SUCCESS = "REGISTER_FORM_SUBMIT_SUCCESS";
export const FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS =
  "FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS";
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS =
  "RESET_PASSWORD_FORM_SUBMIT_SUCCESS";
export const PROFILE_FORM_SUBMIT_SUCCESS = "PROFILE_FORM_SUBMIT_SUCCESS";

export const LOGIN_FORM_SUBMIT_FAILED = "LOGIN_FORM_SUBMIT_FAILED";
export const REGISTER_FORM_SUBMIT_FAILED = "REGISTER_FORM_SUBMIT_FAILED";
export const FORGOT_PASSWORD_FORM_SUBMIT_FAILED =
  "FORGOT_PASSWORD_FORM_SUBMIT_FAILED";
export const RESET_PASSWORD_FORM_SUBMIT_FAILED =
  "RESET_PASSWORD_FORM_SUBMIT_FAILED";
export const PROFILE_FORM_SUBMIT_FAILED = "PROFILE_FORM_SUBMIT_FAILED";

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
    const {name, email, password} = getState().form.registerForm;
    api
      .register(name, email, password)
      .then((data) => {
        console.log("action", data);
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
    const {email, password} = getState().form.loginForm;
    api.login(email,password)
    .then((data) => {
      console.log('action', data)
      dispatch({type: LOGIN_FORM_SUBMIT_SUCCESS, data})
    })
    .catch((error) => {
      console.log(error);
      dispatch({type: LOGIN_FORM_SUBMIT_FAILED});
    })
  }
}