import React from 'react';
import {
    Text,
    View, TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    NativeModules,
    PixelRatio, Dimensions
} from 'react-native';
import {NotScalingText} from './NotScalingText';
import LCBAnimatedBackground from './LCBAnimatedBackground';
import Svg from "../SVGUri/Svg";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const height = Dimensions.get('window').height;
export default function LCBOpenBrand(props) {
    return (
        <View style={{
            position: 'absolute', height: '100%', width: '100%', justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
            }}/>
            {/*窗体*/}
            <KeyboardAwareScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center',}}
                                     extraScrollHeight={100}>
                <View style={{
                    marginTop: height / 2 - 150,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    borderWidth: 1. / PixelRatio.get(),
                    borderColor: '#ddd',
                    width: 270,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/*标题*/}
                    <View style={{
                        width: '100%',
                        paddingTop: 30,
                        paddingLeft: 15,
                        paddingRight: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        <NotScalingText
                            style={{fontSize: 15, color: '#666',width:'67%',marginBottom:15}}>第一时间获得短信提醒开通即得
                            <NotScalingText style={{color: '#333',}}>{props.title}</NotScalingText>
                        </NotScalingText>
                        <Image source={{uri:'https://img06.lechebangstatic.com/paint/car/tipscfd4f642b6.png'}}
                        style={{position:'absolute',bottom:0,right:20,height:70,width:75,resizeMode:'cover'}}/>
                    </View>
                    {/*输入框*/}
                    <View style={{
                        width: '100%',
                        paddingBottom: props.warn?0:10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput style={{
                            padding: 10, marginBottom: 5, color: '#333', textAlign: 'left', width: '100%', fontSize: 16,
                            borderRadius: 5, borderWidth: 1. / PixelRatio.get(), borderColor: '#e1e1e6'
                        }}
                                   multiline={false} value={props.value} defaultValue={props.defaultValue}
                                   keyboardType={props.keyboardType} placeholder={props.hintText}
                                   underlineColorAndroid='transparent'
                                   placeholderTextColor='#ccc' maxLength={props.maxLength}
                                   onChangeText={props.onChangeText} onSubmitEditing={props.onSubmitEditing}
                                   returnKeyType='done'/>
                    </View>
                    {/*警告框*/}
                    {props.warn ? <View style={{
                        width: '100%',
                        height: 30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Svg title={'info'} size={12} style={{marginRight: 2}} color={'#ffa636'}/>
                        <NotScalingText style={{color: '#ffa636', fontSize: 12}}>{props.warnText}</NotScalingText>
                    </View> : null}
                    {/*按钮*/}
                    <View style={{
                        width: '100%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 5,
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottomLeftRadius: 8,
                                borderWidth: 1. / PixelRatio.get(),
                                borderColor: '#e1e1e1'
                            }}
                            onPress={() => {
                                props.onCancel()
                            }} activeOpacity={1}>
                            <NotScalingText style={{fontSize: 16, color: '#fa5a4b'}}>取消</NotScalingText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottomRightRadius: 8,
                                borderWidth: 1. / PixelRatio.get(),
                                borderColor: '#e1e1e1',
                                backgroundColor:'#fa5a4b'
                            }}
                            onPress={() => {
                                props.onConfirm()
                            }} activeOpacity={1}>
                            <NotScalingText style={{fontSize: 16, color: '#fff'}}>确定</NotScalingText>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>);
}