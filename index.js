"use strict";

import React, {Component} from "react";
import {AppRegistry, Text, View} from 'react-native';
import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import Const from './app/util/Const'
import AddTravel from "./app/component/AddTravel";
import App from './App';
import TraAssistant from "./app/component/TraAssistant";

console.ignoredYellowBox = ['Remote debugger'];

const work = StackNavigator({
        // Home: {screen: App},
        Home: {screen: TraAssistant},
        AddTravel: {screen: AddTravel}
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerTitle: '行程小助手',
            headerTitleStyle: {
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: Const.TITLE_BAR_BG_COLOR,
                height: Const.BAR_HEIGHT,
            },
        },
        mode: 'card'
    });


AppRegistry.registerComponent('work', () => work);
