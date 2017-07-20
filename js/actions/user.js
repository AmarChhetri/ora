
import {baseUrl, resetResfreshToken } from './types';

//
// Update user details
//
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export function updateRequest(){
  return {
    type: USER_UPDATE_REQUEST,
  };
}

export function updateSuccess(userObject){
  return {
    type: USER_UPDATE_SUCCESS,
    user: userObject
  };
}

export function updateFailed(){
  return {
    type: USER_UPDATE_FAILED,
  };
}

export function updateUserDetails(username, email) {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const url = `${baseUrl}/user`
    dispatch(updateRequest())
    return fetch(url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'username':username,
          'email': email
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(updateSuccess(data.user))
             }
             else if( data.status === 0) {
               dispatch(updateFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}


//
// Fetch user saved_address
//
export const USER_ADDRESS_REQUEST = 'USER_ADDRESS_REQUEST';
export const USER_ADDRESS_FETCH_SUCCESS = 'USER_ADDRESS_FETCH_SUCCESS';
export const NO_ADDRESS_FOUND = 'NO_ADDRESS_FOUND';

export function userAddressFetchRequest(){
  return {
    type: USER_ADDRESS_REQUEST,
  };
}

export function userAddressFetchSuccess(addressArray){

  return {
    type: USER_ADDRESS_FETCH_SUCCESS,
    address: addressArray
  };
}

export function noaddressFound(){
  return {
    type: NO_ADDRESS_FOUND,
  };
}


export function fetchUserSavedAddresses(username, email) {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const url = `${baseUrl}/saveaddress`
    dispatch(userAddressFetchRequest())
    return fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response =>{
          response.json()
           .then((data) => {

             if ( data.status === 1) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(userAddressFetchSuccess(data.saved_address))
             }
             else if( data.status === 0) {
               dispatch(noaddressFound())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}

//
// Update user saved_address
//
export const USER_ADDRESS_UPDATE_REQUEST = 'USER_ADDRESS_UPDATE_REQUEST';
export const USER_ADDRESS_UPDATE_SUCCESS = 'USER_ADDRESS_UPDATE_SUCCESS';
export const USER_ADDRESS_UPDATE_FAILED = 'USER_ADDRESS_UPDATE_FAILED';

export function updateUserAddressRequest(){
  return {
    type: USER_ADDRESS_UPDATE_REQUEST,
  };
}

export function updateUserAddressSuccess(addressArray){
  return {
    type: USER_ADDRESS_UPDATE_SUCCESS,
    address: addressArray
  };
}

export function updateUserAddressFailed(){
  return {
    type: USER_ADDRESS_UPDATE_FAILED,
  };
}

export function updateUserAddress(addressObject, address_line_1, address_line_2, city, state, zip) {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const url = `${baseUrl}/savedaddress`
    dispatch(updateUserAddressRequest())
    return fetch(url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "saved_address_id" : addressObject.id,
        	"address_line_1" : address_line_1,
        	"address_line_2" : address_line_2,
        	"city" : city,
        	"state" : state,
        	"zip" : zip,
        	"address_type" : addressObject.address_type
        })
      }).then(response =>{
          response.json()
           .then((data) => {
             if ( data.status === 1) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(updateUserAddressSuccess(data.address))
             }
             else if( data.status === 0) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(updateUserAddressFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}



export const USER_ADDRESS_DELETE_SUCCESS = 'USER_ADDRESS_DELETE_SUCCESS';
export const USER_ADDRESS_DELETE_FAILED = 'USER_ADDRESS_DELETE_FAILED';

export function deleteAddressSuccess(id){
  return {
    type: USER_ADDRESS_DELETE_SUCCESS,
    id: id
  };
}

export function deleteAddressFailed(){
  return {
    type: USER_ADDRESS_DELETE_FAILED,
  };
}

export function deleteAddress(id) {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const url = `${baseUrl}/savedaddress/${id}`
    return fetch(url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

      }).then(response =>{
          response.json()
           .then((data) => {

             if ( data.status === 1) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(deleteAddressSuccess(id))
             }
             else if( data.status === 0) {
               if (data.token !== "") {
                 dispatch(resetResfreshToken(data.token));
               }
               dispatch(deleteAddressFailed())
             }
           });
      })
      .catch(err =>  console.log(err) )
  }

}
