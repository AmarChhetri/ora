import {
  baseUrl
} from './types';

export const LIST_RECEIVED = 'LIST_RECEIVED';
export const LIST_REQUESTED = 'LIST_REQUESTED';
export const CLEAR_BEST_IN_TOWN = 'CLEAR_BEST_IN_TOWN';

export function requestBestInTownList(id) {
 return (dispatch,getState) => {
   const loc = getState().location.activeLocation;
   const lat = loc === null ? 26.143346 : loc.latlng.lat;
   const lon = loc === null ? 91.789795 : loc.latlng.lng;
   dispatch(requestList())
   return fetch(baseUrl+ `/best_in_town/${id}?lat=${lat}&lon=${lon}`,
     {
       method: 'GET'
     })
     .then(response =>response.json())
     .then(json =>dispatch(receiveList(json.data)))
     .catch(err =>console.log(err))
 }
}
export function requestList() {
  return {
    type: LIST_REQUESTED,
  };
}

export function clearBestInTown() {
  return {
    type: CLEAR_BEST_IN_TOWN,
  };
}


export function receiveList(data) {
  return {
    type: LIST_RECEIVED,
    arrayOfBestRestro: data
  };
}
