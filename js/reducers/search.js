// Homepage Reducer
import {
  SEARCH_REQUEST,
  NO_RESULTS_FOUND,
  SEARCH_FOUND
} from '../actions/search'


function search(state = {
  isInit:true,
  requesting: false,
  results: undefined,
}, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, isInit: false, requesting: true , results: undefined };
    case NO_RESULTS_FOUND:
      return { ...state, requesting: false, isInit: false , results: [] };
    case SEARCH_FOUND:
      return { ...state, requesting: false, isInit: false, results: action.results }
    default:
      return state
  }
}


export default search
