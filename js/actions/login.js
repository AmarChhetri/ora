//
// clear redux for login related
//
import {
  baseUrl
} from './types';
export const CLEAR_REDUCER_LOGIN = 'CLEAR_REDUCER_LOGIN';

export function clearLoginRedux(){
  return {
    type: CLEAR_REDUCER_LOGIN,
  };
}
//
// Check number availability
//
export const NUM_AVAILABLE = 'NUM_AVAILABLE';
export const NUM_NOT_AVAILABLE = 'NUM_NOT_AVAILABLE';
export const REQUEST_AVAILABILITY = 'REQUEST_AVAILABILITY';

export function requestAvailability(){
  return {
    type: REQUEST_AVAILABILITY,
  };
}

export function numAvailable(number){
  return {
    type: NUM_AVAILABLE,
    phone: number,
  };
}

export function numNotAvailable(number){
  return {
    type: NUM_NOT_AVAILABLE,
    phone: number,
  };
}

export function checkAvailability(phoneNumber) {
  const number = `91${phoneNumber}`;
  return dispatch => {
    dispatch(requestAvailability())
    return fetch(baseUrl + `/user/${number}`,
      {
        method: 'GET'
      })
      .then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               dispatch(numAvailable(number))
             }
             else if( data.status === 0) {
               dispatch(numNotAvailable(number))
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}


//
// Try Login user.
//

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export function requestLogin(){
  return {
    type: REQUEST_LOGIN,
  };
}

export function loginSuccess(token,user, saved_address){
  return {
    type: LOGIN_SUCCESS,
    token: token,
    user:user,
    saved_address:saved_address
  };
}

export function loginFailed(){
  return {
    type: LOGIN_FAILED,
  };
}

export function loginUser(pass) {
  return (dispatch, getState) => {
    dispatch(requestLogin())
    const state = getState();
    const phone = state.login.phone;
    return fetch(baseUrl + `/authenticate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phn': phone,
          'password': pass
        })
      }).then(response =>{
        if (response.ok) {
          return response.json()
             .then((data) => {
               if ( data.status === 1) {
                dispatch(loginSuccess(data.token.token, data.user, data.saved_address))
               }
               else if( data.status === 0) {
                 dispatch(loginFailed())
               }
             });
        }
      })
      .catch(err =>  console.log(err) )
  }

}

//
// Register user
//
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function registerRequest(){
  return {
    type: REGISTER_REQUEST,
  };
}

export function registerSuccess(){
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerFailed(){
  return {
    type: REGISTER_FAILED,
  };
}

export function registerUser(name, email) {
  return (dispatch, getState) => {
    const state = getState();
    const phone = state.login.phone;
    dispatch(registerRequest())
    return fetch(baseUrl + `/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phn': phone,
          'username':name,
          'email': email
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               dispatch(registerSuccess())
             }
             else if( data.status === 0) {
               dispatch(registerFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}


//
// Submit Otp
//
export const OTP_SUBMIT_REQUEST = 'OTP_SUBMIT_REQUEST';
export const OTP_SUBMIT_SUCCESS = 'OTP_SUBMIT_SUCCESS';
export const OTP_SUBMIT_FAILED = 'OTP_SUBMIT_FAILED';

export function otpSubmitRequest(){
  return {
    type: OTP_SUBMIT_REQUEST,
  };
}

export function otpSubmitSuccess(token,user, saved_address){
  return {
    type: OTP_SUBMIT_SUCCESS,
    token: token,
    user:user,
    saved_address:saved_address
  };
}

export function otpSubmitFailed(){
  return {
    type: OTP_SUBMIT_FAILED,
  };
}
export function submitOtpAndPassword(otp, pass) {
  return (dispatch, getState) => {
    const state = getState();
    const phone = state.login.phone;
    dispatch(otpSubmitRequest())
    return fetch(baseUrl + `/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phn': phone,
          'otp':otp,
          'password': pass
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               dispatch(otpSubmitSuccess(data.token.token, data.user, data.saved_address))
             }
             else if( data.status === 0) {
               dispatch(otpSubmitFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}
//
// Logout user
//
export const USER_LOGOUT = 'USER_LOGOUT';
export function logout(){
  return {
    type: USER_LOGOUT,
  };
}


//
// Forgot password
//

export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAILED = 'FORGOT_PASS_FAILED';

export function forPasswordRequest(){
  return {
    type: FORGOT_PASS_REQUEST,
  };
}

export function forPasswordSuccess(){
  return {
    type: FORGOT_PASS_SUCCESS,
  };
}

export function forPasswordFailed(){
  return {
    type: FORGOT_PASS_FAILED,
  };
}

export function forgotPasswordAsync() {
  return (dispatch, getState) => {
    const state = getState();
    const phone = state.login.phone;
    dispatch(forPasswordRequest())
    return fetch(baseUrl + `/forgotpassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phn': phone,
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               dispatch(forPasswordSuccess())
             }
             else if( data.status === 0) {
               dispatch(forPasswordFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}

//
// Reset  password
//
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export function resetPasswordRequest(){
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}

export function resetPasswordSuccess(token,user, saved_address){
  return {
    type: RESET_PASSWORD_SUCCESS,
    token: token,
    user:user,
    saved_address:saved_address
  };
}

export function resetPasswordFailed(){
  return {
    type: RESET_PASSWORD_FAILED,
  };
}
export function resetPassword(otp, pass) {
  return (dispatch, getState) => {
    const state = getState();
    const phone = state.login.phone;
    dispatch(resetPasswordRequest())
    return fetch(baseUrl + `/resetpassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phn': phone,
          'otp':otp,
          'password': pass
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               dispatch(otpSubmitSuccess(data.token.token, data.user, data.saved_address))
             }
             else if( data.status === 0) {
               dispatch(resetPasswordFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}
