// Homepage Reducer
import {
  RESTAURANT_MENU_REQUESTED,
  RESTAURANT_MENU_REQUESTED_FAILED,
  RESTAURANT_MENU_RECEIVED,
  CLEAR_MENU_REDUCERS
} from '../actions/restaurant'

const restaurantIS = {
  isFetching:false,
  isInit:true,
  // requestError: null,
  menu: {},
};

function restaurant(state = restaurantIS, action) {
  switch (action.type) {
    case CLEAR_MENU_REDUCERS:
      return { ...state, ...restaurantIS };
    case RESTAURANT_MENU_REQUESTED:
      return { ...state, isFetching: true , isInit: false };
    case RESTAURANT_MENU_RECEIVED:
      return { ...state , isFetching : false, isInit:false, menu: action.menu  }
    default:
      return state
  }
}


export default restaurant
