// Homepage Reducer
import {
  RESTAURANT_LIST_REQUESTED,
  RESTAURANT_LIST_REQUESTED_FAILED,
  RESTAURANT_LIST_RECEIVED,
  CLEAR_CUISINE
} from '../actions/cuisine'

const cuisineIS = {
  isFetching:false,
  isInit:true,
  restaurants: undefined,
};

function cuisine(state = cuisineIS, action) {
  switch (action.type) {
    case CLEAR_CUISINE:
      return { ...state, ...cuisineIS };
    case RESTAURANT_LIST_REQUESTED:
      return { ...state, isFetching: true, isInit:false, restaurants: undefined };
    // case RESTAURANT_LIST_REQUESTED_FAILED:
    //   return { ...state, isFetching: false, requestError: action.requestError }
    case RESTAURANT_LIST_RECEIVED:
      return { ...state , isFetching : false, isInit: false, restaurants: action.restaurants  }
    default:
      return state
  }
}


export default cuisine
