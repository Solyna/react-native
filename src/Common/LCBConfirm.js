import React from 'react';
import {
    View, 
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import {NotScalingText} from './NotScalingText';
export default function LCBConfirm(props){
    return (
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
            <View style={{ position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black', opacity: 0.5}}/>
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                elevation: 999,
                alignItems: 'center',
                zIndex: 10000,
                top: props.pos
            }}>
                {/* 窗体*/}
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    borderWidth: 1.0 / PixelRatio.get(),
                    borderColor: '#ddd',
                    width: 270,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* 标题*/}
                    {props.title ?
                        <View style={{
                            width: '100%',
                            paddingTop: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <NotScalingText style={{fontSize: 16, color: '#666', fontWeight: 'bold'}}>{props.title}</NotScalingText>
                        </View> : null}
                    {/* 内容区*/}
                    <View style={[{
                        width: '100%',
                        paddingTop: 15,
                        paddingBottom: 10,
                        paddingLeft: 25,
                        paddingRight: 25,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }, props.contentStyle ? props.contentStyle : {}]}>
                        <NotScalingText style={[{fontSize: 15, textAlign: 'left', color: '#333'}, props.contentTextStyle ? props.contentTextStyle : {}]}>{props.content}</NotScalingText>
                    </View>
                    {/* 按钮*/}
                    <View style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 5}}>
                        <TouchableOpacity
                            style={[{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 8,
                                borderWidth: 1.0 / PixelRatio.get(), borderColor: '#e1e1e1'}, props.cancelBtnStyle]}
                            onPress={() => {props.onCancel();}} activeOpacity={1}>
                            <NotScalingText style={[{fontSize: 16, color: '#fa5a4b'}, props.cancelTextStyle]}>{props.cancel}</NotScalingText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 8,
                                borderWidth: 1.0 / PixelRatio.get(), borderColor: '#e1e1e1', borderLeftWidth: 0}, props.confirmBtnStyle]}
                            onPress={() => {props.onConfirm();}} activeOpacity={1}>
                            <NotScalingText style={[{fontSize: 16, color: '#fa5a4b'}, props.confimTextStyle]}>{props.confirm}</NotScalingText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>);
}
