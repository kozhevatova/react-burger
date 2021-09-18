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
  PROFILE_FORM_SUBMIT,
  PROFILE_FORM_SUBMIT_SUCCESS,
  PROFILE_FORM_SUBMIT_FAILED
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
  registrationRequest: false,
  registrationFailed: false,
  loginRequest: false,
  loginFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  profileRequest: false,
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
        user: action.data.user,
      }
    }
    case LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
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
    case PROFILE_FORM_SUBMIT: {
      return {
        ...state,
        profileRequest: true,
        profileFailed: false,
      }
    }
    case PROFILE_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        profileRequest: true,
        profileFailed: false,
        user: action.data.user,
      }
    }
    case PROFILE_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        profileRequest: false,
        profileFailed: false,
      }
    }
    default: {
      return state;
    }
  }
};
