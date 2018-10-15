import React from 'react';
import {
    Animated,
    AsyncStorage,
    Easing,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import dateFormat from './util';
const { width } = Dimensions.get('window');
const DATE_KEY = 'ultimateRefreshDate';
const RefreshStatus = {
    pullToRefresh: 0,
    releaseToRefresh: 1,
    refreshing: 2
};
const PaginationStatus = {
    firstLoad: 0,
    waiting: 1,
    allLoaded: 2
};

export default class RefreshableScrollView extends ScrollView {
    static defaultProps = {
        horizontal: false,
        scrollEnabled: true,
        header: null,
        refreshable: true,
        refreshableTitlePull: 'Pull to refresh',
        refreshableTitleRefreshing: 'Loading...',
        refreshableTitleRelease: 'Release to load',
        customRefreshView: null,
        displayDate: false,
        dateFormat: 'yyyy-MM-dd hh:mm',
        dateTitle: 'Last updated: ',
        arrowImageSource: require('./downArrow.png'),
        arrowImageStyle: undefined,
        refreshViewStyle: undefined,
        dateStyle: undefined,
        refreshViewHeight: 80,
        insideOfUltimateListView: false
    };

    _offsetY = 0;
    _isRefreshing = false;
    _dragFlag = false;

    constructor(props) {
        super(props);
        this.state = {
            arrowAngle: new Animated.Value(0),
            refreshStatus: RefreshStatus.pullToRefresh,
            refreshTitle: this.props.refreshableTitlePull,
            date: this.props.date,
            rotateValue: new Animated.Value(0)
        };
    }

    async componentDidMount() {
        try {
            let result = await AsyncStorage.getItem(DATE_KEY);
            if (result) {
                result = parseInt(result, 10);
                this.setState({
                    date: dateFormat(new Date(result), this.props.dateFormat)
                });
            } else {
                this.setState({
                    date: dateFormat(new Date(), this.props.dateFormat)
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    startAnimation = () => {
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear
        }
        ).start(() => {
            if (this._isRefreshing) this.startAnimation();
        });
    };

    onScroll = (event) => {
        // console.warn('onScroll()');
        const {y} = event.nativeEvent.contentOffset;
        this._offsetY = y;
        if (this._dragFlag) {
            if (!this._isRefreshing) {
                const height = this.props.refreshViewHeight;
                if (y <= -height) {
                    this.setState({
                        refreshStatus: RefreshStatus.releaseToRefresh,
                        refreshTitle: this.props.refreshableTitleRelease
                    });
                    Animated.timing(this.state.arrowAngle, {
                        toValue: 1,
                        duration: 50,
                        easing: Easing.inOut(Easing.quad)
                    }).start();
                } else {
                    this.setState({
                        refreshStatus: RefreshStatus.pullToRefresh,
                        refreshTitle: this.props.refreshableTitlePull
                    });
                    Animated.timing(this.state.arrowAngle, {
                        toValue: 0,
                        duration: 50,
                        easing: Easing.inOut(Easing.quad)
                    }).start();
                }
            }
        }
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    };

    onScrollBeginDrag = (event) => {
        // console.log('onScrollBeginDrag()');
        this._dragFlag = true;
        this._offsetY = event.nativeEvent.contentOffset.y;
        if (this.props.onScrollBeginDrag) {
            this.props.onScrollBeginDrag(event);
        }
    };

    onScrollEndDrag = (event) => {
        // console.log('onScrollEndDrag()');
        this._dragFlag = false;
        this.startAnimation();
        const {y} = event.nativeEvent.contentOffset;
        this._offsetY = y;
        const height = this.props.refreshViewHeight;
        if (!this._isRefreshing) {
            if (this.state.refreshStatus === RefreshStatus.releaseToRefresh) {
                this._isRefreshing = true;
                this.setState({
                    refreshStatus: RefreshStatus.refreshing,
                    refreshTitle: this.props.refreshableTitleRefreshing
                });
                this._scrollview.scrollTo({x: 0, y: -height, animated: true});
                if (this.props.insideOfUltimateListView) {
                    this.props.onRefresh();
                } else {
                    this.props.onRefresh(() => {
                        this.onRefreshEnd();
                    });
                }
            }
        } else if (y <= 0) {
            this._scrollview.scrollTo({x: 0, y: -height, animated: true});
        }
        if (this.props.onScrollEndDrag) {
            this.props.onScrollEndDrag(event);
        }
    };

    scrollTo = (option) => {
        this._scrollview.scrollTo(option);
    };

    scrollToEnd = (option) => {
        this._scrollview.scrollToEnd(option);
    };

    onRefreshEnd = () => {
        // console.log('onRefreshEnd()');
        if (this.state.refreshStatus === RefreshStatus.refreshing) {
            this._isRefreshing = false;
            const now = new Date().getTime();
            this.setState({
                refreshStatus: RefreshStatus.pullToRefresh,
                refreshTitle: this.props.refreshableTitlePull,
                date: dateFormat(now, this.props.dateFormat)
            });
            AsyncStorage.setItem(DATE_KEY, now.toString());
            Animated.timing(this.state.arrowAngle, {
                toValue: 0,
                duration: 50,
                easing: Easing.inOut(Easing.quad)
            }).start();
            this._scrollview.scrollTo({x: 0, y: 0, animated: true});
        }
    };

    renderRefreshHeader() {
        if (this.props.customRefreshView) {
            return (
                <View style={[defaultHeaderStyles.header, this.props.refreshViewStyle]}>
                    {this.props.customRefreshView(this.state.refreshStatus, this._offsetY)}
                </View>
            );
        }

        return (
            <View style={[defaultHeaderStyles.header, this.props.refreshViewStyle]}>
                {this.renderSpinner()}
            </View>
        );
    }

    renderSpinner() {
        // console.log('refreshStatus' + this.state.refreshStatus);
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width
            }}>
                <View style={
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.props.refreshViewStyle && this.props.refreshViewStyle.backgroundColor || '#fff'
                  
                    }
                }>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            position: 'absolute',
                            backgroundColor: this.props.refreshViewStyle && this.props.refreshViewStyle.backgroundColor || '#fff',
                            overlayColor: this.props.refreshViewStyle && this.props.refreshViewStyle.backgroundColor || '#fff',
                            overflow: 'hidden'
                        }}
                        source={require('./logo.jpg')} />
                    <Animated.Image source={require('./rotate.jpg')}
                        style={{
                            width: 35,
                            height: 35, borderRadius: 17.5,
                            transform: [
                                {
                                    rotateZ: this.state.rotateValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }
                            ]
                        }}>
                    </Animated.Image>
                </View>
                <Text style={{
                    marginLeft: 20,
                    fontSize: 13,
                    color: '#999',
                    width: '20%'
                }}>{!this._dragFlag ? '更新中' : '下拉刷新'}</Text>
            </View>
        );
    }


    render() {
        return (
            <ScrollView
                ref={c => this._scrollview = c}
                {...this.props}
                scrollEventThrottle={16}
                onScroll={this.onScroll}
                onScrollEndDrag={this.onScrollEndDrag}
                onScrollBeginDrag={this.onScrollBeginDrag}
            >
                {this.renderRefreshHeader()}
                {this.props.children}
            </ScrollView>
        );
    }
}

const defaultHeaderStyles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: -40,
        left: 0,
        right: 0,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        width: 23,
        height: 23,
        marginRight: 10,
        opacity: 0.4
    },
    statusTitle: {
        fontSize: 13,
        color: '#333333'
    },
    date: {
        fontSize: 11,
        color: '#333333',
        marginTop: 5
    }
});
