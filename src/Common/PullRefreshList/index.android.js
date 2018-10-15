import {
    Animated,
    FlatList,
    PanResponder,
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
        onRefresh: PropTypes.func.isRequired
    };

    static defaultProps = {
        pullHeight: 80
    };

    constructor(props) {
        super(props);
        this.state = {
            isScrollFree: false,
            refreshHeight: new Animated.Value(0),
            scrollY: new Animated.Value(0)
        };
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderStart.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this)
        });
    }
    _handleStartShouldSetPanResponder() {
        return !this.state.isScrollFree;
    }

    _handleMoveShouldSetPanResponder(evt, gestureState) {
        return gestureState.dx != 0 && gestureState.dy != 0 && !this.state.isScrollFree;
    }

    _handlePanResponderStart() {
        if (this.props.disableRefresh) { return; }
        if (this.props.isRefreshing) {
            return;
        }
        this.disablePan = !!this.state.refreshHeight._value;
    }

    // if the content scroll value is at 0, we allow for a pull to refresh
    _handlePanResponderMove(e, gestureState) {
        if (this.props.disableRefresh) { return; }
        if (this.props.isRefreshing || this.disablePan) {
            return;
        }
        // console.log(gestureState.dy, this.state.scrollY._value);
        if (gestureState.dy >= 0 && this.state.scrollY._value === 0) {
            this.state.refreshHeight.setValue(gestureState.dy * .5);
        } else {
            // Native android scrolling
            this.listRef.scrollToOffset({ offset: -1 * gestureState.dy, animated: true });
        }
    }

    _handlePanResponderEnd() {
        if (this.props.disableRefresh) { return; }
        if (this.props.isRefreshing) {
            return;
        }
        if (this.state.refreshHeight._value > this.props.pullHeight) {
            this.props.onRefresh();
            Animated.spring(this.state.refreshHeight, {
                toValue: this.props.pullHeight
            }).start(() => {
                this.checkRefreshing();
            });
        } else if (this.state.refreshHeight._value) {
            Animated.timing(this.state.refreshHeight, {
                duration: 300,
                toValue: 0
            }).start();
        }
        if (this.state.scrollY._value > 0) {
            this.setState({ isScrollFree: true });
        }
    }

    checkRefreshing = () => {
        setTimeout(() => {
            if (this.props.isRefreshing) {
                this.checkRefreshing();
            } else {
                Animated.spring(this.state.refreshHeight, {
                    toValue: 0
                }).start();
            }
        }, 500);
    };

    isScrolledToTop = () => {
        if (this.props.disableRefresh) { return; }
        if (this.state.scrollY._value === 0 && this.state.isScrollFree) {
            this.setState({ isScrollFree: false });
        }
    };

    render() {
        let animateHeight = this.state.refreshHeight.interpolate({
            inputRange: [0, this.props.pullHeight],
            outputRange: [-this.props.pullHeight, 0]
        });

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
            <View style={[styles.scrollview, this.props.style]}>
                <Animated.View
                    style={[styles.fillParent, { marginTop: animateHeight }]}
                    {...this._panResponder.panHandlers}
                >
                    <View style={{ height: this.props.pullHeight }}>
                        {!this.props.disableRefresh && (this.props.refreshView ||
                            <View style={[styles.loadingMainView, { flex: 1 }]}>
                                <LCBLoading size={30} />
                                <NotScalingText style={styles.loadingText}>{ this.props.isRefreshing ? '更新中...' : '下拉刷新' }</NotScalingText>
                            </View>)
                        }
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        scrollEventThrottle={16}
                        {...this.props}
                        onRefresh={null}
                        scrollEnabled={this.state.isScrollFree}
                        onScroll={event}
                        onTouchEnd={() => { this.isScrolledToTop(); }}
                        onScrollEndDrag={() => { this.isScrolledToTop(); }}
                        ref={ref => this.listRef = ref}
                    />
                </Animated.View>
            </View>
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
