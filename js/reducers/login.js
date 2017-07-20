// Location Reducer
import {
  CLEAR_REDUCER_LOGIN,
  NUM_AVAILABLE,
  NUM_NOT_AVAILABLE,
  REQUEST_AVAILABILITY,
  LOGIN_FAILED,
  REQUEST_LOGIN,
  LOGOUT_USER,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  OTP_SUBMIT_FAILED,
  OTP_SUBMIT_REQUEST,
  FORGOT_PASS_FAILED,
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../actions/login'


const forgotPasswordIS={
  trying:false,
  success:false,
  error:false,
}

const resetPasswordIS={
  trying:false,
  success:false,
  error:false,
}

const initialState = {
  phone: null,
  requestingAvailabilty: false,
  notRegistered: false,
  requestingLogin: false,
  invalidCredentials: false,
  requestingOtpValidation:false,
  otpFailed: false,
  register: {
    init:true,
    trying:false,
    otp:false,
  },
  forgotPassword:forgotPasswordIS,
  resetPassword:resetPasswordIS,
};

function login(state = initialState, action) {
  switch (action.type) {
    case CLEAR_REDUCER_LOGIN:
      return { ...state, ...initialState }
    case REQUEST_AVAILABILITY:
      return { ...state , requestingAvailabilty: true  }
    case NUM_AVAILABLE:
      return { ...state , phone: action.phone,requestingAvailabilty: false , notRegistered: false}
    case NUM_NOT_AVAILABLE:
      return { ...state, phone: action.phone, notRegistered: true,requestingAvailabilty: false }
    case REQUEST_LOGIN:
      return { ...state , requestingLogin: true, invalidCredentials: false  }
    case LOGIN_FAILED:
      return { ...state, requestingLogin: false, invalidCredentials: true }
    case FORGOT_PASS_REQUEST:
      return { ...state,  forgotPassword:{...forgotPasswordIS, trying:true}}
    case FORGOT_PASS_SUCCESS:
      return { ...state,  forgotPassword:{...forgotPasswordIS, success:true}}
    case FORGOT_PASS_FAILED:
      return { ...state,  forgotPassword:{...forgotPasswordIS, error:true}}
    case RESET_PASSWORD_REQUEST:
      return { ...state,  resetPassword:{...resetPasswordIS, trying:true}}
    case RESET_PASSWORD_SUCCESS:
      return { ...state,  resetPassword:{...resetPasswordIS, success:true}}
    case RESET_PASSWORD_FAILED:
      return { ...state,  resetPassword:{...resetPasswordIS, error:true}}
    case OTP_SUBMIT_REQUEST:
      return { ...state , requestingOtpValidation: true , otpFailed: false }
    case OTP_SUBMIT_FAILED:
      return { ...state, requestingOtpValidation: false, otpFailed: true }
    case REGISTER_REQUEST:
      return { ...state, register: {
          init: true,
          otp: false,
          trying: true
        }
      }
    case REGISTER_SUCCESS:
      return { ...state, register: {
          init: false,
          otp:true,
          trying:false
        }
      }
    case REGISTER_FAILED:
      return { ...state, register: {
          init: false,
          otp:false,
          trying:false
        }
      }
    default:
      return state
  }
}


module.exports = {
  login: login,
  loginIS: initialState
};
