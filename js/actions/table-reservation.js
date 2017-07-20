//
// List of all restro
//
import {
  baseUrl
} from './types';

export const REQUEST_LIST_TABLE_RESERVATION = 'REQUEST_LIST_TABLE_RESERVATION'

function requestAllRestroList() {
  return {
    type: REQUEST_LIST_TABLE_RESERVATION,
  }
}

export const SUCCESS_LIST_TABLE_RESERVATION = 'SUCCESS_LIST_TABLE_RESERVATION'

function receiveAllRestroList(restro) {
  return {
    type: SUCCESS_LIST_TABLE_RESERVATION,
    restro: restro.data,
  }
}

export function fetchListOfTableReservation() {

  return (dispatch,getState) => {
    dispatch(requestAllRestroList())
    return fetch(baseUrl + `/events`,
      {
        method: 'GET'
      })
      .then(response =>response.json())
      .then(json =>dispatch(receiveAllRestroList(json)))
      .catch(err =>  console.log(err) )
  }
}
