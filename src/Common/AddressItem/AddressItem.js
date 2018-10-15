import React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    PixelRatio, Image
} from 'react-native';
import {NotScalingText} from "../NotScalingText";

export default function AddressItem(props) {

    return (
        <TouchableOpacity style={styles.receiver_item} onPress={() => {
            props.onPress()
        }} activeOpacity={1}>
            <NotScalingText style={styles.receiver_startText}>{props.name}</NotScalingText>
            {props.haveAddress ?
                <View style={{flexDirection: 'column', flex: 5, marginRight: 20,paddingVertical:5}}>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 3
                    }}>
                        <NotScalingText style={{color: '#666', fontSize: 13, }}
                              numberOfLines={1}>{props.contacter}</NotScalingText>
                        <NotScalingText style={{marginLeft:15,color: '#666', fontSize: 13, }}
                              numberOfLines={1}>{props.mobile}</NotScalingText>
                    </View>
                    <NotScalingText style={{color: '#666', fontSize: 13, width: '100%'}}
                          numberOfLines={1}>{props.address} </NotScalingText>
                    {props.isCityNotSupport ?
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 3
                        }}>
                            <Image source={require('./Assets/881517884631_.pic.jpg')}
                                   style={{ width: 12, height: 12, marginRight: 4 }} />
                            <NotScalingText style={{ fontSize: 12, color: '#fa5a4b' }}>{props.notSupportText}</NotScalingText>
                        </View> :null
                    }
                </View> :
                <NotScalingText style={{
                    color: '#ccc',
                    fontSize: 13,
                    textAlign: 'left',
                    flex: 5,
                }}>添加地址</NotScalingText>
            }
            <View style={{
                position: 'absolute',
                right: 15,
                width: 8,
                height: 8,
                transform: [{rotate: '45deg'}, {translateX: 0}, {translateY: 0}],
                borderTopWidth: 2. / PixelRatio.get(),
                borderRightWidth: 2. / PixelRatio.get(),
                borderColor: '#c3c3c3',
            }}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    receiver_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 2. / PixelRatio.get(),
        paddingVertical: 10,
        paddingHorizontal:15,
        backgroundColor:'#fff',
    },
    receiver_startText: {
        flex: 3,
        color: '#191919',
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 8
    },
    receiver_inputText: {
        flex: 5,
        color: 'black',
        fontSize: 14
    }
});