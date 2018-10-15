import {
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import React from 'react';

export default (props) => (
    <TouchableOpacity
        style={styles.wrapper}
        onPress={props.onPress}><Image style={styles.image} source={require('../Assets/owl.jpg')}></Image></TouchableOpacity>
);

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 100,
        borderWidth: 1,
        borderColor: 'red'
    },
    image: {
        width: 50,
        height: 50
    }
});
