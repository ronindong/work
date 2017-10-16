"use strict";

import React, {Component} from "react";
import {AppRegistry, Text, View, ScrollView, TouchableNativeFeedback, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../style/Styles';
import Utils from '../util/utils';
import Const from '../util/Const';
import Icons from 'react-native-vector-icons/Ionicons';

let _self;

class AddTravel extends Component {

    constructor(props) {
        super(props);
        _self = this;
    }


    static navigationOptions = {
        headerTitle: '新建行程',
        headerLeft:
            <TouchableNativeFeedback
                activeOpacity={0.2}
                onPress={() =>
                    _self.props.navigation.goBack()
                }>
                <Icons style={{paddingLeft: 10,}}
                       name='ios-arrow-back' size={30} color='#fff'/>
            </TouchableNativeFeedback>,

        headerRight: <TouchableNativeFeedback
            activeOpacity={0.2}
            onPress={() => {
                _self.props.navigation.goBack()
            }}>
            <Text style={{paddingRight: 10, color: '#fff', fontSize: 18}}>完成</Text>
        </TouchableNativeFeedback>,
    };


    render() {
        return (
            <View>
                <ScrollView style={styles.addTraContainer}>
                    <Item label='出发时间' placeHolder='出发时间'/>
                    <Item label='返程时间' placeHolder='返程时间'/>
                    <Item label='出行人' placeHolder='出行人'/>
                </ScrollView>
            </View>
        );
    }

}

class Item extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        label: PropTypes.string,
        placeHolder: PropTypes.string,

    };


    render() {
        return (
            <View style={{padding: 10, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', width: 100}}><Text
                        style={{
                            alignSelf: 'flex-start',
                            paddingLeft: 10,
                            textAlignVertical: 'center',
                            color: '#5C5C5C',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>{this.props.label}</Text></View>

                    <View style={{flex: 2}}>
                        <TextInput
                            placeholder={this.props.placeHolder}

                            style={{
                                padding: 5,
                                textAlignVertical: 'center',
                                color: '#5C5C5C',
                                fontWeight: 'bold',
                                fontSize: 18
                            }}/>
                    </View>
                </View>
            </View>
        );
    }
}


export {AddTravel as default};