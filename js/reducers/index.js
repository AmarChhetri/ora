//
// IS is for initialState
//
import { combineReducers } from 'redux'
import homepage from './homepage';
import { sidebar, sidebarIS } from './sidebar';
import restaurant from './restaurant';
import cuisine from './cuisine';
import tab  from './tab';
import location from './location';
import { login, loginIS } from './login';
import orders from './orders'
import ecommerce from './ecommerce'
import { cart, cartIS } from './cart'
import { shoppingBag, shoppingBagIS } from './shopping-bag'
import bestintown from './bestintown'
import banners from './banners'
import listofrestro from './listofrestro'
import tableReservation from './table-reservation'
import { user, userIS } from './user'
import search from './search'
import searchEcom from './search-ecom'
import { coupon, couponIS } from './coupon'
import notifications from './notifications'
import { placeorder, placeorderIS } from './placeorder'
import confirmorder from './confirmorder'
import appactivestate from './appactivestate'
import isConnected from './netInfoReducer'



const appReducer =  combineReducers({
  homepage,
  sidebar,
  restaurant,
  tab,
  location,
  login,
  orders,
  cuisine,
  ecommerce,
  cart,
  shoppingBag,
  bestintown,
  banners,
  listofrestro,
  notifications,
  user,
  search,
  coupon,
  placeorder,
  confirmorder,
  appactivestate,
  tableReservation,
  searchEcom,
  isConnected
});

//
// Root reducer, filter logout, and initialiazes states
//
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return{
      ...state,
      login : loginIS,
      user : userIS,
      sidebar: sidebarIS,
      cart : cartIS,
      shoppingBag: shoppingBagIS,
    }
  }
  if (action.type === 'CLEAR_PLACEORDER_COUPON') {
    return{
      ...state,
      placeorder:placeorderIS,
      coupon: couponIS
    }
  }
  return appReducer(state, action)
}

module.exports = {
  reducer: rootReducer,
};
