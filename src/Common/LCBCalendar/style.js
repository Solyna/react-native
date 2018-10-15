import {Platform} from 'react-native';

export const foregroundColor = '#ffffff';
export const backgroundColor = '#f4f4f4';
export const separatorColor = '#e8e9ec';

export const processedColor = '#a7e0a3';
export const processingColor = '#ffce5c';
export const failedColor = 'rgba(246, 126, 126,1)';

export const textDefaultColor = '#333';
export const textColor = '#43515c';
export const textLinkColor = '#fa5a4b';//
export const textSecondaryColor = '#7a92a5';

export const textDayFontFamily = 'System';
export const textMonthFontFamily = 'System';
export const textDayHeaderFontFamily = 'System';

export const textDayFontSize = 18;//
export const textMonthFontSize = 18;//
export const textDayHeaderFontSize = 18;//

export const calendarBackground = foregroundColor;
export const textSectionTitleColor = '#b6c1cd';
export const selectedDayBackgroundColor = textLinkColor;
export const selectedDayTextColor = foregroundColor;
export const todayTextColor = textLinkColor;
export const dayTextColor = textDefaultColor;
export const textDisabledColor = '#ccc';//
export const dotColor = textLinkColor;
export const selectedDotColor = foregroundColor;
export const arrowColor = textLinkColor;
export const monthTextColor = textDefaultColor;
export const agendaDayTextColor = '#7a92a5';
export const agendaDayNumColor = '#7a92a5';
export const agendaTodayColor = textLinkColor;
export const agendaKnobColor = Platform.OS === 'ios' ? '#f2F4f5' : '#4ac4f7';
