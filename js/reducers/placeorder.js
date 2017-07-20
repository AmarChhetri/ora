// Homepage Reducer
import {
  PLACE_ORDER_SUCCEDDED,
  REQUESTING_PLACE_ORDER,
  PLACE_ORDER_FAILED,
  CLEAR_PLACEORDER,
} from '../actions/placeorder'

const initialState = {
  isFetching:false,
  order_id:null,
  error: false,
  errorMessage:null
}


function placeorder(state = initialState, action) {
  switch (action.type) {
    case CLEAR_PLACEORDER:
      return { ...initialState };
    case REQUESTING_PLACE_ORDER:
      return { ...initialState, isFetching: true};
    case PLACE_ORDER_SUCCEDDED:
      return { ...initialState , order_id:action.order_id};
    case PLACE_ORDER_FAILED:
      return { ...initialState , error: true, errorMessage:action.msg  }
    default:
      return state
  }
}


module.exports = {
  placeorder: placeorder,
  placeorderIS: initialState
};
