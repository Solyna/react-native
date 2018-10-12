import React from 'react';
import { Image, View,StyleSheet } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/bgImage/banner.png')}/>  
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:180,
        position:'absolute',
        top:0,
    },
    image:{
        width:'100%',
        height:180,    
        opacity:0.5
    }
})