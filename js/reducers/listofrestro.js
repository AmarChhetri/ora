// Homepage Reducer
import {
  REQUEST_LIST,
  SUCCESS_LIST
} from '../actions/cuisine'


function restaurant(state = {
  isFetching:false,
  isInit:true,
  restaurants: undefined,
}, action) {

  switch (action.type) {
    case REQUEST_LIST:
      return { ...state, isFetching: true, isInit:false, restaurants: undefined };
    case 'SUCCESS_LIST':
      return { ...state , isFetching : false, isInit: false, restaurants: action.restro  }
    default:
      return state
  }
}


export default restaurant
