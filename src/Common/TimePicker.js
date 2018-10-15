import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated, Text, View, Picker, StyleSheet, TouchableHighlight, PixelRatio, Platform,
  TouchableOpacity
} from 'react-native';
import LCBPicker from './Pickers/Picker';
import Svg from "../SVGUri/Svg";


const yearData = [new Date().getFullYear(),];
const monthData = [];

export default class TimePicker extends React.Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context);
  }

  state = {
    backgroundFade: new Animated.Value(0),  // Initial value for opacity: 0
    contentHeight: new Animated.Value(0),
    hours: [],
    minutes: [],
    selectedHour: 0,
    selectedMin: 0,
  }

  onHourChange = (selectedHour) => {
    this.setState({ selectedHour });
  }

  onMinChange = (selectedMin) => {
    this.setState({ selectedMin });
  }

  componentDidMount() {
    let fadeAnimation = Animated.timing(this.state.backgroundFade, { toValue: 0.75, duration: 250 })
    let heightAnimation = Animated.timing(this.state.contentHeight, { toValue: 260, duration: 250 })
    Animated.parallel([fadeAnimation, heightAnimation]).start((result) => {
      this.setState({
        hours: this.hourList(),
        minutes: this.minuteList(),
        selectedHour: this.props.selectedHour,
        selectedMin: this.props.selectedMin
      });
    });
  }

  getzf(num) {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }

  hourList = () => {
    let hourItems = []
    let start = this.props.startHour || 0;
    let end = this.props.endHour || 23;
    for (let i = start; i <= end; i++) {
      let value = this.getzf(i) + '时';
      if (Platform.OS == 'ios') {
        hourItems.push(<Picker.Item key={i} value={i} label={value} style={styles.pickerItem} />);
      } else {
        hourItems.push(<LCBPicker.Item key={i} value={i} style={styles.pickerItem}>{value}</LCBPicker.Item>);
      }
    }
    return hourItems;
  }

  minuteList = () => {
    let minuteItems = []
    for (let i = 0; i <= 55; i = i + 5) {
      let value = this.getzf(i) + '分';
      if (Platform.OS == 'ios') {
        minuteItems.push(<Picker.Item key={i} value={i} label={value} style={styles.pickerItem} />)
      } else {
        minuteItems.push(<LCBPicker.Item key={i} value={i} style={styles.pickerItem}>{value}</LCBPicker.Item>);
      }
    }
    return minuteItems;
  }

  render() {

    let pickerComponent = null;
    if (Platform.OS == 'ios') {
      pickerComponent =
        <View style={styles.pickerContainer}>
          <Picker style={styles.provincePicker} onValueChange={this.onHourChange} selectedValue={this.state.selectedHour}>
            {this.state.hours}
          </Picker>
          <Picker style={styles.cityPicker} onValueChange={this.onMinChange} selectedValue={this.state.selectedMin}>
            {this.state.minutes}
          </Picker>
        </View>
    } else {
      pickerComponent =
        <View style={styles.pickerContainer}>
          <LCBPicker style={{ flex: 1 }} onValueChange={this.onHourChange} selectedValue={this.state.selectedHour}>
            {this.state.hours}
          </LCBPicker>
          <LCBPicker style={{ flex: 1 }} onValueChange={this.onMinChange} selectedValue={this.state.selectedMin}>
            {this.state.minutes}
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
        }}>
          <TouchableOpacity style={{ width: '100%', height: '100%', }} onPress={() => {
            this.props.onCancel()
          }} activeOpacity={0.5} />
        </Animated.View>
        <Animated.View style={{
          width: '100%',
          height: this.state.contentHeight,
          backgroundColor: '#ffffff',
        }}>
          <View style={styles.toolbar}>
            <TouchableOpacity style={{ marginLeft: 15, paddingHorizontal: 15, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              this.props.onCancel()
            }} activeOpacity={1}>
              <Text style={styles.buttonTextStyle}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              onPress={this.props.onTitlePress} activeOpacity={1}>
              <Text style={styles.toolbarTitle}>{this.props.text}</Text>
              {this.props.children}
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 15, paddingHorizontal: 15, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              this.props.onConfirm(this.state.selectedHour, this.state.selectedMin)
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#f4f4f8'
  },
  buttonTextStyle: {
    color: '#fa5a4b',
    fontSize: 15,
  },
  toolbarTitle: {
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