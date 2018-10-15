import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Dimensions } from 'react-native';

export class LCBGridView extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.getDimensions = this.getDimensions.bind(this);
        this.chunkArray = this.chunkArray.bind(this);
        this.state = this.getDimensions();
    }

    onLayout(e) {
        if (!this.props.staticWidth) {
            const { width } = e.nativeEvent.layout || {};

            this.setState({
                ...this.getDimensions(width),
            });
        }

    }

    getDimensions(lvWidth) {
        const { itemWidth, spacing, fixed, staticWidth } = this.props;
        const totalWidth = lvWidth || staticWidth || Dimensions.get('window').width;
        const itemTotalWidth = itemWidth + spacing;
        const availableWidth = totalWidth - spacing; // One spacing extra
        const itemsPerRow = Math.floor(availableWidth / itemTotalWidth);
        const containerWidth = availableWidth / itemsPerRow;

        return {
            itemWidth,
            spacing,
            itemsPerRow,
            containerWidth,
            fixed,
        };
    }

    renderRow(data, sectionId, rowId) {
        const { itemWidth, spacing, containerWidth, fixed } = this.state;

        const rowStyle = {
            flexDirection: 'row',
            paddingLeft: spacing,
            paddingBottom: spacing,
        };
        const columnStyle = {
            flexDirection: 'column',
            justifyContent: 'center',
            width: containerWidth,
            paddingRight: spacing,
        };
        let itemStyle = {};
        if (fixed) {
            itemStyle = {
                width: itemWidth,
                alignSelf: 'center',
            };
        }

        return (
            <View style={rowStyle}>
                {(data || []).map((item, i) => (
                    <View key={`${rowId}_${i}`} style={columnStyle}>
                        <View style={itemStyle}>
                            {this.props.renderItem(item, i,Number(rowId))}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    chunkArray(array, size) {
        return array.reduce((acc, val) => {
            if (acc.length === 0) acc.push([]);
            const last = acc[acc.length - 1];
            if (last.length < size) {
                last.push(val);
            } else {
                acc.push([val]);
            }
            return acc;
        }, []);
    }

    render() {
        const { items, style, renderItem, spacing, fixed, itemWidth, ...props } = this.props;
        const { itemsPerRow } = this.state;

        const rows = this.chunkArray(items, itemsPerRow);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (
            <ListView
                alwaysBounceHorizontal={false} alwaysBounceVertical={false}
                style={[{ paddingTop: spacing }, style]}
                onLayout={this.onLayout}
                dataSource={ds.cloneWithRows(rows)}
                renderRow={this.renderRow}
                {...props}
            />
        );
    }
}

LCBGridView.propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    itemWidth: PropTypes.number,
    fixed: PropTypes.bool,
    spacing: PropTypes.number,
    staticWidth: PropTypes.number
};

LCBGridView.defaultProps = {
    fixed: false,
    itemWidth: 120,
    spacing: 0,
    style: {},
    staticWidth: undefined
};
