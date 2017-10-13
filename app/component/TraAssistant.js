"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    FlatList,
    SectionList,
    Image, TouchableOpacity,
    TouchableNativeFeedback,
    Text, ActivityIndicator,
    Button, TouchableHighlight,
    NativeModules, StatusBar,
    RefreshControl, Platform,
} from 'react-native'

import styles from '../style/Styles';
import Utils from '../util/utils';
import Const from '../util/Const';
import Icons from 'react-native-vector-icons/Ionicons';
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


    render() {
        let sections = [
            {
                title: {week: "今天周一", date: '10月13日'}, data: [
                {name: 'IOS', addrContent: '北京-天津', dateTime: '今天出发 周四返程'},
                {name: 'android', addrContent: '上海', dateTime: '今天出发 周四返程'},
                {name: 'IOS', addrContent: '北京-天津', dateTime: '今天出发 周四返程'},
                {name: 'IOS', addrContent: '北京-天津', dateTime: '今天出发 周四返程'},

            ]
            },
            {
                title: {week: "周二", date: '10月14日'},
                data: [{name: 'android', addrContent: '上海', dateTime: '今天出发 周四返程'},
                    {name: 'IOS', addrContent: '深圳-上海', dateTime: '今天出发 周四返程'},]
            },
            {
                title: {week: "周三", date: '10月15日'}, data: [
                {name: 'android', addrContent: '海南', dateTime: '今天出发 周四返程'},
                {name: 'IOS', addrContent: '南京', dateTime: '今天出发 周四返程'},
                {name: 'IOS', addrContent: '南京', dateTime: '今天出发 周四返程'},
                {name: 'IOS', addrContent: '南京', dateTime: '今天出发 周四返程'},
            ]
            },
            {
                title: {week: "周四", date: '10月16日'},
                data: [
                    {name: 'android', addrContent: '成都', dateTime: '今天出发 周四返程'},
                    {name: 'android', addrContent: '成都', dateTime: '今天出发 周四返程'},
                    {name: 'IOS', addrContent: '武汉', dateTime: '今天出发 周四返程'},
                    {name: 'android', addrContent: '成都', dateTime: '今天出发 周四返程'},
                ]
            },
        ];
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={Const.BACKGROUND_COLOR}
                    barStyle="light-content"
                />
                {/*           <NavBar
                    title={'行程小助手'}
                    leftIcon={'md-arrow-back'}
                leftPress={this.onBackFinish.bind(this)}/>*/}

                {this.state.loading ?
                    <View style={[styles.container, {flexDirection: 'row', justifyContent: 'center'}]}>
                        <ActivityIndicator style={{alignItems: 'center'}}
                                           size={50}/>
                        <Text style={{alignSelf: 'center'}}>加载中...</Text>
                    </View> :
                    this._renderSectionList(sections)

                }
            </View>
        );
    }

    _renderFlatList() {
        return (<FlatList
            refreshControl={<RefreshControl
                refreshing={false}
                onRefresh={this._onRefreshLoad}
            />}
            dataSource={this.state.dataList}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            renderFooter={this._renderFooter.bind(this)}
            onEndReached={this._onEndReached.bind(this)}/>);
    }


    _renderSectionListItem = (info) => {
        let {name, addrContent, dateTime} = info.item;
        return <View style={{backgroundColor: '#fff', flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', width: 100}}><Text
                style={{
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                    textAlignVertical: 'center',
                    backgroundColor: "#ffffff",
                    color: '#5C5C5C',
                    fontWeight: 'bold',
                    fontSize: 20
                }}>{name}</Text></View>


            <View style={{flex: 2}}>
                <Text
                    style={{
                        padding: 5,
                        textAlignVertical: 'center',
                        backgroundColor: "#ffffff",
                        color: '#5C5C5C',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>{addrContent}</Text>
                <Text
                    style={{
                        padding: 5,
                        textAlignVertical: 'center',
                        backgroundColor: "#ffffff",
                        color: '#b6b6b6',
                        fontSize: 14
                    }}>{dateTime}</Text>
            </View>
        </View>

    }

    _sectionComp(info) {

        let {week, date} = info.section.title;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                height: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#e9f3ff',
                padding: 10,
            }}>
                <View style={{flexDirection: 'row',}}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: Const.BACKGROUND_COLOR,
                            fontSize: 20
                        }}>{week}</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: Const.BACKGROUND_COLOR,
                            marginLeft: 10,
                            fontSize: 15
                        }}>{date}</Text>
                </View>
                <Icons style={{alignItems: 'flex-end'}}
                       name='md-add' size={30} color={Const.BACKGROUND_COLOR}/>
            </View>
        );
    }

    _renderAddBtn() {
        if (Platform.OS === 'ios') {
            return (<TouchableOpacity style={styles.btnStyle}>
                <Icons name={name} size={20} color='#fff'/>
            </TouchableOpacity>);
        } else {
            return <TouchableNativeFeedback style={styles.btnStyle}>
                <View style={{flexDirection: 'row'}}>
                    <Icons name={name} size={20} color='#fff'/>

                    <Text style={{color: '#fff', alignSelf: 'center', marginLeft: 10}}>
                        {this.props.leftText}</Text>
                </View>
            </TouchableNativeFeedback>
        }
    }


    _renderSectionList(sections) {
        return (<SectionList
            renderSectionHeader={this._sectionComp}
            renderItem={this._renderSectionListItem}
            sections={sections}
            stickySectionHeaderEnabled={true}


            ItemSeparatorComponent={() => <View style={{
                backgroundColor: '#e8e6f4',
                height: 1
            }}><Text/></View>}
            ListHeaderComponent={() =>
                <View/>
            }
            ListFooterComponent={() =>
                <View/>
            }/>);
    }

    _renderListView() {
        return (<ListView
            refreshControl={<RefreshControl
                refreshing={false}
                onRefresh={this._onRefreshLoad}
            />}
            dataSource={this.state.dataList}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            renderFooter={this._renderFooter.bind(this)}
            onEndReached={this._onEndReached.bind(this)}/>);

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
    _renderItem(info) {
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