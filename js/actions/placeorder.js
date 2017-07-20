
import {baseUrl,resetResfreshToken} from './types';

export const CLEAR_PLACEORDER_COUPON = 'CLEAR_PLACEORDER_COUPON';
export function clearPlaceOrder() {
  return {
    type: CLEAR_PLACEORDER_COUPON,
  };
}

export const PLACE_ORDER_SUCCEDDED = 'PLACE_ORDER_SUCCEDDED';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const REQUESTING_PLACE_ORDER = 'REQUESTING_PLACE_ORDER';

export function requestingPlaceOrder() {
  return {
    type: REQUESTING_PLACE_ORDER,
  };
}
export function placeOrderFailed(msg) {
  return {
    type: PLACE_ORDER_FAILED,
    msg:msg,
  };
}
export function placeOrderSuccedded(id) {
  return {
    type: PLACE_ORDER_SUCCEDDED,
    order_id: id
  };
}

export function placeOrder(address, from) {
 return (dispatch, getState) => {
   dispatch(requestingPlaceOrder())
  const cartToRequest = from === "shop" ? getState().shoppingBag:getState().cart;
  const cartObject = Object.assign({}, cartToRequest);
  const token = getState().user.token;
  delete cartObject.size;
  delete cartObject.vatPercentile;
  delete cartObject.deductionPercentile;
  delete cartObject.delivery_charge_inapp;
  const orderObject = {
    ...cartObject,
    saved_address: {...address},
    };
   const orderUrl = from === "shop" ? `${baseUrl}/ecommerceOrder`:`${baseUrl}/order`
   return fetch(orderUrl,{
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ ...orderObject }),
     })
     .then(response =>
       response.json()
       .then(data =>{
         if ( data.status === 1) {
           if (data.token !== "") {
             dispatch(resetResfreshToken(data.token));
           }
           dispatch(placeOrderSuccedded(data.order_id))
         }
         else if( data.status === 0) {
           dispatch(placeOrderFailed(data.msg))
         }
       })
     ).catch(err =>console.log(err))
   }
}



export const CONFIRM_ORDER_SUCCEDDED = 'CONFIRM_ORDER_SUCCEDDED';
export const CONFIRM_ORDER_FAILED = 'CONFIRM_ORDER_FAILED';
export const REQUESTING_CONFIRM_ORDER_ORDER = 'REQUESTING_CONFIRM_ORDER_ORDER';

export function requestingConfirmOrder() {
  return {
    type: REQUESTING_CONFIRM_ORDER_ORDER,
  };
}
export function confirmOrderFailed() {
  return {
    type: CONFIRM_ORDER_FAILED,
  };
}
export function confirmOrderSuccedded() {
  return {
    type: CONFIRM_ORDER_SUCCEDDED,
  };
}

export function orderViaCod(order_id, from) {
 return (dispatch, getState) => {
   dispatch(requestingConfirmOrder())
  const token = getState().user.token;
   const codUrl = from === "food" ? `${baseUrl}/orderconfirm` : `${baseUrl}/ecommerceOrderConfirm`
   return fetch(codUrl,{
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ order_id: order_id }),
     })
     .then(response =>
       response.json()
       .then(data =>{
         if ( data.status === 1) {
           if (data.token !== "") {
             dispatch(resetResfreshToken(data.token));
           }
           dispatch(confirmOrderSuccedded())
         }
         else if( data.status === 0) {
           dispatch(confirmOrderFailed())
         }
       })
     ).catch(err =>console.log(err))
   }
}



export const REQUEST_PAY_VIA_CREDIT_DEBIT = 'REQUEST_PAY_VIA_CREDIT_DEBIT';
export const PAY_VIA_CREDIT_DEBIT_FAILED = 'PAY_VIA_CREDIT_DEBIT_FAILED';
export const PAY_VIA_CREDIT_DEBIT_SUCCESS = 'PAY_VIA_CREDIT_DEBIT_SUCCESS';

export function requestPayViaCreditDebit() {
  return {
    type: REQUEST_PAY_VIA_CREDIT_DEBIT,
  };
}
export function payViaCreditDebitFailed() {
  return {
    type: PAY_VIA_CREDIT_DEBIT_FAILED,
  };
}
export function payViaCreditDebitSuccess(url) {
  return {
    type: PAY_VIA_CREDIT_DEBIT_SUCCESS,
    url: url
  };
}

export function payViaCreditDebit(order_id, amount, from) {
 return (dispatch, getState) => {
   dispatch(requestPayViaCreditDebit())
   const token = getState().user.token;
   const user = getState().user.user;
   const purpose = from === "food" ? `orders-${order_id}` : `ecommerce-${order_id}`
   const obj = {
     ...user,
     purpose:purpose,
     amount: amount

   }
   const url = `${baseUrl}/pay`;
   return fetch(url,{
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        ...obj
      }),
     })
     .then(response =>
       response.json()
       .then(data =>{
         if ( data.status === 1) {
           if (data.token !== "") {
             dispatch(resetResfreshToken(data.token));
           }
           dispatch(payViaCreditDebitSuccess(data.long_url))
         }
         else if( data.status === 0) {
           dispatch(payViaCreditDebitFailed())
         }
       })
     ).catch(err =>console.log(err))
   }
}
