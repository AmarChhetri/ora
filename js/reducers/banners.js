// Homepage Reducer
import {
  REQUEST_BANNERS,
  SUCCESS_BANNERS,
} from '../actions/homepage'

function banners(state = {
  isFetching:true,
  banners: [],
}, action) {
  switch (action.type) {
    case REQUEST_BANNERS:
      return { ...state, isFetching: true , banners: [] };
    case 'SUCCESS_BANNERS':
      return { ...state ,isFetching : false, banners: action.banners  };
    default:
      return state
  }
}


export default banners
