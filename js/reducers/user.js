// Homepage Reducer
import {
  OTP_SUBMIT_SUCCESS,
  LOGIN_SUCCESS
} from '../actions/login'

import { RESET_REFRESH_TOKEN } from '../actions/types';
import {
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_FETCH_SUCCESS,
  NO_ADDRESS_FOUND,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_ADDRESS_UPDATE_REQUEST,
  USER_ADDRESS_UPDATE_SUCCESS,
  USER_ADDRESS_UPDATE_FAILED,
  USER_ADDRESS_DELETE_SUCCESS,
  USER_ADDRESS_DELETE_FAILED
} from '../actions/user';
const userUpdateInitialState = {
  userDetailsUpdating: false,
  userDetailsUpdated:false,
  userDetailsUpdateerror:false,
}
const requestAddressIS = {
  requesting:false,
  found:false,
}
const userAddressIS = {
  userAddressUpdating: false,
  userAddressUpdated:false,
  userAddressUpdateerror:false,
}
const initialState = {
  token: undefined,
  user: undefined,
  requestAddress: requestAddressIS,
  userUpdateObj: userUpdateInitialState,
  userAddressObj: userAddressIS,
  saved_address: undefined,
}

function user(state = initialState, action) {
  switch (action.type) {
    case OTP_SUBMIT_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, user: action.user, token: action.token, saved_address: action.saved_address };
    case RESET_REFRESH_TOKEN:
      return { ...state, token: action.token };
    case USER_ADDRESS_REQUEST:
      return { ...state, requestAddress:{...requestAddressIS,requesting:true} };
    case USER_ADDRESS_FETCH_SUCCESS:
      return { ...state, requestAddress:{...requestAddressIS,found:true}, saved_address: action.address };
    case NO_ADDRESS_FOUND:
      return { ...state, requestAddress:{...requestAddressIS}, saved_address: undefined };
    case USER_UPDATE_REQUEST:
      return { ...state, userUpdateObj:{...userUpdateInitialState,userDetailsUpdating:true} };
    case USER_UPDATE_SUCCESS:
      return { ...state, userUpdateObj:{...userUpdateInitialState,userDetailsUpdated:true}, user: action.user };
    case USER_UPDATE_FAILED:
      return { ...state, userUpdateObj:{...userUpdateInitialState,userDetailsUpdateerror:true} };
    case USER_ADDRESS_UPDATE_REQUEST:
      return { ...state, userAddressObj:{...userAddressIS,userAddressUpdating:true} };
    case USER_ADDRESS_UPDATE_SUCCESS:
      return { ...state, userAddressObj:{...userAddressIS,userAddressUpdated:true}, saved_address: action.address };
    case USER_ADDRESS_UPDATE_FAILED:
      return { ...state, userAddressObj:{...userAddressIS,userAddressUpdateerror:true} };
    case USER_ADDRESS_DELETE_SUCCESS:
     const dataObj =  state.saved_address.filter( (item) => item.id != action.id);
      return { ...state, saved_address: dataObj}
    default:
      return state
  }
}


module.exports = {
  user: user,
  userIS: initialState
};
