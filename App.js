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
} from 'react-native';

import TraAssistant from './app/component/TraAssistant';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

    componentDidMount() {
        // NativeModules.RNMessageModule.handlerMessage('1');
    }

    render() {
        return (
            <View style={{backgroundColor: Platform.OS === "ios" ? "#000" : "#3587ff", flex: 1}}>
                <TraAssistant/>
            </View>
        );
    }
}


