
export const GET_ACTIVE_LOCATION = 'GET_ACTIVE_LOCATION';
export const GET_ALL_LOCATION = 'GET_ALL_LOCATION';
export const SET_ACTIVE_LOCATION = 'SET_ACTIVE_LOCATION';

export function getLocation(){
  return {
    type: GET_ACTIVE_LOCATION,
  };
}

export function setLocation(location) {
  return {
    type: SET_ACTIVE_LOCATION,
    location: location
  };
}
