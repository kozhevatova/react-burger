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
  UPDATE_USER_INFO_FAILED
} from "../actions/user";

const initialState = {
  user: {
  },
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
  registrationSuccess: false,
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  userInfoRequest: false,
  userInfoFailed: false,
  updateUserInfoRequest: false,
  updateUserInfoRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  logoutSuccess: false,
};

export const userInfoReducer = (state = initialState, action) => {
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
        registrationSuccess: false,
      }
    }
    case REGISTER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
        registrationSuccess: true,
        registerForm: {
          ...initialState.registerForm
        },
        user: action.data.user,
      }
    }
    case REGISTER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
        registrationSuccess: false,
      }
    }
    case LOGIN_FORM_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        loginSuccess: false,
      }
    }
    case LOGIN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
        loginForm: {
          ...initialState.loginForm
        },
        user: action.data.user,
      }
    }
    case LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: false,
      }
    }
    case FORGOT_PASSWORD_FORM_SUBMIT: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      }
    }
    case FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        forgotPasswordForm: {
          ...initialState.forgotPasswordForm
        },
      }
    }
    case FORGOT_PASSWORD_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_FORM_SUBMIT: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordForm: {
          ...initialState.resetPasswordForm
        },
      }
    }
    case RESET_PASSWORD_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      }
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoFailed: false,
        userInfoRequest: true,
      }
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoFailed: false,
        userInfoRequest: false,
        user: action.user,
        profileForm: {
          ...state.profileForm,
          name: action.user.name,
          email: action.user.email
        }
      }
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
      }
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        updateUserInfoFailed: false,
        updateUserInfoRequest: true,
      }
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        updateUserInfoFailed: false,
        updateUserInfoRequest: false,
        user: action.user,
        profileForm: {
          ...state.profileForm,
          name: action.user.name,
          email: action.user.email,
        }
      }
    }
    case UPDATE_USER_INFO_FAILED: {
      return {
        ...state,
        updateUserInfoFailed: true,
        updateUserInfoRequest: false,
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
        logoutSuccess: false,
      }
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        user: {},
        logoutRequest: false,
        logoutRequestFailed: false,
        logoutSuccess: true,
      }
    }
    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
        logoutSuccess: false,
      }
    }
    default: {
      return state;
    }
  }
};
