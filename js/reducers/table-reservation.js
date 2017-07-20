// Homepage Reducer
import {
  REQUEST_LIST_TABLE_RESERVATION,
  SUCCESS_LIST_TABLE_RESERVATION
} from '../actions/table-reservation'


function table(state = {
  isFetching:false,
  restaurants: undefined,
}, action) {

  switch (action.type) {
    case REQUEST_LIST_TABLE_RESERVATION:
      return { ...state, isFetching: true, restaurants: undefined };
    case SUCCESS_LIST_TABLE_RESERVATION:
      return { ...state , isFetching : false, restaurants: action.restro  }
    default:
      return state
  }
}


export default table
