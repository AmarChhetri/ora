import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/sidebar';

export type State = {
    drawerState: string
}

const initialState = {
  drawerState: 'closed',
};

function sidebar(state:State = initialState, action:Action): State {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }
  return state;
}

module.exports = {
  sidebar: sidebar,
  sidebarIS: initialState
};
