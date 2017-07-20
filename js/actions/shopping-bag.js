import {baseUrl, resetResfreshToken} from './types';

export const CLEAR_CART = 'CLEAR_CART';
export function removeAndClearShoppingBag() {
  return {
    type: CLEAR_CART,
  };
}


export const ADD_NEW_TO_SHOPPING_BAG = 'ADD_NEW_TO_SHOPPING_BAG';
export function addToShoppingBag(product){
    return {
      type: ADD_NEW_TO_SHOPPING_BAG,
      product : product,
    }
  }

export const REMOVE_FROM_CART_SHOPPING = 'REMOVE_FROM_CART_SHOPPING';
export const DECREASE_QTY_SHOPPING = 'DECREASE_QTY_SHOPPING';
export function decreaseQTY(product,qty){
  if (qty === 1) {
    return {
      type: REMOVE_FROM_CART_SHOPPING,
      payload : product,
    }
  }
  return {
    type: DECREASE_QTY_SHOPPING,
    payload : product,
  }
}
export const REQUESTING_INCREASE_QTY_SHOPPING_BAG = 'REQUESTING_INCREASE_QTY_SHOPPING_BAG';
export function requesAvailability(payload){
  return {
    type: REQUESTING_INCREASE_QTY_SHOPPING_BAG,
    payload:payload
  };
}
export const SUCCESS_INCREASE_QTY_SHOPPING_BAG = 'SUCCESS_INCREASE_QTY_SHOPPING_BAG';
export function updateQtyIncreaseSuccess(payload){
  return {
    type: SUCCESS_INCREASE_QTY_SHOPPING_BAG,
    payload:payload
  };
}
export const FAILED_INCREASE_QTY_SHOPPING_BAG = 'FAILED_INCREASE_QTY_SHOPPING_BAG';
export function updateQtyIncreaseFailed(payload){
  return {
    type: FAILED_INCREASE_QTY_SHOPPING_BAG,
    payload:payload,
  };
}
export const INCREASE_QTY_SHOPPING_BAG = 'INCREASE_QTY_SHOPPING_BAG';
export function checkQTYandIncreaseQTY(product,qty){
  return (dispatch,getState) => {
    dispatch(requesAvailability(product))
    return fetch(`${baseUrl}/products/checkstock`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product })
      }).then(res =>{
        res.json()
        .then(data=>{

          if (data.stock >= qty+1 ) {
            dispatch(updateQtyIncreaseSuccess(product))
            return ;
          }
          dispatch(updateQtyIncreaseFailed(product))
        })
      }).catch(err =>{
        console.log(err);
        throw err;
      })
  }
}

export const REQUEST_REORDER_SHOP = 'REQUEST_REORDER_SHOP';
export function requestingReorder(){
  return {
    type: REQUEST_REORDER_SHOP
  };
}

export const REORDER_SHOP_SUCCESS = 'REORDER_SHOP_SUCCESS';
export function reorderSuccess(item){
  return {
    type: REORDER_SHOP_SUCCESS,
    payload: item
  };
}

export const REORDER_SHOP_FAILURE = 'REORDER_SHOP_FAILURE';
export function reorderFailure(error){
  return {
    type: REORDER_SHOP_FAILURE,
    error: error
  };
}


export function requestReorder(reorderItem){
  return (dispatch) => {
    dispatch(requestingReorder())
    return fetch(`${baseUrl}/reorder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...reorderItem })
      }).then(res =>{
        res.json()
        .then(data=>{
          const { isOrderable, status } = data;
          if (isOrderable ||( status === 1)) {
            dispatch(reorderSuccess(data));
            return ;
          }
          dispatch(reorderFailure(data.msg));
        })
      }).catch(err =>{
        console.log(err);
        throw err;
      })
  }
}
