"use strict";
import React, {Component} from 'react';
import {
    View, ListView, Image,
    Text, ActivityIndicator,
    Button, TouchableHighlight,
    NativeModules, StatusBar,
    RefreshControl,
} from 'react-native'

import styles from '../style/Styles';
import Utils from '../util/utils';

const HTTP_MOVIE_URL = 'http://api.douban.com/v2/movie/top250';
let ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
});

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
        Utils.get(HTTP_MOVIE_URL, (result) => {
            this.setState({
                dataList: ds.cloneWithRows(result.subjects),
                loading: false,
            });
        });
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={'#3587ff'}
                    barStyle="light-content"
                />
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
        NativeModules.RNMessageModule.handlerMessage('onRefreshLoad');
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
        NativeModules.RNMessageModule.handlerMessage('onEndReached');

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