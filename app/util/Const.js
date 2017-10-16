"use strict";
import React, {Component} from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';

const isIos = Platform.OS === 'ios';
export default class Const extends Component {


    static TITLE_BAR_BG_COLOR = '#3587ff';
    static PAGE_BG_COLOR = '#e9f3ff';
    static BAR_HEIGHT = Platform.OS === 'ios' ? 60 : 40;

    static ROOT_ADDRESS_DEV = 'http://172.16.8.111:8082';
    static ROOT_ADDRESS_TEST = '';
    static ROOT_ADDRESS_RELEASE = '';

    static HTTP_LOGIN_URL = '/cig_DataInterface_web/interface/indexController/userLogin';
    static HTTP_MOVIE_URL = isIos ? 'https://api.douban.com/v2/movie/top250'
        : 'http://api.douban.com/v2/movie/top250';

    static applyTouch(obj) {
        const {viewLayout, onPress,touchStyle} = obj;
        if (Platform.OS === 'ios') {
            return (<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={touchStyle}>
                {viewLayout}
            </TouchableOpacity>);
        } else {
            return <TouchableNativeFeedback activeOpacity={0.9} onPress={onPress} style={touchStyle}>
                {viewLayout}
            </TouchableNativeFeedback>
        }
    }

}

