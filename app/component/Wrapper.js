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

import TraAssistant from './app/component/TraAssistant';
import Const from './app/util/Const';


export default class Wrapper extends Component<{}> {

    render() {
        return (
            <View style={{backgroundColor: Platform.OS === "ios" ? "#000" : Const.BACKGROUND_COLOR, flex: 1}}>
                <TraAssistant/>
            </View>
        );
    }
}


