import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import Svg from '../../SVGUri/Svg';
import PropTypes from 'prop-types';
import {
    numberKeys,
    lettersFirst,
    numberIdentity,
    carNumber
} from './keyConfig.js';
/**
 * keyboardType : 键盘样式
 * default (A-Z0-9);
 * carNumber:(A-Z 去掉IO,加上港澳学)
 * numeric(0-9);
 * identity or 其他(0-8X9)
 */


// const widthOne = 1.0 / PixelRatio.get();
const { width } = Dimensions.get('window');
var KEYBOARD_ITEM_HEIGHT = 42.5;
var KEYBOARD_ITEM_HEIGHT_NUMBER = 44;
// const DEFAULT_MARGIN = 3;
const DEFAULT_VERTICAL_MARGIN = 5;
const DEFAULT_HORIZONTAL_MARGIN = 2.25;
const DEFAULT_HORIZONTAL_MARGIN_NUMBER = 6;
export default class CarNumberKeyBoard extends React.Component {
    constructor() {
        super(...arguments);
    }
    static propTypes = {
        needUpperCase: PropTypes.bool,
        columnNumber: PropTypes.number,
        keyItemClick: PropTypes.func,
        upperCaseClick: PropTypes.func,
        keyDelete: PropTypes.func,
        onConfirm: PropTypes.func,
        keyboardType: PropTypes.string

    };
    static defaultProps = {
        needUpperCase: true,
        columnNumber: 10,
        showConfirm: true, // 确定按钮部分,
        keyboardType: 'default'
    };


    ItemClick = (item) => {
        if (item.type === 'UP') {
            // this.props.upperCaseClick && this.props.upperCaseClick();
            return;
        }
        if (item.type === 'DELETE') {
            this.props.keyDelete && this.props.keyDelete();
            return;
        }
        this.props.keyItemClick && this.props.keyItemClick(this.props.needUpperCase ? item.capitalValue : item.value);
    };

