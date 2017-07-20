import {
  baseUrl
} from './types';

export const RESTAURANT_LIST_RECEIVED = 'RESTAURANT_LIST_RECEIVED';
export const RESTAURANT_LIST_REQUESTED_FAILED = 'RESTAURANT_LIST_REQUESTED_FAILED';
export const RESTAURANT_LIST_REQUESTED = 'RESTAURANT_LIST_REQUESTED';
export const CLEAR_CUISINE = 'CLEAR_CUISINE';

export function fetchRestaurant(cuisine_id) {
 return (dispatch,getState) => {
   const loc = getState().location.activeLocation;
   const lat = loc === null ? 26.143346 : loc.latlng.lat;
   const lon = loc === null ? 91.789795 : loc.latlng.lng;
   dispatch(requestRestaurantList())
   return fetch(baseUrl+ `/cuisines/${cuisine_id}?lat=${lat}&lon=${lon}`,
     {
       method: 'GET'
     })
     .then(response =>response.json())
     .then(json =>dispatch(receiveRestaurantList(json.data)))
     .catch(err =>console.log(err))
 }
}

export function requestRestaurantList() {
  return {
    type: RESTAURANT_LIST_REQUESTED,
  };
}

export function receiveRestaurantList(data) {
  return {
    type: RESTAURANT_LIST_RECEIVED,
    restaurants: data
  };
}

export function clearCuisine() {
  return {
    type: CLEAR_CUISINE,
  };
}
