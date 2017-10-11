"use strict";
import React, {Component} from 'react';
import {Dimensions} from 'react-native';


const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

class Utils extends Component {


    static px2dp(px) {
        return px * deviceW / basePx;
    }

    static dp2px(dp) {
        return dp * basePx / deviceW;
    }


    static get(url, callback) {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                callback(json);
            })
            .catch(err => {
                console.log(err);
            }).done();
    }

    static postFrom(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //这里我参数只有一个data,大家可以还有更多的参数
            body: 'data=' + data + ''
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }

    static postJson(url, params, callback) {
        let fetchOpt = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                //json形式
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        fetch(url, fetchOpt)
            .then((response) => response.json())
            .then((json) => {
                callback(json)
            })
            .catch((err) => {
                console.log(err);
            }).done();
    }
}

export {Utils as default}