    /**
     * 字母
     */
    _renderCharacters = () => {
        let lettersFirstViews = [];
        let lettersKeys = this.props.keyboardType === 'carNumber' ? carNumber : lettersFirst;
        let itemWidth = (width - DEFAULT_HORIZONTAL_MARGIN * this.props.columnNumber * 2) / this.props.columnNumber;
        lettersKeys.map((item, id) => {
            if (item.type) {
                lettersFirstViews.push(
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.itemStyle, { width: itemWidth * 1.5, backgroundColor: '#acb3be', flexDirection: 'row' }]}
                        key={id + ''}
                        onPress={() => this.ItemClick(item)}>
                        {item.svg ? <Svg title={item.svg} size={32} /> : null}
                    </TouchableOpacity>
                );

            } else {
                lettersFirstViews.push(
                    <TouchableOpacity
                        style={[styles.itemStyle, { width: itemWidth }]}
                        key={id + ''}
                        onPress={() => this.ItemClick(item)}>
                        <Text style={[styles.text, { fontWeight: '600' }]}>{this.props.needUpperCase ? item.capitalKey : item.key}</Text>
                    </TouchableOpacity>);
            }
        });
        return lettersFirstViews;
    };
    /**
     * 字母数字（0-z) 
     */
    _renderNumbers = () => {
        let numberViews = [];
        let itemWidth = (width - DEFAULT_HORIZONTAL_MARGIN * this.props.columnNumber * 2) / this.props.columnNumber;
        numberKeys.map((item, id) => {
            if (item.key && item.value) {
                numberViews.push(
                    <TouchableOpacity
                        style={[styles.itemStyle, { width: itemWidth, marginBottom: DEFAULT_VERTICAL_MARGIN }]}
                        key={id + ''}
                        onPress={() => this.props.keyItemClick && this.props.keyItemClick(item.value)}>
                        <Text style={[styles.text, { fontWeight: '600' }]}>{item.key}</Text>
                    </TouchableOpacity>
                );
            }
        });
        return numberViews;
    };
    _renderTopButtonViews = () => {
        return (
            <View style={styles.topViewStyle}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.onConfirm && this.props.onConfirm()}>
                    <Text style={styles.confirmText}>完成</Text>
                </TouchableOpacity>
            </View>
        );
    };

    /**
     * 纯数字
     */
    _renderNumbericKeyboad = () => {
        let numbericKeys = this.props.keyboardType === 'numeric' ? numberKeys : numberIdentity;
        let numberViews = [];
        let itemWidth = (width - DEFAULT_HORIZONTAL_MARGIN_NUMBER * 3 * 2) / 3;
        let defaultStyle = {
            width: itemWidth,
            height: KEYBOARD_ITEM_HEIGHT_NUMBER,
            borderRadius: 5,
            marginBottom: DEFAULT_HORIZONTAL_MARGIN_NUMBER,
            marginHorizontal: DEFAULT_HORIZONTAL_MARGIN_NUMBER
        };
        numbericKeys.map((item, id) => {
            if (item.key && item.value) {
                numberViews.push(
                    <TouchableOpacity
                        style={[styles.itemStyle, defaultStyle]}
                        key={id + ''}
                        onPress={() => this.props.keyItemClick && this.props.keyItemClick(item.value)}>
                        <Text style={[styles.text, { fontSize: 25 }]}>{item.key}</Text>
                    </TouchableOpacity>
                );
            } else {
                numberViews.push(
                    <View
                        style={[styles.itemStyle, defaultStyle, { backgroundColor: '#0000' }]}
                        key={id + ''}></View>
                );
            }

        });
        numberViews.push(
            <TouchableOpacity
                key='numberic'
                style={[styles.itemStyle, defaultStyle, { backgroundColor: '#0000' }]}
                onPress={() => this.props.keyDelete && this.props.keyDelete()}>
                <Svg title='key_delete' size={32} />
            </TouchableOpacity>
        );
        return numberViews;

    };
    _renderKeyBoard = () => {

        if (this.props.keyboardType === 'default' || this.props.keyboardType === 'carNumber') {
            return (
                <View style={styles.keyboardView}>
                    <View style={[styles.letterStyle, { marginTop: DEFAULT_VERTICAL_MARGIN * 2 }]}>{this._renderNumbers()}</View>
                    <View style={styles.letterStyle}>{this._renderCharacters()}</View>
                </View>);
        }

        return (
            <View style={styles.keyboardView}>
                <View style={[styles.letterStyle,
                    {
                        justifyContent: 'space-between',
                        marginTop: DEFAULT_HORIZONTAL_MARGIN_NUMBER
                    }]}>{this._renderNumbericKeyboad()}</View>
            </View>);




    };
    render() {
        return (<View style={[styles.mainView, this.props.keyboardViewStyle]}>
            {this.props.showConfirm && this._renderTopButtonViews()}
            {this._renderKeyBoard()}
        </View>);
    }
}
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'column',
        backgroundColor: '#d1d4d9',
        position: 'absolute',
        flex: 1,
        left: 0,
        bottom: 0,
        padding: 0,
        margin: 0
    },
    keyboardView: {
        flexDirection: 'column',
        paddingBottom: DEFAULT_VERTICAL_MARGIN
    },
    itemStyle: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: KEYBOARD_ITEM_HEIGHT,
        // marginVertical: DEFAULT_VERTICAL_MARGIN,
        marginBottom: DEFAULT_VERTICAL_MARGIN * 2,
        marginHorizontal: DEFAULT_HORIZONTAL_MARGIN
    },
    letterStyle: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 0,
        padding: 0
    },

    topViewStyle: {
        flexDirection: 'row',
        width: width,
        height: 40,
        backgroundColor: '#f0f1f4',
        borderTopWidth: 1,
        borderTopColor: '#d7d7dc',
        justifyContent: 'flex-end'

    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 30,
        height: 40
    },
    confirmText: {
        color: '#0075ff',
        fontSize: 15,
        textAlign: 'center'
    },
    text: {
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    }
});
