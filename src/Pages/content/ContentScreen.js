import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class ContentScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Content Screen</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                    <Text>点我跳转到新页面</Text>
                </TouchableOpacity>
            </View>
        )
    }
}