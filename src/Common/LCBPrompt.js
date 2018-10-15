import React from 'react';
import {
    Text,
    View,TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    NativeModules,
    PixelRatio
} from 'react-native';
import {NotScalingText} from './NotScalingText';
import LCBAnimatedBackground from './LCBAnimatedBackground';
import Svg from "../SVGUri/Svg";
export default function LCBPrompt(props){
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
                {/*窗体*/}
                <View style={{
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
                        paddingTop:15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <NotScalingText style={{fontSize: 16, color: '#666',fontWeight:'bold'}}>{props.title}</NotScalingText>
                    </View>
                    {/*输入框*/}
                    <View style={{
                        width: '100%',
                        paddingTop:15,
                        paddingBottom:10,
                        paddingLeft:25,
                        paddingRight:25,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput style={{padding:4,marginBottom:5,color:'#333',textAlign:'left',width:'100%',fontSize:16,
                            borderRadius:5,borderWidth:1. / PixelRatio.get(),borderColor:'#e1e1e6'}}
                                   multiline={false} value={props.value}
                                   keyboardType={props.keyboardType} placeholder={props.hintText} underlineColorAndroid='transparent'
                                   placeholderTextColor='#ccc' maxLength={props.maxLength}
                                   onChangeText={props.onChangeText} onSubmitEditing={props.onSubmitEditing} returnKeyType='done'/>
                    </View>
                    {/*警告框*/}
                    {props.warn?<View style={{width:'100%',height:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Svg title={'info'} size={12} style={{marginRight: 2}} color={'#ffa028'}/>
                        <NotScalingText style={{color:'#ffa028',fontSize:12}}>{props.warnText}</NotScalingText>
                        </View>:null}
                    {/*按钮*/}
                    <View style={{width: '100%', height:40, alignItems: 'center', justifyContent: 'center',flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity
                        style={{width: '50%', height:'100%',alignItems: 'center', justifyContent: 'center',borderBottomLeftRadius:8,
                            borderWidth:1. / PixelRatio.get(),borderColor:'#e1e1e1'}}
                        onPress={() => {props.onCancel()}} activeOpacity={1}>
                        <NotScalingText style={{fontSize: 16, color: '#fa5a4b'}}>{props.cancel}</NotScalingText>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: '50%', height:'100%',alignItems: 'center', justifyContent: 'center',borderBottomRightRadius:8,
                                borderWidth:1. / PixelRatio.get(),borderColor:'#e1e1e1'}}
                            onPress={() => {props.onConfirm()}} activeOpacity={1}>
                            <NotScalingText style={{fontSize: 16, color: '#fa5a4b'}}>{props.confirm}</NotScalingText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>);
}