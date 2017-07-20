
//
// Search app api
//
import {
  baseUrl
} from './types';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const NO_RESULTS_FOUND = 'NO_RESULTS_FOUND';
export const SEARCH_FOUND = 'SEARCH_FOUND';

export function requestSearch(){
  return {
    type: SEARCH_REQUEST,
  };
}

export function searchFound(results){
  return {
    type: SEARCH_FOUND,
    results: results,
  };
}

export function noResults(){
  return {
    type: NO_RESULTS_FOUND,
  };
}

export function searchApp(searchText) {
  return (dispatch,getState) => {
    const loc = getState().location.activeLocation;
    const lat = loc === null ? 26.143346 : loc.latlng.lat;
    const lon = loc === null ? 91.789795 : loc.latlng.lng;
    dispatch(requestSearch())

    return fetch(baseUrl + `/search/${searchText}/${lat}/${lon}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response =>{
        if (response.ok) {
          return response.json()
             .then((data) => {

               if ( data.status === 1) {
                dispatch(searchFound(data.data))
               }
               else if( data.status === 0) {
                 dispatch(noResults())
               }
             });
        }
      })
      .catch(err =>  console.log(err) )
  }

}
