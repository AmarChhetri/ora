'use strict';

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {reducer} from './reducers/'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

export default function configureStore(onCompletion:()=>void):any {
	const enhancer = compose(
		applyMiddleware(thunk)
	);

	let store = createStore(reducer, enhancer, autoRehydrate());
	persistStore(store,
		{
			storage: AsyncStorage,
			blacklist:[
				'ecommerce',
				'placeorder',
				'coupon',
				'location',
				'search',
				'searchEcom',
				'sidebar',
				'orders',
				'shoppingBag',
				'tab',
				'cuisine',
				'restaurant',
				'homepage',
				'bestintown',
				'banners',
				'login',
				'tableReservation'
			]
		},
		onCompletion);

	return store
}
