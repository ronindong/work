/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Navigator,
} from 'react-native';
import Wrapper from "./app/component/Wrapper";
import StackNavigator from 'react-navigation'


export default class App extends Component<{}> {

    componentDidMount() {
        // NativeModules.RNMessageModule.handlerMessage('1');
    }

    render() {
        return (
            <StackNavigator
                initialRoute={{component: Wrapper}}
                configureScene={() => Navigator.SceneConfig}
            />
        );
    }
}


