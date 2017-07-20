
export const GET_ACTIVE_HOMEPAGE = 'GET_ACTIVE_HOMEPAGE';
export const SET_ACTIVE_HOMEPAGE = 'SET_ACTIVE_HOMEPAGE';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export function getActiveHomepage(){
  return {
    type: GET_ACTIVE_HOMEPAGE,
  };
}

export function setActiveHomepage(homepage) {
  return {
    type: SET_ACTIVE_HOMEPAGE,
    homepage: homepage
  };
}

export function setActiveTab(tab) {
  return {
    type: SET_ACTIVE_TAB,
    tab: tab
  };
}
