"use strict";
import React, {Component} from 'react';
import {Platform} from 'react-native';

const isIos = Platform.OS === 'ios';
export default class Const extends Component {

    static BACKGROUND_COLOR = '#3587ff';

    static ROOT_ADDRESS_DEV = 'http://172.16.8.111:8082';
    static ROOT_ADDRESS_TEST = '';
    static ROOT_ADDRESS_RELEASE = '';

    static HTTP_LOGIN_URL = '/cig_DataInterface_web/interface/indexController/userLogin';
    static HTTP_MOVIE_URL = isIos ? 'https://api.douban.com/v2/movie/top250'
        : 'http://api.douban.com/v2/movie/top250';

}

