"use strict";
import React, {Component} from 'react';
import {
    View, Platform, Text, StyleSheet,
    Animated, TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import Const from '../util/Const'
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Ionicons';


export default class NavBar extends Component {

    static navBarHeight = Const.BAR_HEIGHT;
    static propTypes = {
        title: PropTypes.string.isRequired,
        leftIcon: PropTypes.string,
        leftText: PropTypes.string,
        rightIcon: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
        navStyle: PropTypes.object,
        titleStyle: PropTypes.object,
    };

    render() {
        return (
            <View style={[styles.navBarStyle, this.props.navStyle]}>
                {this.renderBtn('left')}
                <Animated.Text numberOfLines={1}
                               style={[styles.titleStyle, this.props.titleStyle]}>
                    {this.props.title}</Animated.Text>
                {this.renderBtn('right')}
            </View>
        );
    }

    renderBtn(pos) {
        let render = (obj) => {
            const {name, onPress} = obj;
            if (Platform.OS === 'ios') {
                return (<TouchableOpacity onPress={onPress} style={styles.btnStyle}>
                    <Icons name={name} size={20} color='#fff'/>
                </TouchableOpacity>);
            } else {
                return <TouchableNativeFeedback onPress={onPress} style={styles.btnStyle}>
                    <View style={{flexDirection: 'row'}}>
                        <Icons name={name} size={20} color='#fff'/>

                        <Text style={{color: '#fff', alignSelf: 'center', marginLeft: 10}}>
                            {this.props.leftText}</Text>
                    </View>
                </TouchableNativeFeedback>
            }
        };

        if (pos === 'left') {
            if (this.props.leftIcon) {
                return render({
                    name: this.props.leftIcon,
                    onPress: this.props.leftPress,
                });
            } else {
                return <View style={styles.btnStyle}/>
            }
        } else if (pos === 'right') {
            if (this.props.rightIcon) {
                return render({
                    name: this.props.rightIcon,
                    onPress: this.props.rightPress,
                });
            } else {
                return <View style={styles.btnStyle}/>
            }
        }
    }


}

const styles = StyleSheet.create({
    navBarStyle: {
        height: NavBar.navBarHeight,
        backgroundColor: Const.BACKGROUND_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        paddingHorizontal: 10,
    },
    btnStyle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },

});