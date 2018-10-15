import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

export class NotScalingText extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text {...this.props} allowFontScaling={false} style={ this.props.style }>{this.props.children}</Text>
        );
    }
}
