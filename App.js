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
    DeviceEventEmitter,
} from 'react-native';
import TraAssistant from './app/component/TraAssistant';
import Const from './app/util/Const'

export default class App extends Component<{}> {

    componentDidMount() {
        // NativeModules.RNMessageModule.handlerMessage('1');
        NativeModules.RNMessageModule.handlerCallback('send to android function', (msg) => {
            console.log('handlerCallback:' + msg);
        });
        DeviceEventEmitter.addListener("AndroidToRNMessage", this._handleAndroidMessage)
        this._testPromise();
    }

    _handleAndroidMessage(message) {
        console.log(message)
    }

    _testPromise() {
        NativeModules.RNMessageModule.handlerPromise('Pormise')
            .then((msg) => {
                console.log('handlerPromise:' + msg);
            }).catch((err) => {
            console.log('err:' + err);
        });
    }

    render() {
        return (
            <View style={{backgroundColor: Platform.OS === "ios" ? "#000" : Const.BACKGROUND_COLOR, flex: 1}}>
                <TraAssistant/>
            </View>
        );
    }
}




