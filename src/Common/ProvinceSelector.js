import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal,
    PixelRatio
} from 'react-native';
import { LCBGridView } from './LCBGridView';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');
const itemWidth = width * 0.125;
const itemHeight = 56;
const modalContainerHeight = itemHeight * 4 + 10;

const items = [{ name: '京' }, { name: '沪' }, { name: '浙' }, { name: '苏' }, { name: '粤' }, { name: '鲁' }, { name: '晋' }, { name: '冀' },
    { name: '豫' }, { name: '川' }, { name: '渝' }, { name: '辽' }, { name: '吉' }, { name: '黑' }, { name: '皖' }, { name: '鄂' },
    { name: '湘' }, { name: '赣' }, { name: '闽' }, { name: '陕' }, { name: '甘' }, { name: '宁' }, { name: '蒙' }, { name: '津' },
    { name: '贵' }, { name: '云' }, { name: '桂' }, { name: '琼' }, { name: '青' }, { name: '新' }, { name: '藏' }, { name: '台' }];
export default class ProvinceSelector extends React.PureComponent {
    static propTypes = {
        isTransparent: PropTypes.bool,
        visible: PropTypes.bool,
        province: PropTypes.string,
        hideInBlank: PropTypes.bool
    };
    static defaultProps = {
        isTransparent: true,
        visible: false,
        province: '沪',
        hideInBlank: true// 点击空白区域关闭
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (!this.props.visible)
            return <View />;
        return (
            <Modal
                visible={this.props.visible}
                transparent={this.props.isTransparent}
                animationType={'slide'}
                onRequestClose={() => this.props.onClose()}>
                <View style={styles.sliderContainer}>
                    <TouchableOpacity style={[styles.viewTouchStyle, { backgroundColor: this.props.backgroundColor || '#0000' }]} activeOpacity={1} onPress={() => this.props.hideInBlank && this.props.onClose()} />
                    <LCBGridView style={styles.modalStyle}
                        itemWidth={itemWidth}
                        items={items}
                        renderItem={item => (
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.onItemPress(item.name); }} activeOpacity={1}>
                                <View
                                    style={[styles.itemView, this.props.province == item.name ? styles.selectItem : styles.unelectItem]}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    sliderContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0000',
        flexDirection: 'column'
    },
    viewTouchStyle: {
        width: '100%',
        height: height - modalContainerHeight
    },
    modalStyle: {
        width: '100%',
        backgroundColor: '#eaebec',
        height: modalContainerHeight,
        paddingTop: 10

    },
    item: {
        backgroundColor: '#0000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 5,
        width: '100%',
        height: itemHeight
    },
    itemView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderBottomWidth: 1.0 / PixelRatio.get()
    },
    selectItem: {
        backgroundColor: '#a7a7a7',
        borderBottomColor: '#7f7f80'
    },
    unelectItem: {
        borderBottomColor: '#b8babb',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center'

    }
});
