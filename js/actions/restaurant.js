import {
  baseUrl
} from './types';

export const RESTAURANT_MENU_RECEIVED = 'RESTAURANT_MENU_RECEIVED';
export const RESTAURANT_MENU_REQUESTED_FAILED = 'RESTAURANT_MENU_REQUESTED_FAILED';
export const RESTAURANT_MENU_REQUESTED = 'RESTAURANT_MENU_REQUESTED';
export const CLEAR_MENU_REDUCERS = 'CLEAR_MENU_REDUCERS';

export function fetchMenu(id) {
 return dispatch => {
   dispatch(requestMenu())
   return fetch( baseUrl + `/menu/${id}`,
     {
       method: 'GET'
     })
     .then(response =>response.json())
     .then(json =>{
       dispatch(receiveMenu(json.data))
     })
     .catch(err =>console.log(err))
 }
}
export function requestMenu() {
  return {
    type: RESTAURANT_MENU_REQUESTED,
  };
}
export function requestFailed(error) {

  return {
    type: RESTAURANT_MENU_REQUESTED_FAILED,
    requestError: error
  };
}
export function receiveMenu(data) {

  return {
    type: RESTAURANT_MENU_RECEIVED,
    menu: data
  };
}

export function clearMenuReducers() {
  return {
    type: CLEAR_MENU_REDUCERS,
  };
}
