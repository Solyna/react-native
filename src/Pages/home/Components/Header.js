import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 20, backgroundColor: '#0000' }}></View>
            <View style={{ height: 40, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                <Image source={require('../../../assets/icon/3g.png')} style={styles.image} />
                <Text style={{ fontSize: 16, color: '#333' }}>today news</Text>
                <Image source={require('../../../assets/icon/shousuo.png')} style={styles.image} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 64,
        backgroundColor: '#0000',
        flexDirection: 'column',
    },
    image: {
        width: 15,
        height: 15,

    }
})