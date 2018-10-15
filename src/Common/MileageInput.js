import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native'
import Svg from "../SVGUri/Svg"

export default class extends React.PureComponent {
  static defaultProps = {
    value: '',
    disabled: false,
    inputStyle: {},
    unitStyle: {},
    placeholder: '公里数',
    onChangeText: () => { },
    onSubmitEditing: () => { },
  }
  render() {
    const props = this.props
    return (
      <View style={styles.wrapper}>
        <TextInput
          ref={props.inputRef}
          editable={!props.disabled} selectTextOnFocus={!props.disabled}
          underlineColorAndroid="#fff"
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={6}
          placeholder={props.placeholder}
          placeholderTextColor="#ccc"
          style={[styles.input, props.inputStyle]}
          defaultValue={props.value}
          onBlur={() => Keyboard.dismiss()}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmit}
        />
        <Text allowFontScaling={false} style={[styles.unit, props.unitStyle]}>km</Text>
        {/*无方案时不修改*/}
        {!props.disabled&&<Svg title="icon_edit" size={13} style={{ marginLeft: 9 }} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 50,
    color: '#666',
    fontSize: 13,
    padding: 0,
  },
  unit: {
    color: '#999',
    fontSize: 12,
    marginLeft: 3,
  },
})
