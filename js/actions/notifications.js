import {
 NOTIFICATION_FETCHING,
 NOTIFICATION_FETCHED,
 NOTIFICATION_FETCH_FAIL,
 AUTHORIZATION_TOKEN,
 DELETE_NOTIFICATION,
 baseUrl,
 resetResfreshToken
} from './types';

export function fetchNotifications() {
  return (dispatch, getState) => {
     const authorizationToken = getState().user.token;
     dispatch({ type: NOTIFICATION_FETCHING});
     let url = baseUrl + '/notifications';

      fetch(url,
      {
          method: 'GET',
          headers: {
            "Authorization" : `Bearer ${authorizationToken}`
          }
      })
      .then((response) =>response.json())
      .then(notificationsObj => {
        if (notificationsObj.token !== "") {
          dispatch(resetResfreshToken(notificationsObj.token));
        }
        recieveNotifications(dispatch, notificationsObj)
      })
      .catch(err => recieveNotificationsFail(err, dispatch) );
  };
};


export function deleteNotifications(id) {
   return (dispatch, getState) => {
     let authorizationToken2 = getState().user.token;

        let url = baseUrl + '/notifications/' + id;

      fetch(url,
      {
          method: 'DELETE',
          headers: {
            "Authorization" : `Bearer ${authorizationToken2}`
          }
      })
      .then( delNotification(dispatch, id) )
      .catch(err => console.log("Delete Notifications Fail...")) ;
   };
};

const delNotification = (dispatch, id) => {
  dispatch({
    type: DELETE_NOTIFICATION,
    payload: id
  });
};


const recieveNotifications = (dispatch, notificationsObj) => {
  dispatch({
    type: NOTIFICATION_FETCHED,
    payload: notificationsObj
  });
};

const recieveNotificationsFail = (err, dispatch) => {
  dispatch({
    type: NOTIFICATION_FETCH_FAIL
  });
};
