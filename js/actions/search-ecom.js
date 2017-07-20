
//
// Search app api
//
import {
  baseUrl
} from './types';

export const SEARCH_REQUEST_SHOP = 'SEARCH_REQUEST_SHOP';
export const NO_RESULTS_FOUND_SHOP = 'NO_RESULTS_FOUND_SHOP';
export const SEARCH_FOUND_SHOP = 'SEARCH_FOUND_SHOP';

export function requestSearch(){
  return {
    type: SEARCH_REQUEST_SHOP,
  };
}

export function searchFound(results){
  return {
    type: SEARCH_FOUND_SHOP,
    results: results,
  };
}

export function noResults(){
  return {
    type: NO_RESULTS_FOUND_SHOP,
  };
}

export function searchApp(searchText) {
  return (dispatch,getState) => {
    dispatch(requestSearch())
    return fetch(baseUrl + `/ecommerce_search/${searchText}`,
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
