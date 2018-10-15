import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { NotScalingText } from '../../LCBComponent/NotScalingText';
import Switch from 'react-native-switch-pro';

export default class CarNumberSwitch extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.left}>
                    <NotScalingText style={styles.label}>车牌号码</NotScalingText>
                </View>

                <View style={styles.right}>
                    <NotScalingText style={{fontSize: 13, color: '#666'}}>新能源车牌</NotScalingText>
                    <Switch style={styles.itemSwitch} value={this.props.isNewEnergy} width={45} height={25}
                        onSyncPress={(value) => {
                            this.props.toggleSwitch(value);
                        }} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        flexDirection: 'row',
        marginBottom: 15
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    right: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#333',
        fontSize: 15
    },
    itemSwitch: { marginLeft: 10 }
});
