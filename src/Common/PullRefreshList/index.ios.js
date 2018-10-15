import {
    Animated,
    FlatList,
    StyleSheet,
    UIManager,
    View
} from 'react-native';
import React, { Component } from 'react';

import LCBLoading from '../LCBLoading/Loading';
import { NotScalingText } from '../NotScalingText';
import PropTypes from 'prop-types';

export default class PullToRefreshListView extends Component {
    static propTypes = {
        /**
        * Refresh state set by parent to trigger refresh
        * @type {Boolean}
        */
        isRefreshing: PropTypes.bool.isRequired,
        disableRefresh: PropTypes.bool,
        /**
        * Pull Distance
        * @type {Integer}
        */
        pullHeight: PropTypes.number,
        /**
        * Callback after refresh event
        * @type {Function}
        */
        onRefresh: PropTypes.func.isRequired,
        /**
        * The content: ScrollView or ListView
        * @type {Object}
        */
        // contentView: PropTypes.object.isRequired,
        /**
        * Background color
        * @type {string}
        */
        backgroundColor: PropTypes.string,
        /**
        * Custom onScroll event
        * @type {Function}
        */
        onScroll: PropTypes.func
    };

    static defaultProps = {
        pullHeight: 80
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            // readyToRefresh: false,
            refreshHeight: new Animated.Value(0),
            scrollY: new Animated.Value(0)
        };
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentDidMount() {
        this.state.scrollY.addListener((value) => this.handleScroll(value));
    }

    componentWillUnmount() {
        if (this.props.disableRefresh) { return; }
        this.state.scrollY.removeAllListeners();
    }

    checkRefreshing = () => {
        setTimeout(() => {
            if (this.props.isRefreshing) {
                this.checkRefreshing();
            } else {
                this.listRef && this.listRef.scrollToOffset({ offset: 0, animated: true });
                this.readyToRefresh = false;
            }
        }, 300);
    };

    handleRelease() {
        if (this.props.disableRefresh) { return; }
        if (this.props.isRefreshing) {
            return;
        }
        if (this.readyToRefresh) {
            this.listRef && this.listRef.scrollToOffset({ offset: -this.props.pullHeight });
            this.props.onRefresh();
            this.checkRefreshing();
            this.readyToRefresh = false;
        }
    }

    handleScroll(pullDownDistance) {
        if (this.props.disableRefresh) { return; }
        if (this.props.isRefreshing) {
            return;
        }
        if (pullDownDistance.value < -this.props.pullHeight) {
            this.readyToRefresh = true;
        }
    }

    isScrolledToTop = () => {
        if (this.props.disableRefresh) { return; }
        if (this.state.scrollY._value === 0 && this.state.isScrollFree) {
            this.setState({ isScrollFree: false });
        }
    };

    renderHeader = () => {
        return (
            <View>
                <View style={{ height: this.props.pullHeight }}>
                    {!this.props.disableRefresh && (this.props.refreshView ||
                        <View style={[styles.loadingMainView, { flex: 1 }]}>
                            <LCBLoading size={30} />
                            <NotScalingText style={styles.loadingText}>{this.props.isRefreshing ? '更新中...' : '下拉刷新'}</NotScalingText>
                        </View>)
                    }
                </View>
                { this.props.ListHeaderComponent && this.props.ListHeaderComponent() }
            </View>
        );
    };

    render() {
        let event = Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        y: this.state.scrollY
                    }
                }
            }
        ]);

        return (
            <FlatList
                style={styles.scrollview}
                contentContainerStyle={{ marginTop: -this.props.pullHeight }}
                scrollEventThrottle={16}
                {...this.props}
                onRefresh={null}
                onScroll={event}
                onTouchEnd={() => { this.isScrolledToTop(); }}
                onScrollEndDrag={() => { this.isScrolledToTop(); }}
                onResponderRelease={this.handleRelease.bind(this)}
                ref={ref => this.listRef = ref}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1
    },
    loadingMainView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    loadingText: {
        marginLeft: 20,
        fontSize: 15,
        color: '#333'
    },
    fillParent: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
