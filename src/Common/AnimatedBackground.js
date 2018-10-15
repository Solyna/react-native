import React from 'react';
import { Animated,TouchableOpacity} from 'react-native';

export default class LCBAnimatedBackground extends React.Component {
    static propTypes = {
    }

    constructor(props, context) {
        super(props, context);

    }
    state = {
        backgroundFade: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(
            this.state.backgroundFade,
            {
                toValue: 0.5,
                duration: this.props.duration?this.props.duration:500,
            }
        ).start();
    }

    render() {

        return (
                <Animated.View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: this.state.backgroundFade
                }} >
                    <TouchableOpacity style={{position: 'absolute',
                        width: '100%',
                        height: '100%',}} onPress={this.props.onPress} activeOpacity={1}/>
                </Animated.View>
        );
    }
}