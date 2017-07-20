// Coupon Reducer
import {
  REQUESTING_COUPON,
  COUPON_FAILED,
  FOUND_COUPON
} from '../actions/cart'

couponIS = {
  isFetching:false,
  found:false,
  error: false,
}

function coupon(state = couponIS, action) {

  switch (action.type) {
    case REQUESTING_COUPON:
      return { ...state, ...couponIS, isFetching: true };
    case FOUND_COUPON:
      return { ...state, ...couponIS, found: true}
    case COUPON_FAILED:
      return { ...state, ...couponIS, error: true}
    default:
      return state
  }
}


module.exports = {
  coupon: coupon,
  couponIS: couponIS
};
