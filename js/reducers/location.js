// Location Reducer
import {
  GET_ALL_LOCATION,
  GET_ACTIVE_LOCATION,
  SET_ACTIVE_LOCATION,
} from '../actions/location'


function location(state = {
  // locations:[],
  activeLocation:null,
}, action) {
  switch (action.type) {
    case GET_ACTIVE_LOCATION:
      return { ...state };
    case SET_ACTIVE_LOCATION:
      return { ...state , activeLocation: action.location }
    default:
      return state
  }
}


export default location
