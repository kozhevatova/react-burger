import {
  LOGIN_FORM_SET_VALUE,
  REGISTER_FORM_SET_VALUE,
  FORGOT_PASSWORD_FORM_SET_VALUE,
  PROFILE_FORM_SET_VALUE,
  RESET_PASSWORD_FORM_SET_VALUE,
  REGISTER_FORM_SUBMIT,
  REGISTER_FORM_SUBMIT_SUCCESS,
  REGISTER_FORM_SUBMIT_FAILED,
  LOGIN_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  FORGOT_PASSWORD_FORM_SUBMIT,
  FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS,
  FORGOT_PASSWORD_FORM_SUBMIT_FAILED,
  RESET_PASSWORD_FORM_SUBMIT,
  RESET_PASSWORD_FORM_SUBMIT_SUCCESS,
  RESET_PASSWORD_FORM_SUBMIT_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  CLOSE_UPDATE_INFO_MODAL,
} from "../../services/actions/user";

export interface ILoginFormSetValue {
  readonly type: typeof LOGIN_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IRegisterFormSetValue {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IForgotPasswordFormSetValue {
  readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IResetPasswordFormSetValue {
  readonly type: typeof RESET_PASSWORD_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IProfileFormSetValue {
  readonly type: typeof PROFILE_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IRegisterFormSubmit {
  readonly type: typeof REGISTER_FORM_SUBMIT;
}

export interface IRegisterFormSubmitSuccess {
  readonly type: typeof REGISTER_FORM_SUBMIT_SUCCESS;
  readonly data: {
    user: {
      email: string;
      name: string;
    };
  };
}

export interface IRegisterFormSubmitFailed {
  readonly type: typeof REGISTER_FORM_SUBMIT_FAILED;
}

export interface ILoginFormSubmit {
  readonly type: typeof LOGIN_FORM_SUBMIT;
}

export interface ILoginFormSubmitSuccess {
  readonly type: typeof LOGIN_FORM_SUBMIT_SUCCESS;
  readonly data: {
    user: {
      email: string;
      name: string;
    };
  };
}

export interface ILoginFormSubmitFailed {
  readonly type: typeof LOGIN_FORM_SUBMIT_FAILED;
}

export interface IForgotPasswordFormSubmit {
  readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT;
}

export interface IForgotPasswordFormSubmitSuccess {
  readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS;
}

export interface IForgotPasswordFormSubmitFailed {
  readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT_FAILED;
}

export interface IResetPasswordFormSubmit {
  readonly type: typeof RESET_PASSWORD_FORM_SUBMIT;
}

export interface IResetPasswordFormSubmitSuccess {
  readonly type: typeof RESET_PASSWORD_FORM_SUBMIT_SUCCESS;
}

export interface IResetPasswordFormSubmitFailed {
  readonly type: typeof RESET_PASSWORD_FORM_SUBMIT_FAILED;
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}

export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly user: { email: string; name: string };
}

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutRequestSuccess {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export interface ILogoutRequestFailed {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export interface IUpdateUserInfoRequest {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
}

export interface IUpdateUserInfoSuccess {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  readonly user: { email: string; name: string };
}

export interface IUpdateUserInfoFailed {
  readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export interface ICloseUpdateInfoModal {
  readonly type: typeof CLOSE_UPDATE_INFO_MODAL;
}

export type TUserActions =
  | ILoginFormSetValue
  | IRegisterFormSetValue
  | IForgotPasswordFormSetValue
  | IResetPasswordFormSetValue
  | IProfileFormSetValue
  | IRegisterFormSubmit
  | IRegisterFormSubmitSuccess
  | IRegisterFormSubmitFailed
  | ILoginFormSubmit
  | ILoginFormSubmitSuccess
  | ILoginFormSubmitFailed
  | IForgotPasswordFormSubmit
  | IForgotPasswordFormSubmitSuccess
  | IForgotPasswordFormSubmitFailed
  | IResetPasswordFormSubmit
  | IResetPasswordFormSubmitSuccess
  | IResetPasswordFormSubmitFailed
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | ILogoutRequest
  | ILogoutRequestSuccess
  | ILogoutRequestFailed
  | IUpdateUserInfoRequest
  | IUpdateUserInfoSuccess
  | IUpdateUserInfoFailed
  | ICloseUpdateInfoModal;
