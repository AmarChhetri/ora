import {
  NOW_ORDERED_LIST,
  PAST_ORDERED_LIST,
  FAVOURITE_ORDERED_LIST,
  FAVOURITE_ORDERED_DETAIL,
  FAVOURITE_ORDERED_DETAIL_DELETE,
  FAVOURITE_ORDERED_QUANTITY_CHANGE,
  FAVOURITE_ALTERED,
  ITEM_RETURNED,
  SET_ACTIVE_ORDER_TAB
} from '../actions/types';

const INITIAL_STATE = {
  activeOrderTab:0,
  nowOrderedObj: {
      isLoading: true,
      nowOrderedData: {}
    },
  pastOrderedObj: {
    isLoading: true,
    pastOrderedData: {}
  },
  favouriteOrderedObj: {
    isLoading: true,
    favouriteOrderedData: {}
  },

  favouriteOrderedDetail: {
    totalPrice: 0,
    favouriteOrderedDetailJSON: [],
  },
  favoriteAlteredResponseObj: {
    isLoading: true,
    favoriteAlteredResponseData: {}
  }
};

export default (state = INITIAL_STATE, action) => {
  let currentJSON = state.favouriteOrderedDetail.favouriteOrderedDetailJSON;
  switch (action.type) {
    case SET_ACTIVE_ORDER_TAB:
      return { ...state, activeOrderTab: action.tab_id};
    case NOW_ORDERED_LIST:
      return { ...state,  nowOrderedObj: { isLoading: false, nowOrderedData: action.payload } };

    case PAST_ORDERED_LIST:
      return { ...state, pastOrderedObj: { isLoading: false, pastOrderedData: action.payload } };

    case FAVOURITE_ORDERED_LIST:
      return { ...state, favouriteOrderedObj: { isLoading: false, favouriteOrderedData: action.payload } };

    case FAVOURITE_ALTERED:
      return { ...state, pastOrderedObj: { isLoading: false, pastOrderedData: action.payload } };
    
    case ITEM_RETURNED:
      return { ...state, pastOrderedObj: { isLoading: false, pastOrderedData: action.payload } };

    case FAVOURITE_ORDERED_DETAIL:
      let totalPrice = getFavOrderedTotalPrice(action.payload);
      return { ...state, favouriteOrderedDetail: {totalPrice: totalPrice, favouriteOrderedDetailJSON: action.payload } };

    case FAVOURITE_ORDERED_DETAIL_DELETE:
       let favouriteOrderedDetailJSON = deleteFavouriteOrderedDetail(action.payload,currentJSON);
       totalPrice = getFavOrderedTotalPrice(favouriteOrderedDetailJSON);
       return { ...state, favouriteOrderedDetail: {totalPrice: totalPrice, favouriteOrderedDetailJSON: favouriteOrderedDetailJSON } };

    case FAVOURITE_ORDERED_QUANTITY_CHANGE:
        let changedFavOrderArray = setFavOrderedQuantity(action.payload.id, action.payload.quantity, currentJSON);
        totalPrice = getFavOrderedTotalPrice(changedFavOrderArray);
        return { ...state, favouriteOrderedDetail: {totalPrice: totalPrice, favouriteOrderedDetailJSON: changedFavOrderArray } };

    default:
      return state;
  }
};

const getFavOrderedTotalPrice = (favouriteOrderedDetailJSON) => {
  let totalPrice = 0;
  favouriteOrderedDetailJSON.map(favouriteOrdered => {
    totalPrice = totalPrice + (favouriteOrdered.price * favouriteOrdered.quantity);
  });
  return totalPrice;
};

const deleteFavouriteOrderedDetail = (id, favouriteOrderedDetailJSON) => {
  return favouriteOrderedDetailJSON.filter( (item) => item.id != id);
};

const setFavOrderedQuantity = (id, newQuantity, favouriteOrderedDetailJSON) => {
  for(var i=0; i<favouriteOrderedDetailJSON.length; i++){
    if(favouriteOrderedDetailJSON[i].id == id){

      favouriteOrderedDetailJSON[i].quantity = newQuantity;
    }
  }
  return favouriteOrderedDetailJSON;
};
