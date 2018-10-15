import React from 'react';
import { Image, View } from 'react-native';
import { NotScalingText } from './NotScalingText';

export default () => (
    <View style={styles.container}>
        <Image style={styles.image} source={require('./Assets/network.png')} />
        <NotScalingText style={styles.text}>网络出错啦，请点击重试</NotScalingText>
    </View>
);

const styles = {
    container: {
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        color: '#999',
        fontSize: 15,
        marginTop: 20
    }
};
