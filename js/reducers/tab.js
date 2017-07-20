import { SET_ACTIVE_HOMEPAGE, GET_ACTIVE_HOMEPAGE, SET_ACTIVE_TAB } from '../actions/tab';

export type State = {
    activeHomepage: string
}

const initialState = {
  activeHomepage: 'food',
  activeTab:'homepage'
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === GET_ACTIVE_HOMEPAGE) {
    return state
  }

  if (action.type === SET_ACTIVE_HOMEPAGE) {
    return {
      ...state,
      activeHomepage: action.homepage,
    };
  }
  if (action.type === SET_ACTIVE_TAB) {
    return {
      ...state,
      activeTab: action.tab,
    };
  }
  return state;
}
