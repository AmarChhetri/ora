
import {baseUrl, resetResfreshToken} from './types';

export const ADD_AND_INITIATE_CART = 'ADD_AND_INITIATE_CART';
export const ADD_NEW_TO_CART = 'ADD_NEW_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_QTY_INCREASE = 'UPDATE_QTY_INCREASE';
export const UPDATE_QTY_DECREASE = 'UPDATE_QTY_DECREASE';
export const ADD_DEDUCTION = 'ADD_DEDUCTION';
export const REQUESTING_COUPON = 'REQUESTING_COUPON';
export const FOUND_COUPON = 'FOUND_COUPON';
export const ADD_ORDER_AGAIN_TO_CART = 'ADD_ORDER_AGAIN_TO_CART';
export const REPLACE_AND_CLEAR = 'REPLACE_AND_CLEAR';
export const COUPON_FAILED = 'COUPON_FAILED';

//
// Handles action related to add to cart
//
export function addOrderAgain(item, restroName, additional_charges){
  return {
    type: ADD_ORDER_AGAIN_TO_CART,
    item: item,
    additionalCharges: additional_charges,
    restroName:restroName
  };
}

export function replaceAndClear(item, restroName, additional_charges){
  return {
    type: REPLACE_AND_CLEAR,
    item: item,
    additionalCharges: additional_charges,
    restroName:restroName
  };
}


export function addAndInitiate(restroId, restroObj, item){
  return {
    type: ADD_AND_INITIATE_CART,
    restroId:restroId,
    restroName:restroObj.title,
    vat:restroObj.vat,
    packing_charge:restroObj.packing,
    delivery_charge: restroObj.delivery_charge,
    item: item
  };
}

export function addNew(item){
  return {
    type: ADD_NEW_TO_CART,
    item: item
  };
}

export function updateQtyIncrease(id){
  return {
    type: UPDATE_QTY_INCREASE,
    id: id
  };
}
export function addToCart(restroId,restroObj,id,name,price){
    return (dispatch,getState) => {
      let update_increase = false;
      const item = {
        id:id,
        name:name,
        qty:1,
        price:price
      }
      const restroIdinCart = getState().cart.restroId;
      const cartItem = getState().cart.cartItem;
      if (cartItem.length > 0) {
        cartItem.map((obj, index)=>{
          if (obj.id === id) {
              update_increase = true;
              dispatch(updateQtyIncrease(id))
          }
        })
      }
      if (!restroIdinCart || restroIdinCart === null) {
          dispatch(addAndInitiate(restroId,restroObj, item))
      }
      else if (restroIdinCart && !update_increase) {
        dispatch(addNew(item))
      }
    }
  }


  //
  // Handles action related to remove from cart
  //
  export function remove(id) {
    return {
      type: REMOVE_FROM_CART,
      id:id
    };
  }

  export function removeAndClear() {
    return {
      type: CLEAR_CART,
    };
  }

  export function updateQtyDecrease(id){
    return {
      type: UPDATE_QTY_DECREASE,
      id: id
    };
  }

  export function removeFromCart(restroId,id){
      return (dispatch,getState) => {
        let update_remove = false;
        const cartItem = getState().cart.cartItem;
        if (cartItem.length > 0) {
          cartItem.map((obj, index)=>{
            if (obj.id === id && obj.qty > 1) {
                update_remove = true;
                dispatch(updateQtyDecrease(id))
            }if (obj.id === id && obj.qty === 1 && cartItem.length === 1 && !update_remove) {
                dispatch(removeAndClear())
            }else if (obj.id === id && obj.qty === 1 && !update_remove) {
                dispatch(remove(id))
            }
          })
        }
      }
    }

  //
  // Remove a particular item from cart
  //

  export function applyDeductions(deduction){
    return {
      type: ADD_DEDUCTION,
      deduction: deduction
    };
  }

  export function foundCoupon(){
    return {
      type: FOUND_COUPON,
    };
  }


  export function requestingCoupon(){
    return {
      type: REQUESTING_COUPON,
    };
  }

  export function failedCoupon(){
    return {
      type: COUPON_FAILED,
    };
  }


  //
  // Reoredr food
  //
  export const REQUEST_REORDER_FOOD = 'REQUEST_REORDER_FOOD';
  export function requestingReorderFood(){
    return {
      type: REQUEST_REORDER_FOOD
    };
  }

  export const REORDER_FOOD_SUCCESS = 'REORDER_FOOD_SUCCESS';
  export function reorderFoodSuccess(item){
    return {
      type: REORDER_FOOD_SUCCESS,
      payload: item
    };
  }

  export const REORDER_FOOD_FAILURE = 'REORDER_FOOD_FAILURE';
  export function reorderFoodFailure(error){
    return {
      type: REORDER_FOOD_FAILURE,
      error: error
    };
  }
  export function requestReorderFood(restroId){
    return (dispatch) => {
      dispatch(requestingReorderFood())
      return fetch(`${baseUrl}/reorderRestaurant/${restroId}`,
        {
            method: 'GET'
        }).then(res =>{
          res.json()
          .then(data=>{
            const { status } = data;
            if ( status === 1) {
              dispatch(reorderFoodSuccess(data));
              return ;
            }
            dispatch(reorderFoodFailure(data.msg));
          })
        }).catch(err =>{
          console.log(err);
          throw err;
        })
    }
  }

  export function requestCoupon(couponCode){
    return (dispatch,getState) => {
      const token = getState().user.token;
      dispatch(requestingCoupon())
      return fetch(`${baseUrl}/offers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            'coupon': couponCode,
            'for': 1
          })
        }).then(response =>{
            response.json()
             .then((data) => {
               if ( data.status === 1) {
                 if (data.token !== "") {
                   dispatch(resetResfreshToken(data.token));
                 }
                 dispatch(applyDeductions(data.value.percentage))
                 dispatch(foundCoupon())
               }
               else if( data.status === 0) {
                 dispatch(failedCoupon())
               }
             });
        })
        .catch(err =>  console.log(err) )
    }
  }
