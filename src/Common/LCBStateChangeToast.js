import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
} from 'react-native'
import {PropTypes} from 'prop-types';

export const DURATION = {
    LENGTH_LONG: 2000,
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const {height, width} = Dimensions.get('window');

export default class LCBStateChangeToast extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isShow !== nextProps.isShow && nextProps.isShow) {
            this.show(nextProps.text);
        }
    }

    show(text, duration) {
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
            if (duration !== DURATION.FOREVER) this.close();
        });
    }

    close(duration) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

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
                this.props.close ? this.props.close() : null;
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
                pos = height / 2 - 100;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }

        const view = this.state.isShow ?
            <View
                style={[styles.container, {top: pos}]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[styles.content, {opacity: this.state.opacityValue}, this.props.style]}
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
        alignItems: 'center',
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

LCBStateChangeToast.propTypes = {
    isShow: PropTypes.bool,
    position: PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    text: PropTypes.string,
    duration: PropTypes.number,
}

LCBStateChangeToast.defaultProps = {
    isShow: false,
    textStyle: styles.text,
    position: 'center',
    text: '',
    fadeInDuration: 250,
    fadeOutDuration: 250,
    opacity: 0.8
}