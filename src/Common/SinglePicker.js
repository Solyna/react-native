import React from 'react';
import { Animated, Text, View, Picker, StyleSheet, TouchableOpacity, PixelRatio, Platform } from 'react-native';
import PropTypes from 'prop-types';
import LCBPicker from './Pickers/Picker';

export default class SinglePicker extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        keywords: PropTypes.array,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string,
        title: PropTypes.string,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func
    };
    static defaultProps = {
        itemData: [],
        confirmText: '确定',
        cancelText: '取消',
        title: '标题'
    };

    state = {
        backgroundFade: new Animated.Value(0),
        contentHeight: new Animated.Value(0),
        selectedItemIndex: this.props.selectedItemIndex || 0,
        itemData: this.props.itemData
    };
    startAnimation() {
        Animated.timing(
            this.state.backgroundFade,
            {
                toValue: 0.5,
                duration: 500
            }
        ).start();

        Animated.timing(
            this.state.contentHeight,
            {
                toValue: 260,
                duration: 500
            }
        ).start();
    }

    componentDidMount() {
        this.mounted = true;
        this.mounted && this.startAnimation();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onItemChange = (selectedItemIndex) => {
        this.setState({
            selectedItemIndex: selectedItemIndex
        });
    };

    getLabelName = (data) => {
        let labelText = '';
        this.props.keywords.map((keyword) => {
            labelText += ' ' + data[keyword];
        });
        return labelText;

    };

    renderPickerComponent = () => {
        let pickerComponent = null;
        let itemData = this.props.itemData;

        let getList = () => {
            let res = [];
            for (let i = 0; i < itemData.length; i++) {
                let labelText = this.props.keywords ? this.getLabelName(itemData[i]) : itemData[i];
                if (Platform.OS == 'ios') {
                    res.push(<Picker.Item key={i} value={i} label={labelText}
                        style={styles.pickerItem} />);
                }
                else {
                    res.push(<LCBPicker.Item key={i} value={i}
                        style={styles.pickerItem}>{labelText}</LCBPicker.Item>);
                }
            }
            return res;
        };

        if (Platform.OS == 'ios') {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <Picker style={styles.reasonPicker} onValueChange={this.onItemChange}
                        selectedValue={this.state.selectedItemIndex} itemStyle={styles.pickerItem}>
                        {getList()}
                    </Picker>
                </View>;
        } else {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onItemChange}
                        selectedValue={this.state.selectedItemIndex} itemStyle={styles.pickerItem}>
                        {
                            getList()
                        }
                    </LCBPicker>
                </View>;
        }
        return pickerComponent;

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0000'
                }} />
                <Animated.View style={{
                    width: '100%',
                    height: this.state.contentHeight,
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 1.0 / PixelRatio.get()
                }}>
                    <View style={styles.toolbar}>
                        <TouchableOpacity
                            style={[styles.toolbarView, {justifyContent: 'flex-start'}]}
                            onPress={() => { this.props.onCancel && this.props.onCancel(); }}
                            activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>{this.props.cancelText}</Text>
                        </TouchableOpacity>
                        <Text style={styles.toolbarTitle}>{this.props.title}</Text>
                        <TouchableOpacity
                            style={[styles.toolbarView, {justifyContent: 'flex-end'}]}
                            onPress={() => { this.props.onConfirm && this.props.onConfirm(this.state.selectedItemIndex); }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>{this.props.confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderPickerComponent()}
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:
            'column-reverse'
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#f4f4f8',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    buttonTextStyle: {
        color: '#fa5a4b'
    },
    toolbarTitle: {
        flex: 1,
        color: '#333333',
        textAlign: 'center'
    },
    toolbarView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
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
        marginBottom: 5
    }
});
