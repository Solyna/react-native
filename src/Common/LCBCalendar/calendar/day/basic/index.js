import React, { Component } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { NotScalingText } from '../../../../../LCBComponent/NotScalingText';

import styleConstructor from './style';

class Day extends Component {
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    const changed = ['state', 'children', 'marking', 'onPress'].reduce((prev, next) => {
      if (prev) {
        return prev;
      } else if (nextProps[next] !== this.props[next]) {
        return next;
      }
      return prev;
    }, false);
    if (changed === 'marking') {
      let markingChanged = false;
      if (this.props.marking && nextProps.marking) {
        markingChanged = (!(
          this.props.marking.marked === nextProps.marking.marked
          && this.props.marking.selected === nextProps.marking.selected
          && this.props.marking.dotColor === nextProps.marking.dotColor
          && this.props.marking.disabled === nextProps.marking.disabled));
      } else {
        markingChanged = true;
      }
      // console.log('marking changed', markingChanged);
      return markingChanged;
    } else {
      // console.log('changed', changed);
      return !!changed;
    }
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }
    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
    let dot;
    if (marking.marked) {
      dotStyle.push(this.style.visibleDot);
      if (marking.dotColor) {
        dotStyle.push({ backgroundColor: marking.dotColor });
      }
      dot = (<View style={dotStyle} />);
    }

    if (marking.selected) {
      containerStyle.push(this.style.selected);
      if (marking.selectedColor) {
        containerStyle.push({ backgroundColor: marking.selectedColor });
      }
      dotStyle.push(this.style.selectedDot);
      if (!((/^[1-9][0-9]?$/).test(this.props.children))) {
        textStyle.push(this.style.selectedSpecialText);
      }
      textStyle.push(this.style.selectedText);

    } else if (isDisabled) {
      if (!((/^[1-9][0-9]?$/).test(this.props.children))) {
        textStyle.push(this.style.disabledSpecialText);
      }
      textStyle.push(this.style.disabledText);
    } else if (!((/^[1-9][0-9]?$/).test(this.props.children))) {
      textStyle.push(this.style.holidayText);
      if (this.props.children == '今天' || this.props.children == '明天' || this.props.children == '后天') {
        textStyle.push(this.style.specialText);
      }
    }

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onDayPress}
        activeOpacity={marking.activeOpacity}
        disabled={marking.disableTouchEvent}
      >
        <NotScalingText allowFontScaling={false} style={textStyle}>{String(this.props.children)}</NotScalingText>
        {dot}
      </TouchableOpacity>
    );
  }
}

export default Day;
