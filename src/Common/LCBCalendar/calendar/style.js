import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyle.calendarBackground, 
    },
    //每行七天日期样式
    week: {
      width:'100%',
      marginTop: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

