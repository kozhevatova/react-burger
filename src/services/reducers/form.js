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
  LOGIN_FORM_SUBMIT_FAILED
} from "../actions/form";

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
  registrationRequest: true,
  registrationFailed: false,
  loginRequest: true,
  loginFailed: false,
  forgotPasswordRequest: true,
  forgotPasswordFailed: false,
  resetPasswordRequest: true,
  resetPasswordFailed: false,
  profileRequest: true,
  profileFailed: false,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.field]: action.value,
        },
      };
    }
    case REGISTER_FORM_SET_VALUE: {
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          [action.field]: action.value,
        },
      };
    }
    case FORGOT_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          [action.field]: action.value,
        },
      };
    }
    case RESET_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        resetPasswordForm: {
          ...state.resetPasswordForm,
          [action.field]: action.value,
        },
      };
    }
    case PROFILE_FORM_SET_VALUE: {
      return {
        ...state,
        profileForm: {
          ...state.profileForm,
          [action.field]: action.value,
        },
      };
    }
    case REGISTER_FORM_SUBMIT: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      }
    }
    case REGISTER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
        registerForm: {
          ...initialState.registerForm
        }
      }
    }
    case REGISTER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
      }
    }
    case LOGIN_FORM_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      }
    }
    case LOGIN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginForm: {
          ...initialState.loginForm
        },
        user: action.user,
      }
    }
    case LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    }
    default: {
      return state;
    }
  }
};
