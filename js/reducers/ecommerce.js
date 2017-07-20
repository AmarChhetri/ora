import {
  PRODUCT_CATEGORIES_RECIEVING,
  PRODUCT_CATEGORIES_RECIEVED,
  PRODUCT_HOME_BANNER_RECIEVING,
  PRODUCT_HOME_BANNER_RECIEVED,
  PRODUCT_DETAILS_RECIEVING,
  PRODUCT_DETAILS_RECIEVED,
  PRODUCT_DETAILS_RECIEVE_FAIL,
  SHOW_PRUDUCT_DISPLAY,
  HIDE_PRUDUCT_DISPLAY,
  RECEIVE_PRODUCT_DETAILS,
  LATEST_PRODUCT_REQUESTING,
  LATEST_PRODUCT_RECIEVED
} from '../actions/types';

const INITIAL_STATE = {
  productHome:false,
  productHomeObject:{
    fetching:false,
    productHomeData:null,
  },
  productCategories: {
     isLoading: true,
     productCategoriesList: []
  },
  latestProduct: {
    isLoading: true,
    latestProductList: []
  },
  productHomeBanner: {
    isLoading: true,
    productHomeBannerList: []
  },
  productDetailsObj: {
    isLoading: false,
    productDetailsArray: []
  }
};


export default (state = INITIAL_STATE, action) => {
  const {productCategories, productHomeBanner, productDetailsObj, productHomeObject, latestProduct} = state;
  switch (action.type) {
    case SHOW_PRUDUCT_DISPLAY:
      return { ...state, productHome: true, productHomeObject:{...productHomeObject, fetching: true}};
    case RECEIVE_PRODUCT_DETAILS:
      return { ...state, productHomeObject:{...productHomeObject, fetching: false, productHomeData: action.productData}};
    case HIDE_PRUDUCT_DISPLAY:
      return { ...state, productHome: false};
    case LATEST_PRODUCT_REQUESTING:
      return { ...state, latestProduct: {isLoading: true, latestProductList: []} };
    case LATEST_PRODUCT_RECIEVED:
      return { ...state, latestProduct: {isLoading: false, latestProductList: action.payload} };
    case PRODUCT_CATEGORIES_RECIEVING:
      return { ...state, productCategories: {isLoading: true, productCategoriesList: productCategories.productCategoriesList} };
    case PRODUCT_CATEGORIES_RECIEVED:
      return { ...state, productCategories: {isLoading: false, productCategoriesList: action.payload.data} };
    case PRODUCT_HOME_BANNER_RECIEVING:
      return { ...state, productHomeBanner:{isLoading:true, productHomeBannerList: productHomeBanner.productHomeBannerList} };
    case PRODUCT_HOME_BANNER_RECIEVED:
      return { ...state, productHomeBanner:{isLoading:false, productHomeBannerList: action.payload.data} };
    case PRODUCT_DETAILS_RECIEVING:
      return { ...state, productDetailsObj: {isLoading: true, productDetailsArray: []} };
    case PRODUCT_DETAILS_RECIEVED:
      return { ...state, productDetailsObj: {isLoading: false, productDetailsArray: action.payload.data} };
    case PRODUCT_DETAILS_RECIEVE_FAIL:
      return { ...state, productDetailsObj: {isLoading: false, productDetailsArray: []} };
    default:
      return state;
  }
};
