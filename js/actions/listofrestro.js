//
// List of all restro
//
import {
  baseUrl
} from './types';

export const REQUEST_LIST = 'REQUEST_LIST'

function requestAllRestroList() {
  return {
    type: REQUEST_LIST,
  }
}

export const SUCCESS_LIST = 'SUCCESS_LIST'

function receiveAllRestroList(restro) {
  return {
    type: SUCCESS_LIST,
    restro: restro.data,
  }
}

export function fetchAllRestroList() {

  return (dispatch,getState) => {
    const loc = getState().location.activeLocation;
    const lat = loc === null ? 26.143346 : loc.latlng.lat;
    const lon = loc === null ? 91.789795 : loc.latlng.lng;
    dispatch(requestAllRestroList())
    return fetch(baseUrl + `/restaurants?lat=${lat}&lon=${lon}`,
      {
        method: 'GET'
      })
      .then(response =>response.json())
      .then(json =>dispatch(receiveAllRestroList(json)))
      .catch(err =>  console.log(err) )
  }
}
