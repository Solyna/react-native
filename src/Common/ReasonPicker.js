import React from 'react';
import { Animated, Text, View, Picker, StyleSheet, TouchableHighlight, PixelRatio, Platform } from 'react-native';
import LCBPicker from './Pickers/Picker';
import { CancelReason } from "../LCBConst/LCBOrderConst";


export default class ReasonPicker extends React.Component {
    static propTypes = {}

    constructor(props, context) {
        super(props, context);

    }

    state = {
        backgroundFade: new Animated.Value(0),  // Initial value for opacity: 0
        contentHeight: new Animated.Value(0),
        selectedReason: this.props.selectedReason,
    }

    onReasonChange = (selectedReason) => {
        this.setState({
            selectedReason: selectedReason,
        });
    }

    componentDidMount() {
        Animated.timing(
            this.state.backgroundFade,
            {
                toValue: 0.5,
                duration: 500,
            }
        ).start();

        Animated.timing(
            this.state.contentHeight,
            {
                toValue: 260,
                duration: 500,
            }
        ).start();
    }

    render() {

        let pickerComponent = null;
        let getList = () => {
            let res = [];
         for (let i = 1; i <= Object.keys(CancelReason[this.props.module]).length; i++) {
                if (Platform.OS == 'ios') {
                    res.push(<Picker.Item key={i} value={i} label={CancelReason[this.props.module][i]}
                        style={styles.pickerItem} />)
                }
                else {
                    res.push(<LCBPicker.Item key={i} value={i}
                        style={styles.pickerItem}>{CancelReason[this.props.module][i]}</LCBPicker.Item>);
                }
            }
            return res
        }

        if (Platform.OS == 'ios') {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <Picker style={styles.reasonPicker} onValueChange={this.onReasonChange}
                        selectedValue={this.state.selectedReason} itemStyle={styles.pickerItem}>
                        {getList()}
                    </Picker>
                </View>
        } else {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onReasonChange}
                        selectedValue={this.state.selectedReason} itemStyle={styles.pickerItem}>
                        {
                            getList()
                        }
                    </LCBPicker>
                </View>
        }

        return (
            <View style={styles.container}>
                <Animated.View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: this.state.backgroundFade
                }} />
                <Animated.View style={{
                    width: '100%',
                    height: this.state.contentHeight,
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 1. / PixelRatio.get()
                }}>
                    <View style={styles.toolbar}>
                        <TouchableHighlight style={{ marginLeft: 15 }} onPress={() => {
                            this.props.onCancel()
                        }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>取消</Text>
                        </TouchableHighlight>
                        <Text style={styles.toolbarTitle}>取消原因</Text>
                        <TouchableHighlight style={{ marginRight: 15 }} onPress={() => {
                            this.props.onConfirm(this.state.selectedReason)
                        }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>确定</Text>
                        </TouchableHighlight>
                    </View>
                    {pickerComponent}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column-reverse'
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#f4f4f8'
    },
    buttonTextStyle: {
        color: '#fa5a4b'
    },
    toolbarTitle: {
        flex: 1,
        color: '#333333',
        textAlign: 'center'
    },
    pickerContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    reasonPicker: {
        width: '100%',
        height: '100%'
    },
    pickerItem: {
        marginTop: 5,
        fontSize: 15,
        color: '#333',
        marginBottom: 5,
    }
});