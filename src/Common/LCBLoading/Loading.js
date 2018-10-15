import React from 'react'
import {
  View,
  Image,
  Animated,
  Easing,
} from 'react-native'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rotateValue: new Animated.Value(0)
    }
  }
  componentDidMount() {
    this.startAnimation()
  }
  startAnimation = () => {
    this.state.rotateValue.setValue(0)
    Animated.timing(this.state.rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(this.startAnimation)
  }
  render() {
    const size = this.props.size || 60
    return (
      <View style={{
        width: size,
        height: size,
      }}>
        <Image
          style={styles.logo}
          source={require('../Assets/logo.jpg')} />
        <Animated.Image
          source={require('../Assets/rotate.jpg')}
          style={[
            styles.rotate,
            {
              transform: [{
                rotateZ: this.state.rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }]
            }
          ]}></Animated.Image>
      </View>
    )
  }
}


const styles = {
  container: {
    width: 60,
    height: 60,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  rotate: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
}