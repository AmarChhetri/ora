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
   LATEST_PRODUCT_RECIEVED,
   baseUrl
} from './types';

export function fetchProductCategories() {
  return (dispatch) => {
     dispatch({ type: PRODUCT_CATEGORIES_RECIEVING});
     let url = `${baseUrl}/product_categories`;
      fetch(url,
      {
          method: 'GET'
      })
      .then((response) => response.json())
      .then(productCategoriesList => { recieveProductCategories(dispatch, productCategoriesList) })
      .catch(err => console.log("ERROR ========= " + err));
  };
};

export function fetchProductHomeBanner() {
  return (dispatch) => {
     dispatch({type: PRODUCT_HOME_BANNER_RECIEVING});
     let url = `${baseUrl}/banner_ec`;
      fetch(url,
      {
          method: 'GET'
      })
      .then((response) => response.json())
      .then(productHomeBannerList => {
        dispatch(addVatAndDeliveryCharges(productHomeBannerList));
        dispatch(recieveProductHomeBanner(productHomeBannerList));
      })
      .catch(err => console.log("ERROR ========= " + err));
  };
};

export function showProductDisplay(id){
  return (dispatch) => {
   dispatch({ type: SHOW_PRUDUCT_DISPLAY});
   const url = `${baseUrl}/products/${id}`
    fetch(url,
    {
        method: 'GET'
    })
    .then((response) => response.json())
    .then(productDetailsObj =>dispatch(receiveProductHomeDetails(productDetailsObj)))
    .catch(err => console.log(err));
  };
}

function receiveProductHomeDetails(data) {
  return {
    type: RECEIVE_PRODUCT_DETAILS,
    productData: data,
  }
}

export function hideProductDisplay(){
  return {
    type: HIDE_PRUDUCT_DISPLAY
  };
}


export function fetchProductDetails(catId) {
  return (dispatch) => {
     dispatch({ type: PRODUCT_DETAILS_RECIEVING});
     const url = `${baseUrl}/product_categories/${catId}`
      fetch(url,
      {
          method: 'GET'
      })
      .then((response) => response.json())
      .then(productDetailsObj => {recieveProductDetails(dispatch, productDetailsObj)})
      .catch(err => recieveProductDetailsFail(dispatch, err));
  };
};


const recieveProductCategories = (dispatch, productCategoriesList) => {
  dispatch({
    type: PRODUCT_CATEGORIES_RECIEVED,
    payload: productCategoriesList
  });
};

export const ADD_PRODUCT_DELIVERY_AND_VAT_CHARGES = "ADD_PRODUCT_DELIVERY_AND_VAT_CHARGES";
function addVatAndDeliveryCharges(productHomeBannerList){
  const productVatAndDeliveryCharges = {
    delivery_charge:productHomeBannerList.delivery_charge,
    vat:productHomeBannerList.vat
  }
  return{
    type: ADD_PRODUCT_DELIVERY_AND_VAT_CHARGES,
    payload: productVatAndDeliveryCharges
  }
}
function recieveProductHomeBanner (productHomeBannerList){
  return {
    type: PRODUCT_HOME_BANNER_RECIEVED,
    payload: productHomeBannerList
  };
};

const recieveProductDetails = (dispatch, productDetailsObj) => {
  dispatch({
    type: PRODUCT_DETAILS_RECIEVED,
    payload: productDetailsObj
  });
};

const recieveProductDetailsFail = (dispatch, err) => {
  dispatch({
    type: PRODUCT_DETAILS_RECIEVE_FAIL
  });
};


export function fetchLatestProducts() {
  return (dispatch) => {
     dispatch({ type: LATEST_PRODUCT_REQUESTING});
     let url = `${baseUrl}/product/latest`;
      fetch(url,
      {
          method: 'GET'
      })
      .then((response) => response.json())
      .then(latestProductList => { recieveLatestProduct(dispatch, latestProductList) })
      .catch(err => console.log("ERROR ========= " + err));
  };
};

const recieveLatestProduct = (dispatch, list) => {
  dispatch({
    type: LATEST_PRODUCT_RECIEVED,
    payload: list.data
  });
};
