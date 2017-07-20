import {
 NOTIFICATION_FETCHING,
 NOTIFICATION_FETCHED,
 NOTIFICATION_FETCH_FAIL,
 DELETE_NOTIFICATION
} from '../actions/types';

const INITIAL_STATE = {
     isLoading: true,
     dataObj: {
       status: null,
       notificationsList: []
     }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NOTIFICATION_FETCHING:
       return { ...state, isLoading : true };

      case NOTIFICATION_FETCHED:
       return { ...state,
           isLoading: false,
           dataObj: {
             status: action.payload.status,
             notificationsList: action.payload.data
           }
      };

      case NOTIFICATION_FETCH_FAIL:
       return { ...state,
         isLoading: false,
           dataObj:{
             status:0,
             notificationsList: [],
            }
        };

      case DELETE_NOTIFICATION:
        let newDataObj = deleteNotification(action.payload, state.dataObj.notificationsList);
        return { ...state, isLoading: false,
          dataObj: {
            ...state.dataObj,
            notificationsList: newDataObj
          }
        };

      default:
       return state;
    }
};




function deleteNotification(id, dataObj) {
    dataObj =  dataObj.filter( (item) => item.id != id);
    return dataObj;
}
