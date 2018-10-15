import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    NativeModules,
    PixelRatio
} from 'react-native';
import {NotScalingText} from './NotScalingText';
import LCBAnimatedBackground from './LCBAnimatedBackground';
export default function LCBAlert(props){
    return (
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
            <View style={{ position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black',opacity:0.5}}/>
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                elevation: 999,
                alignItems: 'center',
                zIndex: 10000,
                top: props.pos,
            }}>
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    borderWidth: 1. / PixelRatio.get(),
                    borderColor: '#ddd',
                    width: 270,
                    height:100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        borderBottomWidth: 1. / PixelRatio.get(),
                        borderBottomColor: '#ddd',
                        height: '50%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 14, color: '#333'}}>{props.content}</Text>
                    </View>
                    <TouchableOpacity
                        style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => {props.onPress()}} activeOpacity={1}>
                        <Text style={{fontSize: 16, color: '#fa5a4b'}}>{props.sure}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>);
}