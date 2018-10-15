import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../SVGUri/Svg';
import PropTypes from 'prop-types';

export default class CarNumberInput extends React.Component {
    constructor() {
        super(...arguments);
    }

    static propTypes = {
        count: PropTypes.number,
        text: PropTypes.string,
        isPlatNumber: PropTypes.bool,
        openProvince: PropTypes.func,
        showKeyboard: PropTypes.func
    };
    static defaultProps = {
        count: 6,
        text: '',
        isPlatNumber: true
    };

    _pressProvince = () => {
        this.props.openProvince && this.props.openProvince();
    };

    _renderItems = () => {
        let text = this.props.text;
        let items = [];
        if (this.props.isPlatNumber)
            items.push(<TouchableOpacity key='plateNumber' style={[styles.items, { borderLeftWidth: 0 }, this.props.itemStyles]} onPress={this._pressProvince}>
                <Text style={[styles.textStyle, { color: '#fa5a4b' }, this.props.textStyle]}>{this.props.currentProvince || '沪'}</Text>
                <Svg title='arrow-b' size={13} color='#fa5a4b' />
            </TouchableOpacity>);
        for (var i = 0; i < this.props.count; i++) {
            let content = text.substr(i, 1);
            items.push(<View key={i + ''} style={[styles.items, this.props.itemStyles]}>
                <Text style={[styles.textStyle, this.props.textStyle]}>{content}</Text>
            </View>);
        }
        return items;
    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.itemView}>
                    <TouchableOpacity onPress={() => this.props.showKeyboard && this.props.showKeyboard()} activeOpacity={1} style={styles.numberView}>
                        {this._renderItems()}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#0000'
    },
    itemView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        paddingVertical: 4,
        paddingHorizontal: 2,
        justifyContent: 'space-between',
        flex: 1,
        borderColor: '#fa5a4b',
        borderWidth: 1.0,
        borderRadius: 4
    },
    numberView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    items: {
        flex: 1,
        flexDirection: 'row',
        borderLeftColor: '#fa5a4b',
        borderLeftWidth: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    textStyle: {
        fontSize: 18,
        color: '#333',
        margin: 2
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8
    }
});
