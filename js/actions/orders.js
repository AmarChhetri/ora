import {
  NOW_ORDERED_LIST,
  PAST_ORDERED_LIST,
  FAVOURITE_ORDERED_LIST,
  FAVOURITE_ORDERED_DETAIL,
  FAVOURITE_ORDERED_DETAIL_DELETE,
  FAVOURITE_ORDERED_QUANTITY_CHANGE,
  FAVOURITE_ALTERED,
  ITEM_RETURNED,
  SET_ACTIVE_ORDER_TAB,
  baseUrl,
  resetResfreshToken
} from './types';

export function nowOrderedListFetch() {

  return (dispatch, getState) => {
     let url = baseUrl + '/orders';
     const authorizationToken = getState().user.token;
      fetch(url,
      {
           method: 'GET',
           headers: {
            "Authorization" : `Bearer ${authorizationToken}`
          }
      })
      .then((response) => {
        response.json()
        .then(nowOrderedObj => {
          if (nowOrderedObj.token !== "") {
            dispatch(resetResfreshToken(nowOrderedObj.token));
          }
          nowOrderedListRecieved(dispatch, nowOrderedObj)
        })
      })
      .catch(err => {
        console.log("ERROR ========= " + err);
        throw err;
      });
  };
};

export function pastOrderedListFetch() {
  return (dispatch, getState) => {
     let url = baseUrl + '/pastorders';
     let authorizationToken2 = getState().user.token;
     fetch(url,
      {
          method: 'GET',
          headers: {
            "Authorization" : `Bearer ${authorizationToken2}`
          }
      })
      .then((response) => {
        response.json()
        .then(pastOrderedObj => {
          if (pastOrderedObj.token !== "") {
            dispatch(resetResfreshToken(pastOrderedObj.token));
          }
          pastOrderedListRecieved(dispatch, pastOrderedObj)
        })
      })
      .catch(err => {
        console.log("ERROR ========= " + err);
        throw err;
      });
  };
};

export function favouriteOrderedListFetch() {
  return (dispatch, getState) => {
     let url = baseUrl + '/favouriteorders';
     let authorizationToken3 = getState().user.token;
     fetch(url,
      {
          method: 'GET',
          headers: {
            "Authorization" : `Bearer ${authorizationToken3}`
          }
      })
      .then((response) => response.json())
      .then(favouriteOrderedObj => {
        if (favouriteOrderedObj.token !== "") {
          dispatch(resetResfreshToken(favouriteOrderedObj.token));
        }
        favouriteOrderedListRecieved(dispatch, favouriteOrderedObj)
      })
      .catch(err => {
        console.log("ERROR ========= " + err);
        throw err;
      });
  };
};


export function favouriteOrderedDetailDelete(id) {
   return {
            type: FAVOURITE_ORDERED_DETAIL_DELETE,
            payload: id
          };
};

export function favouriteOrderQuantityChange(id, newQuantity) {
   return {
            type: FAVOURITE_ORDERED_QUANTITY_CHANGE,
            payload: {
              id: id,
              quantity: newQuantity
            }
          };
};


export function toogleFavourite(id, addtoFavouriteUrl) {
  return (dispatch, getState) => {
     let url = baseUrl + addtoFavouriteUrl;
     let authorizationToken4 = getState().user.token;
     fetch(url,
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authorizationToken4}`
          },
          body: JSON.stringify({
            order_id : id,
          })
      })
      .then((response) => response.json())
      .then(responseData =>{
            if (responseData.token !== "") {
              dispatch(resetResfreshToken(responseData.token));
            }
            if (true) {
              dispatch({type: FAVOURITE_ALTERED, payload: responseData })
            }

          }
        )
        .catch(err => {
          console.log("ERROR ========= " + err);
          throw err;
        });
  };
};

export function returnItem(itemToReturn) {
  const {productId, orderId, subcategory_id, subcategory, returnQuantity, totalReturnPrice, returnReason } = itemToReturn;
  return (dispatch, getState) => {
     let url = baseUrl + '/return';
     let authorizationToken4 = getState().user.token;
     fetch(url,
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authorizationToken4}`
          },
          body: JSON.stringify({
            order_id : orderId,
            product_id: productId,
            subcategory_id: subcategory_id,
            subcategory: subcategory,
            quantity: returnQuantity,
            price: totalReturnPrice,
            reason: returnReason
          })
      })
      .then((response) => response.json())
      .then(responseData =>{
            if (responseData.token !== "") {
              dispatch(resetResfreshToken(responseData.token));
            }
            if (responseData.status === 1) {
              dispatch({type: ITEM_RETURNED, payload: responseData })
            }

          }
        )
        .catch(err => {
          console.log("ERROR ========= " + err);
          throw err;
        });
  };
};

export function setActiveOrderTab(id) {
  return {
    type: SET_ACTIVE_ORDER_TAB,
    tab_id: id
  };
}

const nowOrderedListRecieved = (dispatch, nowOrderedObj) => {
  dispatch({
    type: NOW_ORDERED_LIST,
    payload: nowOrderedObj
  });
};

const pastOrderedListRecieved = (dispatch, pastOrderedObj) => {
  dispatch({
    type: PAST_ORDERED_LIST,
    payload: pastOrderedObj
  });
};

const favouriteOrderedListRecieved = (dispatch, favouriteOrderedObj) => {
  dispatch({
    type: FAVOURITE_ORDERED_LIST,
    payload: favouriteOrderedObj
  });
};

const favouriteOrderedDetailRecieved = (dispatch, favouriteOrderedDetail) => {
  dispatch({
    type: FAVOURITE_ORDERED_DETAIL,
    payload: favouriteOrderedDetail
  });
};
