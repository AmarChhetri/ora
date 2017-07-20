// Homepage Reducer
import {
  SEARCH_REQUEST_SHOP,
  NO_RESULTS_FOUND_SHOP,
  SEARCH_FOUND_SHOP
} from '../actions/search-ecom'


function search(state = {
  isInit:true,
  requesting: false,
  noResult:false,
  results: undefined,
}, action) {
  switch (action.type) {
    case SEARCH_REQUEST_SHOP:
      return { ...state, isInit: false, requesting: true , results: undefined, noResults: false };
    case NO_RESULTS_FOUND_SHOP:
      return { ...state, requesting: false, isInit: false , results: undefined, noResults: true };
    case SEARCH_FOUND_SHOP:
      return { ...state, requesting: false, isInit: false, results: action.results, noResults: false }
    default:
      return state
  }
}


export default search
