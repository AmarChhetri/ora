export const NOW_ORDERED_LIST = 'now_ordered_list';
export const PAST_ORDERED_LIST = 'past_ordered_list';
export const FAVOURITE_ORDERED_LIST = 'favourite_ordered_list';
export const FAVOURITE_ORDERED_DETAIL = 'favourite_ordered_detail';
export const FAVOURITE_ORDERED_DETAIL_DELETE = 'favourite_ordered_detail_delete';

export const FAVOURITE_ORDERED_QUANTITY_CHANGE = 'favourite_ordered_quantity_change';
export const SHOW_PRUDUCT_DISPLAY = 'show_product_display';
export const HIDE_PRUDUCT_DISPLAY = 'HIDE_PRUDUCT_DISPLAY';
export const RECEIVE_PRODUCT_DETAILS = 'RECEIVE_PRODUCT_DETAILS';
export const PRODUCT_CATEGORIES_RECIEVING = 'product_categories_recieving'
export const PRODUCT_CATEGORIES_RECIEVED = 'product_categories_recieved';
export const PRODUCT_HOME_BANNER_RECIEVING = 'product_home_banner_recieving';
export const PRODUCT_HOME_BANNER_RECIEVED = 'product_home_banner_recieved';
export const PRODUCT_DETAILS_RECIEVING = 'product_detail_recieving';
export const PRODUCT_DETAILS_RECIEVED = 'product_detailS_recieve';

export const NOTIFICATION_FETCHING = 'notification_fetching';
export const NOTIFICATION_FETCHED = 'notification_fetched';
export const NOTIFICATION_FETCH_FAIL = 'notification_fetch_fail';
export const AUTHORIZATION_TOKEN = 'authorization_token';
export const DELETE_NOTIFICATION = 'delete_notification';
export const PRODUCT_DETAILS_RECIEVE_FAIL = 'product_details_recieve_fail';
export const FAVOURITE_ALTERED = 'favourite_altered';
export const ITEM_RETURNED = 'item_returned';
export const SET_ACTIVE_ORDER_TAB = 'set_active_order_tab';
export const RESET_REFRESH_TOKEN = 'RESET_REFRESH_TOKEN'; 


export const LATEST_PRODUCT_REQUESTING = 'LATEST_PRODUCT_REQUESTING';
export const LATEST_PRODUCT_RECIEVED = 'LATEST_PRODUCT_RECIEVED';
export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS';


export function resetResfreshToken(token){
  return {
    type: RESET_REFRESH_TOKEN,
    token: token
  };
}
  //
  // Export base url
  //

export const baseUrl = "http://35.154.101.90/api/v2";
