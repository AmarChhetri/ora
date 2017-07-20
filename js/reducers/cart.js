// Location Reducer
import {
  ADD_NEW_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_AND_INITIATE_CART,
  UPDATE_QTY_INCREASE,
  UPDATE_QTY_DECREASE,
  ADD_DEDUCTION,
  ADD_ORDER_AGAIN_TO_CART,
  REPLACE_AND_CLEAR,
  REQUEST_REORDER_FOOD,
  REORDER_FOOD_SUCCESS,
  REORDER_FOOD_FAILURE
} from '../actions/cart'

var _ = require('lodash');

const appStateForFoodBag={
  requestingReorder: false,
  isOrderable: false,
  error:false,
  errorMsg: null,
}

const initialState = {
  appStateForFoodBag:{
    ...appStateForFoodBag
  },
  size:0,
  restroId: null,
  restroName: null,
  vatPercentile: 0,
  deductionPercentile: 0,
  delivery_charge_inapp:0,
  total_price: 0,
  payable_price: 0,
  additions:{
    vat:0,
    delivery_charge:0,
    packing_charge:0,
  },
  deductions: 0,
  cartItem : [],
}
function cart(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, ...initialState }
    case REQUEST_REORDER_FOOD:
      return {
        ...state,
        appStateForFoodBag:{
          ...initialState.appStateForFoodBag,
          requestingReorder: true
        }
      };
    case REORDER_FOOD_SUCCESS:
      return {
        ...state,
        appStateForFoodBag:{
          ...initialState.appStateForFoodBag,
          requestingReorder: false,
          isOrderable: true,
        }
      };
    case REORDER_FOOD_FAILURE:
      return {
        ...state,
        appStateForFoodBag:{
          ...initialState.appStateForFoodBag,
          requestingReorder: false,
          isOrderable: false,
          error: true,
          errorMsg: action.error
        }
      };
    case REPLACE_AND_CLEAR:
      const { cartItem } = action.item
      let sizeOfCart=0;
      cartItem.map(item=>{
        sizeOfCart = sizeOfCart + item.qty;
      });
      return {
        ...state,
        ...initialState,
        ...action.item,
        size: sizeOfCart,
        restroName: action.restroName,
        vatPercentile: action.additionalCharges.vat,
        delivery_charge_inapp:action.additionalCharges.delivery_charge,
      };
    case ADD_ORDER_AGAIN_TO_CART:
      return {
        ...state,
        ...initialState,
        ...action.item,
        restroName: action.restroName,
        vatPercentile: action.additionalCharges.vat,
        delivery_charge_inapp:action.additionalCharges.delivery_charge,
      };
    case ADD_DEDUCTION:
      let deductionCoupon = Math.round((action.deduction / 100) * state.payable_price);
      return {
        ...state,
        deductionPercentile: action.deduction,
        deductions: deductionCoupon,
        payable_price: state.payable_price - deductionCoupon
      };
    case ADD_AND_INITIATE_CART:
      //let initialDeliveryCharge = action.item.price > 200 ? 0 : action.delivery_charge;
      let initialDeliveryCharge = action.delivery_charge;
      let initialVat = Math.round((action.vat / 100) * action.item.price);
      let initialDeduction = Math.round((state.deductionPercentile / 100) * (action.item.price + initialVat + action.packing_charge + initialDeliveryCharge));
      return { ...state,
        size: state.size+1,
        restroId: action.restroId,
        restroName: action.restroName,
        cartItem: [ ...state.cartItem, action.item],
        vatPercentile: action.vat,
        deductionPercentile: state.deductionPercentile,
        delivery_charge_inapp: action.delivery_charge,
        additions:{
          ...state.additions,
          vat:initialVat,
          packing_charge:action.packing_charge,
          delivery_charge: initialDeliveryCharge,
        },
        deductions: initialDeduction,
        total_price: action.item.price,
        payable_price: (action.item.price + initialVat + action.packing_charge + initialDeliveryCharge) - initialDeduction
      }
    case UPDATE_QTY_INCREASE:
      let price = 0;
      let item = state.cartItem.map((object,index)=>{
        if (object.id === action.id) {
          price = object.price;
          obj = { ...object, qty:object.qty+1}
          return obj;
        }
        return object;
      })
      //let deliveryChargeonAddition = state.total_price+price > 200 ? 0 : state.delivery_charge_inapp;
      let deliveryChargeonAddition = state.delivery_charge_inapp;
      let vatAddition = Math.round((state.vatPercentile/100) * (state.total_price+price));
      let deductionsOnAddition = Math.round((state.deductionPercentile/100) * (state.total_price+ price + vatAddition + state.additions.packing_charge + deliveryChargeonAddition));
      return { ...state,
        size: state.size+1,
        cartItem:item,
        additions:{
          ...state.additions,
          delivery_charge: deliveryChargeonAddition,
          vat: vatAddition
        },
        deductions: deductionsOnAddition,
        total_price: state.total_price+price,
        payable_price: (state.total_price+ price + vatAddition + state.additions.packing_charge + deliveryChargeonAddition) - deductionsOnAddition
      };
    case UPDATE_QTY_DECREASE:
      let priceDecrease = 0;
      let itemMinus = state.cartItem.map((object,index)=>{
        if (object.id === action.id) {
          priceDecrease = object.price;
          obj = { ...object, qty:object.qty-1}
          return obj;
        }
        return object;
      })
      //let deliveryChargeonSubstraction = state.total_price - priceDecrease > 200 ? 0 : state.delivery_charge_inapp;
      let deliveryChargeonSubstraction = state.delivery_charge_inapp;
      let vatDecrease = Math.round((state.vatPercentile/100) * (state.total_price - priceDecrease));
      let deductionsOnSubstraction = Math.round((state.deductionPercentile/100) * (state.total_price - priceDecrease + vatDecrease + state.additions.packing_charge + deliveryChargeonSubstraction));
      return { ...state,
        size: state.size-1,
        cartItem:itemMinus,
        additions:{
          ...state.additions,
          delivery_charge: deliveryChargeonSubstraction,
          vat: vatDecrease
        },
        deductions: deductionsOnSubstraction,
        total_price: state.total_price - priceDecrease,
        payable_price: (state.total_price - priceDecrease + vatDecrease + state.additions.packing_charge + deliveryChargeonSubstraction) - deductionsOnSubstraction
      };
    case ADD_NEW_TO_CART:
      // let deliveryChargesNewAddition = state.total_price+action.item.price > 200 ? 0 : state.delivery_charge_inapp;
      let deliveryChargesNewAddition = state.delivery_charge_inapp;
      let vatNewAddition = Math.round((state.vatPercentile/100) * (state.total_price+action.item.price));
      let deductionsNewAddition = Math.round((state.deductionPercentile/100) * (state.total_price + action.item.price + vatNewAddition + state.additions.packing_charge + deliveryChargesNewAddition));
      return { ...state,
        size:state.size+1,
        cartItem: [ ...state.cartItem , action.item],
        additions:{
          ...state.additions,
          delivery_charge: deliveryChargesNewAddition,
          vat: vatNewAddition
        },
        deductions: deductionsNewAddition,
        total_price: state.total_price+action.item.price,
        payable_price: (state.total_price + action.item.price + vatNewAddition + state.additions.packing_charge + deliveryChargesNewAddition) - deductionsNewAddition
      };
    case REMOVE_FROM_CART:
      let priceRemove = 0
      const cartItemToRemove =  [ ...state.cartItem ]
      _.remove(cartItemToRemove, function(o) {
          if (o.id === action.id) {
            priceRemove = o.price
          }
          return o.id === action.id
        });
      //let deliveryChargesRemove = state.total_price-priceRemove > 200 ? 0 : state.delivery_charge_inapp;
      let deliveryChargesRemove =  state.delivery_charge_inapp;
      let vatRemove = Math.round((state.vatPercentile/100) * (state.total_price-priceRemove));
      let deductionsRemove = Math.round((state.deductionPercentile/100) * (state.total_price-priceRemove + vatRemove + state.additions.packing_charge + deliveryChargesRemove ));
      return { ...state,
        size:state.size-1,
        cartItem: cartItemToRemove,
        additions:{
          ...state.additions,
          vat: vatRemove,
          delivery_charge: deliveryChargesRemove
        },
        deductions:deductionsRemove,
        total_price: state.total_price-priceRemove,
        payable_price: (state.total_price-priceRemove + vatRemove + state.additions.packing_charge + deliveryChargesRemove) - deductionsRemove
      };
    default:
      return state
  }
}


module.exports = {
  cart: cart,
  cartIS: initialState
};
