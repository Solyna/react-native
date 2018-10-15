import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View, Picker, StyleSheet, TouchableOpacity, PixelRatio, Platform } from 'react-native';
import LCBPicker from './Pickers/Picker';


const yearData=[new Date().getFullYear(),];
const monthData= [];

export default class DatePicker extends React.Component {
    static propTypes = {
    }

    constructor(props, context) {
        super(props, context);

    }
    state = {
        backgroundFade: new Animated.Value(0),  // Initial value for opacity: 0
        contentHeight: new Animated.Value(0),
        selectedYear: this.props.selectedYear,
        selectedMonth: this.props.selectedMonth,
    }

    onYearChange = (selectedYear) => {
        this.setState({
            selectedYear:selectedYear,
        });
    }

    onMonthChange = (selectedMonth) => {
        this.setState({
            selectedMonth: selectedMonth,
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
        let getList = (start,end,unit) => {
            let res = [];
            for (let i = start; i <= end ; i++) {
                if (Platform.OS == 'ios') {
                    res.push(<Picker.Item key={i} value={i} label={''+i+unit} style={styles.pickerItem} />)
                }
                else {
                    res.push(<LCBPicker.Item key={i} value={i} style={styles.pickerItem}>{''+i+unit}</LCBPicker.Item>);
                }
            }
            return res
        }

        if (Platform.OS == 'ios') {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <Picker style={styles.provincePicker} onValueChange={this.onYearChange} selectedValue={this.state.selectedYear}>
                        {getList(this.props.startYear || 1990,new Date().getFullYear(),'年',)}
                    </Picker>
                    <Picker style={styles.cityPicker} onValueChange={this.onMonthChange} selectedValue={this.state.selectedMonth}>
                        {
                            getList(1,12,'月')
                        }
                    </Picker>
                </View>
        } else {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onYearChange} selectedValue={this.state.selectedYear}>
                        {
                            getList(this.props.startYear || 1990,new Date().getFullYear(),'年')
                        }
                    </LCBPicker>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onMonthChange} selectedValue={this.state.selectedMonth}>
                        {
                            getList(1,12,'月')
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
                }} >
                    <TouchableOpacity style={{width: '100%', height: '100%',}} onPress={() => {
                        this.props.onCancel()
                    }} activeOpacity={0.5}/>
                </Animated.View>
                <Animated.View style={{
                    width: '100%',
                    height: this.state.contentHeight,
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 1. / PixelRatio.get()
                }}>
                    <View style={styles.toolbar}>
                        <TouchableOpacity style={{ marginLeft: 15 ,paddingHorizontal:15,}} onPress={() => { this.props.onCancel() }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>取消</Text>
                        </TouchableOpacity>
                        <Text style={styles.toolbarTitle}>选择时间</Text>
                        <TouchableOpacity style={{ marginRight: 15 ,paddingHorizontal:15,}} onPress={() => {
                            this.props.onConfirm(this.state.selectedYear, this.state.selectedMonth)
                        }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>确定</Text>
                        </TouchableOpacity>
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
    provincePicker: {
        width: '50%',
        height: '100%'
    },
    cityPicker: {
        width: '50%',
        height: '100%'
    },
    pickerItem: {
        fontSize: 14,
        color: 'red'
    }
});