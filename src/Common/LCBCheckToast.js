import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native'

const ViewPropTypes = RNViewPropTypes || View.propTypes;
import {PropTypes} from 'prop-types';
export const DURATION = {
    LENGTH_LONG: 2000,
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

export const INPUT_TYPE = {
    EMPTY_OBJECT:-1,
    NULL:0,
    EMAIL:1,
    PHONE:2,
    MILEAGE:3,
    CAR_NUM:4,
    NAME:5,
    TAX_CODE:6,
}

const {height, width} = Dimensions.get('window');

export default class LCBCheckToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        }
    }

    show(type,testText,name,duration) {
        let reg;
        let text;
        switch (type){
            case INPUT_TYPE.EMPTY_OBJECT:
                text = name;
                if(testText){
                    return false;
                }
                break;
            case INPUT_TYPE.NULL:
                text = name+'不能为空!';
                if(testText){
                    return false;
                }
                break;
            case INPUT_TYPE.EMAIL:
                reg =/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                text = '请输入正确的邮箱!';
                if(reg.test(testText)||(testText==='')){
                    return false;
                }
                break;
            case INPUT_TYPE.PHONE:
                reg = /^[1][0-9]{10}$/;
                text = '请输入正确的手机号!';
                if(reg.test(testText)){
                    return false;
                }
                break;
            case INPUT_TYPE.MILEAGE:
                reg = /^[1-9][0-9]{0,5}$/;
                text = '请输入正确的里程数!';
                if(reg.test(testText)){
                    return false;
                }
                break;
            case INPUT_TYPE.CAR_NUM:
                reg = /^[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;
                text = '请输入正确的车牌号!';
                if(reg.test(testText)){
                    return false;
                }
                break;
            case INPUT_TYPE.NAME:
                reg = /^[\u4E00-\u9FA5]{2,30}$|^[A-Za-z]{2,30}$]/;
                text = '请输入长度为2-30位的名称';
                if(reg.test(testText)){
                    return false;
                }
                break;
            case INPUT_TYPE.TAX_CODE:
                reg = /(^[0-9a-zA-Z]{15}$)|(^[0-9a-zA-Z]{18}$)|(^[0-9a-zA-Z]{20}$)/;
                text = '请填写正确的公司税号';
                if(reg.test(testText)){
                    return false;
                }
                break;
            default :
        }
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;

        this.setState({
            isShow: true,
            text: text,
        });

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(() => {
            this.isShow = true;
            if(duration !== DURATION.FOREVER) this.close();
        });
        return true;
    }

    close( duration ) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if(delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, delay);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let pos;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = (height / 2)-100;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }

        const view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
                >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
    }
});

LCBCheckToast.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue:PropTypes.number,
    fadeInDuration:PropTypes.number,
    fadeOutDuration:PropTypes.number,
    opacity:PropTypes.number
}

LCBCheckToast.defaultProps = {
    position: 'center',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 250,
    fadeOutDuration: 250,
    opacity: 0.8
}