
const initialStateBestInTown={
  isFetching:false,
  isInit:true,
  bestRestro: undefined,
}

function bestintown(state = initialStateBestInTown, action) {
  switch (action.type) {
    case 'CLEAR_BEST_IN_TOWN':
      return { ...state, ...initialStateBestInTown };
    case 'LIST_REQUESTED':
      return { ...state, isFetching: true, isInit:false, bestRestro: undefined };
    case 'LIST_RECEIVED':
      return { ...state , isFetching : false, isInit: false, bestRestro: action.arrayOfBestRestro  }
    default:
      return state
  }
}


export default bestintown
