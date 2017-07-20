// Location Reducer
import {
  SET_APP_ACTIVE
} from '../actions/appactivestate'


function location(state = {
  isActive:false
}, action) {
  switch (action.type) {
    case SET_APP_ACTIVE:
      return { ...state, isActive:true };
    default:
      return state
  }
}


export default location
