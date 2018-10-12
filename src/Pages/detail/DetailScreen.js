import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class DetailsScreen extends Component {
/*     static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: '详情',
            //可以自定义某个页面的头部样式
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#fa5a4b',
        }
    } */
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <TouchableOpacity onPress={() => this.props.navigation.push('Details')}>
                    <Text>点我 再次 跳转到新页面</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>回家</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text>go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}