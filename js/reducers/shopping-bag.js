// Location Reducer
import {
  CLEAR_CART,
  ADD_NEW_TO_SHOPPING_BAG,
  REQUESTING_INCREASE_QTY_SHOPPING_BAG,
  SUCCESS_INCREASE_QTY_SHOPPING_BAG,
  FAILED_INCREASE_QTY_SHOPPING_BAG,
  DECREASE_QTY_SHOPPING,
  REMOVE_FROM_CART_SHOPPING,
  REQUEST_REORDER_SHOP,
  REORDER_SHOP_SUCCESS,
  REORDER_SHOP_FAILURE
} from '../actions/shopping-bag'

import {
  ADD_PRODUCT_DELIVERY_AND_VAT_CHARGES
} from '../actions/ecommerce';

var _ = require('lodash');
const appStateForShoppingBag={
  productId:null,
  subCategoryId: null,
  error:false,
  errorMsg: null,
  requesting: false,
}
const initialState = {
  appStateForShoppingBag:{
    ...appStateForShoppingBag
  },
  size:0,
  vatPercentile: 0,
  delivery_charge_inapp:0,
  total_price: 0,
  payable_price: 0,
  additions:{
    vat:0,
    delivery_charge:0
  },
  deductions: 0,
  cartItem : [],
}
function shoppingBag(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_DELIVERY_AND_VAT_CHARGES:
      return {
        ...state,
        appStateForShoppingBag:appStateForShoppingBag,
        delivery_charge_inapp:action.payload.delivery_charge,
        vatPercentile:action.payload.vat
      }
    case REQUEST_REORDER_SHOP:
      return {
        ...state,
        ...initialState,
        appStateForShoppingBag:{
          ...initialState.appStateForShoppingBag,
          requesting: true
        }
       };
     case REORDER_SHOP_SUCCESS:
       const { data:cartItem, payable_price, total_price, additions, vat: vatPercentileReorder, delivery_charge:delivery_chargeReorder } = action.payload;
       let sizeOfCart=0;
       cartItem.map(item=>{
         sizeOfCart = sizeOfCart + item.qty;
       });
       return {
         ...state,
         cartItem:[...cartItem],
         size: sizeOfCart,
         payable_price: payable_price,
         total_price: total_price,
         additions:{
           vat:additions.vat,
           delivery_charge:additions.delivery_charge
         },
         vatPercentile: vatPercentileReorder,
         delivery_charge_inapp: delivery_chargeReorder,
         appStateForShoppingBag:{
           ...initialState.appStateForShoppingBag,
           requesting: false
         }
        };
     case REORDER_SHOP_FAILURE:
       return {
         ...state,
         ...initialState,
         appStateForShoppingBag:{
           ...initialState.appStateForShoppingBag,
           error: true,
           errorMsg: action.error,
           requesting: false
         }
        };
    case CLEAR_CART:
      return { ...state, ...initialState, size:0, cartItem:[] };
    case ADD_NEW_TO_SHOPPING_BAG:
    //let initialDeliveryCharge = (state.total_price + action.product.price) > 500 ? 0 : state.delivery_charge_inapp;
    let initialDeliveryCharge =  state.delivery_charge_inapp;
    let initialVat = Math.round((state.vatPercentile / 100) * (state.total_price + action.product.price));
      return { ...state,
        size:state.size+1,
        cartItem:[...state.cartItem, action.product],
        total_price:state.total_price + action.product.price,
        additions:{
          ...state.additions,
          vat:initialVat,
          delivery_charge:initialDeliveryCharge
        },
        payable_price: (state.total_price + action.product.price + initialVat + initialDeliveryCharge)
      }
    case FAILED_INCREASE_QTY_SHOPPING_BAG:
      return { ...state,
        appStateForShoppingBag:{
          ...state.appStateForShoppingBag,
          error:true,
          productId:action.payload.productId,
          subCategoryId:action.payload.subCategoryId
        }
      }
    case SUCCESS_INCREASE_QTY_SHOPPING_BAG:
      const { payload } = action;
      let price = 0;
      let item = state.cartItem.map((object,index)=>{
        if ((object.id === payload.productId) && (object.subcategory_id === payload.subCategoryId)) {
          price = object.price;
          obj = { ...object, qty:object.qty+1}
          return obj;
        }
        return object;
      })
      //let deliveryChargeonAddition = state.total_price+price > 500 ? 0 : state.delivery_charge_inapp;
      let deliveryChargeonAddition = state.delivery_charge_inapp;
      let vatAddition = Math.round((state.vatPercentile/100) * (state.total_price+price));
      return { ...state,
        size:state.size+1,
        appStateForShoppingBag:appStateForShoppingBag,
        cartItem:item,
        total_price:state.total_price + price,
        additions:{
          ...state.additions,
          vat:vatAddition,
          delivery_charge:deliveryChargeonAddition
        },
        payable_price: (state.total_price + price + deliveryChargeonAddition + vatAddition)
      }
    case DECREASE_QTY_SHOPPING:
      let priceDecrease = 0;
      const itemMinus = state.cartItem.map((object,index)=>{
        if ((object.id === action.payload.productId) && (object.subcategory_id === action.payload.subCategoryId)) {
          priceDecrease = object.price;
          obj = { ...object, qty:object.qty-1}
          return obj;
        }
        return object;
      })
      //let deliveryChargeonSubstraction = state.total_price - priceDecrease > 500 ? 0 : state.delivery_charge_inapp;
      let deliveryChargeonSubstraction = state.delivery_charge_inapp;
      let vatDecrease = Math.round((state.vatPercentile/100) * (state.total_price - priceDecrease));
      return {
        ...state,
        size:state.size-1,
        appStateForShoppingBag:appStateForShoppingBag,
        cartItem:itemMinus,
        total_price:state.total_price - priceDecrease,
        additions:{
          ...state.additions,
          vat:vatDecrease,
          delivery_charge:deliveryChargeonSubstraction
        },
        payable_price: (state.total_price - priceDecrease + vatDecrease + deliveryChargeonSubstraction)
      }
    case REMOVE_FROM_CART_SHOPPING:
      let priceRemove = 0
      const cartItemToRemove =  [ ...state.cartItem ]
      _.remove(cartItemToRemove, function(o) {
          if ((o.id === action.payload.productId) && (o.subcategory_id === action.payload.subCategoryId)) {
            priceRemove = o.price
          }
          return (o.id === action.payload.productId) && (o.subcategory_id === action.payload.subCategoryId)
        });
        //let deliveryChargesRemove = state.total_price-priceRemove > 500 ? 0 : state.delivery_charge_inapp;
        let deliveryChargesRemove = state.delivery_charge_inapp;
        let vatRemove = Math.round((state.vatPercentile/100) * (state.total_price-priceRemove));
      return {
        ...state,
        size:state.size-1,
        appStateForShoppingBag:appStateForShoppingBag,
        cartItem:cartItemToRemove,
        additions:{
          ...state.additions,
          vat: vatRemove,
          delivery_charge: deliveryChargesRemove
        },
        total_price: state.total_price-priceRemove,
        payable_price: (state.total_price-priceRemove + vatRemove + deliveryChargesRemove)
      }
    default:
      return state
  }
}


module.exports = {
  shoppingBag: shoppingBag,
  shoppingBagIS: initialState
};
