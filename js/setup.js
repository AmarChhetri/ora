'use strict';

import React, {Component} from 'React';
import App from './App';
import configureStore from './configureStore'
import {Provider} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';


class Root extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            store: configureStore(),
        };
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App store={this.state.store} />
            </Provider>
        );
    }
}

export default Root;
