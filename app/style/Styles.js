import React, {Component} from 'react'
import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({

    itemImage: {
        width: 100,
        height: 120,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6435c9',
        margin: 6,
        padding: 10,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '300',
        color: '#6435c9',
        paddingTop: 10,
        paddingBottom: 10,
    },

    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-end',
        backgroundColor: '#a5aCFF',
        // padding: 3,
        // marginTop: 20,
        borderWidth: 1,
        // borderColor: '#eae311',
        // borderRadius: 15,
        shadowColor: '#23a921',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 1, width: 0
        }


    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    btnStyle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export {styles as default}