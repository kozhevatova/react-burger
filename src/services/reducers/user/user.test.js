import { userInfoReducer } from "./user";
import {
  REGISTER_FORM_SET_VALUE,
  FORGOT_PASSWORD_FORM_SET_VALUE,
  PROFILE_FORM_SET_VALUE,
  RESET_PASSWORD_FORM_SET_VALUE,
  REGISTER_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT,
  FORGOT_PASSWORD_FORM_SUBMIT,
  RESET_PASSWORD_FORM_SUBMIT,
  GET_USER_INFO_REQUEST,
  LOGOUT_REQUEST,
  UPDATE_USER_INFO_REQUEST,
  CLOSE_UPDATE_INFO_MODAL,
} from "../../actions/user";

const initialState = {
  user: {},
  loginForm: {
    email: "",
    password: "",
  },
  registerForm: {
    email: "",
    password: "",
    name: "",
  },
  forgotPasswordForm: {
    email: "",
  },
  resetPasswordForm: {
    newPassword: "",
    token: "",
  },
  profileForm: {
    email: "",
    password: "",
    name: "",
  },
  registrationRequest: false,
  registrationFailed: false,
  loginRequest: false,
  loginFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  emailSent: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetSuccess: false,
  userInfoRequest: false,
  userInfoFailed: false,
  updateSuccess: false,
  updateUserInfoRequest: false,
  updateUserInfoRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
};

const testUser = { name: "Anna", email: "test@test.ru" };

describe("Проверка экшенов и редюсеров пользователя", () => {
  it("should set register form value", () => {
    expect(
      userInfoReducer(initialState, {
        type: REGISTER_FORM_SET_VALUE,
        field: "name",
        value: "test",
      })
    ).toEqual({
      ...initialState,
      registerForm: {
        ...initialState.registerForm,
        name: "test",
      },
    });
  });

  it("should set forgot password form value", () => {
    expect(
      userInfoReducer(initialState, {
        type: FORGOT_PASSWORD_FORM_SET_VALUE,
        field: "name",
        value: "test",
      })
    ).toEqual({
      ...initialState,
      forgotPasswordForm: {
        ...initialState.forgotPasswordForm,
        name: "test",
      },
    });
  });

  it("should set reset password form value", () => {
    expect(
      userInfoReducer(initialState, {
        type: RESET_PASSWORD_FORM_SET_VALUE,
        field: "name",
        value: "test",
      })
    ).toEqual({
      ...initialState,
      resetPasswordForm: {
        ...initialState.resetPasswordForm,
        name: "test",
      },
    });
  });

  it("should set profile form value", () => {
    expect(
      userInfoReducer(initialState, {
        type: PROFILE_FORM_SET_VALUE,
        field: "name",
        value: "test",
      })
    ).toEqual({
      ...initialState,
      profileForm: {
        ...initialState.profileForm,
        name: "test",
      },
    });
  });

  it("should register form submit request", () => {
    expect(
      userInfoReducer(initialState, { type: REGISTER_FORM_SUBMIT })
    ).toEqual({
      ...initialState,
      registrationRequest: true,
      registrationFailed: false,
    });
  });

  it("should login form submit request", () => {
    expect(userInfoReducer(initialState, { type: LOGIN_FORM_SUBMIT })).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it("should forgot password form submit request", () => {
    expect(
      userInfoReducer(initialState, { type: FORGOT_PASSWORD_FORM_SUBMIT })
    ).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,
      emailSent: false,
    });
  });

  it("should reset password form submit request", () => {
    expect(
      userInfoReducer(initialState, { type: RESET_PASSWORD_FORM_SUBMIT })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordFailed: false,
      resetSuccess: false,
    });
  });

  it("should get user info request", () => {
    expect(
      userInfoReducer(initialState, { type: GET_USER_INFO_REQUEST })
    ).toEqual({
      ...initialState,
      userInfoFailed: false,
      userInfoRequest: true,
    });
  });

  it("should update user request", () => {
    expect(
      userInfoReducer(initialState, { type: UPDATE_USER_INFO_REQUEST })
    ).toEqual({
      ...initialState,
      updateUserInfoRequestFailed: false,
      updateUserInfoRequest: true,
      updateSuccess: false,
    });
  });

  it("should close update info modal", () => {
    expect(
      userInfoReducer(initialState, { type: CLOSE_UPDATE_INFO_MODAL })
    ).toEqual({
      ...initialState,
      updateSuccess: false,
    });
  });

  it("should logout request", () => {
    expect(userInfoReducer(initialState, { type: LOGOUT_REQUEST })).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutRequestFailed: false,
    });
  });
});
