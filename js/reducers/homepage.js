// Homepage Reducer
import {
  REQUEST_RESTAURANT,
  RECEIVE_RESTAURANT,
  REQUEST_CUISINES,
  RECEIVE_CUISINES,
  REQUEST_BANNERS,
  SUCCESS_BANNERS,
  REQUEST_BEST_IN_TOWN,
  RECEIVE_BEST_IN_TOWN
} from '../actions/homepage'

function homepage(state = {
  restaurant:{
    isFetching:true,
    restaurants: [],
  },
  cuisine:{
    isFetching:true,
    cuisines: [],
  },
  bestintown:{
    isFetching:true,
    bestintownArray: [],
  },
  banners:{
    isFetching:true,
    bannersArray: [],
  }
}, action) {
  switch (action.type) {
    case REQUEST_RESTAURANT:
      return { ...state, restaurant:{ isFetching: true , restaurants: []} };
    case RECEIVE_RESTAURANT:
      return { ...state , restaurant: { isFetching : false, restaurants: action.restaurants } }
    case REQUEST_CUISINES:
      return { ...state, cuisines:{ isFetching: true , cuisines: []} };
    case RECEIVE_CUISINES:
      return { ...state , cuisine: { isFetching : false, cuisines: action.cuisines } }
    case REQUEST_BANNERS:
      return { ...state, banners:{ isFetching: true , bannersArray: []} };
    case SUCCESS_BANNERS:
      return { ...state , banners: { isFetching : false, bannersArray: action.banners } }
    case REQUEST_BEST_IN_TOWN:
      return { ...state, bestintown:{ isFetching: true , bestintownArray: []} };
    case RECEIVE_BEST_IN_TOWN:
      return { ...state , bestintown: { isFetching : false, bestintownArray: action.bestintown } }
    default:
      return state
  }
}


export default homepage
