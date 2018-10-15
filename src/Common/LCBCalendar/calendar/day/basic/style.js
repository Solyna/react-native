import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.basic';

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    base: {
      width: 43,//千万不要改，改了数字对不齐
      height: 43,
      alignItems: 'center',
      justifyContent:'center',
    },
    text: {
      fontSize: 18,
      fontFamily: appStyle.textDayFontFamily,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 21.5
    },
    todayText: {
      color: appStyle.todayTextColor
    },//数字样式
    specialText:{
      fontSize:16,
      color:appStyle.todayTextColor
    },//今明后天 样式
    holidayText:{
      fontSize:16,
      color:appStyle.dayTextColor,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    selectedSpecialText:{
      fontSize:16,
      color: appStyle.selectedDayTextColor
    },//选中的今明后天 样式
    disabledText: {
      color: appStyle.textDisabledColor
    },
    disabledSpecialText:{
      fontSize:16,
      color: appStyle.textDisabledColor
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
