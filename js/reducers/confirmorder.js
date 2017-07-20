// Homepage Reducer
import {
  PAY_VIA_CREDIT_DEBIT_FAILED,
  PAY_VIA_CREDIT_DEBIT_SUCCESS,
  REQUEST_PAY_VIA_CREDIT_DEBIT,
  CONFIRM_ORDER_FAILED,
  CONFIRM_ORDER_SUCCEDDED,
  REQUESTING_CONFIRM_ORDER_ORDER
} from '../actions/placeorder'

const codIS = {
  isFetching: false,
  done:false,
  codError:false
}

const debitCreditIS = {
  fetching:true,
  long_url:null,
  error: false,
}


function confirmorder(state = {
  cod:codIS,
  debitCredit:debitCreditIS
}, action) {
  switch (action.type) {
    case REQUEST_PAY_VIA_CREDIT_DEBIT:
      return { ...state, debitCredit:{ ...debitCreditIS, fetching: true }, cod:codIS };
    case PAY_VIA_CREDIT_DEBIT_SUCCESS:
      return { ...state, debitCredit:{ ...debitCreditIS, long_url: action.url }, cod:codIS };
    case PAY_VIA_CREDIT_DEBIT_FAILED:
      return { ...state , debitCredit:{ ...debitCreditIS, error: true }, cod:codIS };
    case REQUESTING_CONFIRM_ORDER_ORDER :
      return { ...state, cod:{ ...codIS, isFetching: true}, debitCredit: debitCreditIS };
    case CONFIRM_ORDER_SUCCEDDED:
      return { ...state, cod:{ ...codIS, done: true }, debitCredit: debitCreditIS};
    case CONFIRM_ORDER_FAILED:
      return { ...state, cod: { ...codIS, codError: true }, debitCredit: debitCreditIS};
    default:
      return state
  }
}


export default confirmorder
