"use strict";
import React, {Component} from 'react';
import {
    View, ListView, Image,
    Text, ActivityIndicator,
    Button, TouchableHighlight,
    NativeModules, StatusBar,
    RefreshControl, Platform,
} from 'react-native'

import styles from '../style/Styles';
import Utils from '../util/utils';
import Const from '../util/Const';
import NavBar from './NavBar';

let ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});
let isIOS = Platform.OS === 'ios';

class TraAssistant extends Component {

    constructor(props) {
        super(props);
        this.isFirst = false;
        this.state = {
            dataList: ds.cloneWithRows([]),
            loading: true,
            isShowBottomRefresh: false,
        };

    }

    componentDidMount() {
        Utils.get(Const.HTTP_MOVIE_URL, (result) => {
            this.setState({
                dataList: ds.cloneWithRows(result.subjects),
                loading: false,
            });
        });
    }

    onBackFinish(){

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={Const.BACKGROUND_COLOR}
                    barStyle="light-content"
                />
                <NavBar
                    title={'行程小助手'}
                    leftIcon={'md-arrow-back'}
                leftPress={this.onBackFinish.bind(this)}/>

                {this.state.loading ?
                    <View style={[styles.container, {flexDirection: 'row', justifyContent: 'center'}]}>
                        <ActivityIndicator style={{alignItems: 'center'}}
                                           size={50}/>
                        <Text style={{alignSelf: 'center'}}>加载中...</Text>
                    </View> :
                    <ListView
                        refreshControl={<RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefreshLoad}
                        />}
                        dataSource={this.state.dataList}
                        renderRow={this.renderItem.bind(this)}
                        enableEmptySections={true}
                        renderFooter={this._renderFooter.bind(this)}
                        onEndReached={this._onEndReached.bind(this)}/>
                }
            </View>
        );
    }

    _onRefreshLoad() {
        if (!isIOS) {
            NativeModules.RNMessageModule.handlerMessage('onRefreshLoad');
        }
    }

    _renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View style={[{flex: 1, flexDirection: 'row', justifyContent: 'center'}]}>
                <ActivityIndicator style={{alignItems: 'center'}}/>
                <Text style={{alignSelf: 'center'}}>加载中...</Text>
            </View>);
        }
        return <View style={{marginVertical: 10}}/>;
    }

    _onEndReached() {
        if (!isIOS) {
            NativeModules.RNMessageModule.handlerMessage('onEndReached');
        }

        if (this.isFirst) {
            if (!this.state.isShowBottomRefresh) {
                this.isFirst = false;
            }
            return;
        }
        this.isFirst = true;
        this.setState({
            isShowBottomRefresh: true,
        });

        setTimeout(() => {
            this.isFirst = false;
            this.setState({
                isShowBottomRefresh: false,
            });
        }, 3000)

    }


    //
    renderItem(info) {
        return (
            <TouchableHighlight
                activeOpacity={0.9}
                onPress={() => this._onPress}>
                <View style={[styles.item]}>
                    <View>
                        <Image style={styles.itemImage}
                               source={{uri: info.images.large}}/>
                    </View>
                    <View>
                        <Text style={styles.itemText}>
                            {info.title}
                        </Text>
                        <Text style={styles.itemText}>{info.year}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


}

export {TraAssistant as default};