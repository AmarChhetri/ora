//
// List of restro
//
import {
  baseUrl
} from './types';

export const REQUEST_RESTAURANT = 'REQUEST_RESTAURANT'

function requestRestaurant() {
  return {
    type: REQUEST_RESTAURANT,
  }
}

export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT'

function receiveRestaurant(json) {
  return {
    type: RECEIVE_RESTAURANT,
    restaurants: json.data,
  }
}
export function fetchRestaurant() {
 return (dispatch,getState) => {
   const loc = getState().location.activeLocation;
   const lat = loc === null ? 26.143346 : loc.latlng.lat;
   const lon = loc === null ? 91.789795 : loc.latlng.lng;
   dispatch(requestRestaurant())
   return fetch(baseUrl + `/new_and_hot?lat=${lat}&lon=${lon}`,
     {
       method: 'GET'
     })
     .then(response =>response.json())
     .then(json =>dispatch(receiveRestaurant(json)))
     .catch(err =>  console.log(err) )
 }
}

//
// Cuisines
//
export const REQUEST_CUISINES = 'REQUEST_CUISINES'

function requestCuisines(latlng) {
  return {
    type: REQUEST_CUISINES,
    latlng
  }
}

export const RECEIVE_CUISINES = 'RECEIVE_CUISINES'

function receiveCuisines(json) {
  return {
    type: RECEIVE_CUISINES,
    cuisines: json.data,
  }
}

export function fetchCuisines() {
  return dispatch => {
    dispatch(requestCuisines())
    return fetch(baseUrl + `/cuisines`,
      {
        method: 'GET'
      })
      .then(response =>response.json())
      .then(json =>dispatch(receiveCuisines(json)))
      .catch(err =>  console.log(err) )
  }

}


//
// Best in town
//
export const REQUEST_BEST_IN_TOWN = 'REQUEST_BEST_IN_TOWN'

function requestBestInTown() {
  return {
    type: REQUEST_BEST_IN_TOWN,
  }
}

export const RECEIVE_BEST_IN_TOWN = 'RECEIVE_BEST_IN_TOWN'

function receiveBestInTown(json) {
  return {
    type: RECEIVE_BEST_IN_TOWN,
    bestintown: json.data,
  }
}

export function fetchBestInTown() {
  return dispatch => {
    dispatch(requestBestInTown())
    return fetch(baseUrl + `/best_in_town`,
      {
        method: 'GET'
      })
      .then(response =>response.json())
      .then(json =>dispatch(receiveBestInTown(json)))
      .catch(err =>  console.log(err) )
  }
}

//
// Banners
//
export const REQUEST_BANNERS = 'REQUEST_BANNERS'

function requestBanners() {
  return {
    type: REQUEST_BANNERS,
  }
}

export const SUCCESS_BANNERS = 'SUCCESS_BANNERS'

function receiveBanners(banners) {
  return {
    type: SUCCESS_BANNERS,
    banners: banners.data,
  }
}

export function fectchBanners() {
  return dispatch => {
    dispatch(requestBanners())
    return fetch(baseUrl + `/banner_fo`,
      {
        method: 'GET'
      })
      .then(response =>response.json())
      .then(json =>dispatch(receiveBanners(json)))
      .catch(err =>  console.log(err) )
  }
}
