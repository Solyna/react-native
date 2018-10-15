import React from 'react';
import {
    Animated,
    AsyncStorage,
    Dimensions,
    Easing,
    ScrollView,
    StyleSheet,
    Text,
    View, Image
} from 'react-native';
import dateFormat from './util';

const { width, height } = Dimensions.get('window');
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
            refreshStatus: RefreshStatus.refreshing,
            refreshTitle: this.props.refreshableTitleRefreshing,
            date: this.props.date,
            showRefreshHeader: false,
            rotateValue: new Animated.Value(0),
            needHead: false
        };
    }
    componentWillMount(){
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        this.refreshTimeOut && clearTimeout(this.refreshTimeOut);
        console.log(PaginationStatus);
    }
    async componentDidMount() {
        console.warn('The advancedRefreshView is not ready for Android at this moment. \n\nIf the items are less than the height of device screen, the refreshView will not disappear. \n\nPlease consider setting the refreshableMode={Platform.OS === "ios" ? "advanced" : "basic"}, or feel free to send me a PR to resolve this problem. \n\nThanks a lot.');
        try {
            let result = await AsyncStorage.getItem(DATE_KEY);
            if (result) {
                result = parseInt(result, 10);
                this.mounted && this.setState({
                    date: dateFormat(new Date(result), this.props.dateFormat)
                });
            } else {
                this.mounted && this.setState({
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
            easing: Easing.out(Easing.linear)
        }).start(() => {
            if (this._isRefreshing) this.startAnimation();
        });
    };

    onScroll = (event) => {
        // console.warn('onScroll()');
        const { y } = event.nativeEvent.contentOffset;
        const { refreshViewHeight } = this.props;
        if (y <= refreshViewHeight) {
            this._offsetY = y - refreshViewHeight;
        }
        if (this._dragFlag) {
            if (!this._isRefreshing) {
                if (y <= 10) {
                    if (this.state.refreshStatus !== RefreshStatus.releaseToRefresh) {
                        this.setState({
                            refreshStatus: RefreshStatus.releaseToRefresh,
                            refreshTitle: this.props.refreshableTitleRelease
                        });
                        Animated.timing(this.state.arrowAngle, {
                            toValue: 1,
                            duration: 50,
                            easing: Easing.inOut(Easing.quad)
                        }).start();
                    }
                } else if (this.state.refreshStatus !== RefreshStatus.pullToRefresh) {
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
        } else if (y <= 5) {
            setTimeout(() => this._scrollview && this._scrollview.scrollTo({ x: 0, y: refreshViewHeight, animated: false }), 100);
        }
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    };

    onScrollBeginDrag = (event) => {
        // console.log('onScrollBeginDrag()');
        this._dragFlag = true;
        const { refreshViewHeight } = this.props;
        this._offsetY = event.nativeEvent.contentOffset.y - refreshViewHeight;
        if (this.props.onScrollBeginDrag) {
            this.props.onScrollBeginDrag(event);
        }
    };

    onScrollEndDrag = (event) => {
        this._dragFlag = false;
        this.startAnimation();
        const { y } = event.nativeEvent.contentOffset;
        const { refreshViewHeight } = this.props;
        this._offsetY = y - refreshViewHeight;
        // console.log('onScrollEndDrag()' + y);
        if (!this._isRefreshing) {
            if (this.state.refreshStatus === RefreshStatus.releaseToRefresh) {
                this._isRefreshing = true;
                this.setState({
                    refreshStatus: RefreshStatus.refreshing,
                    refreshTitle: this.props.refreshableTitleRefreshing
                });
                this._scrollview && this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
                if (this.props.insideOfUltimateListView) {
                    this.props.onRefresh();
                } else {
                    this.props.onRefresh(() => {
                        this.onRefreshEnd();
                    });
                }
            } else if (y <= refreshViewHeight) {
                this._scrollview && this._scrollview.scrollTo({ x: 0, y: refreshViewHeight, animated: true });
            }
        } else if (y <= refreshViewHeight) {
            this._scrollview && this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
        }
        if (this.props.onScrollEndDrag) {
            this.props.onScrollEndDrag(event);
        }
    };

    scrollTo = (option) => {
        this._scrollview && this._scrollview.scrollTo(option);
    };

    scrollToEnd = (option) => {
        this._scrollview && this._scrollview.scrollToEnd(option);
    };

    onRefreshEnd = () => {
        // console.log('onRefreshEnd()');
        if (this.state.refreshStatus === RefreshStatus.refreshing || this._isRefreshing) {
            this._isRefreshing = false;
            const now = new Date().getTime();
            this.setState({
                showRefreshHeader: true
            });
            this.refreshTimeOut = setTimeout(() => {
                if (this._scrollview && this._scrollview.scrollTo) {
                    this._scrollview.scrollTo({
                        x: 0,
                        y: this.state.needHead ? this.props.refreshViewHeight : 0,
                        animated: true
                    });
                }
                this.setState({
                    refreshStatus: RefreshStatus.pullToRefresh,
                    refreshTitle: this.props.refreshableTitlePull,
                    date: dateFormat(now, this.props.dateFormat)
                });
                if (!this.state.needHead && this._scrollview && this._scrollview.scrollTo) {
                    this.setState({ needHead: true });
                    // setTimeout(() => {
                       
                    // }, 1000);

                    this._scrollview && this._scrollview.scrollTo({ x: 0, y: this.props.refreshViewHeight, animated: true });
                 
                }
            }, 1000);

            AsyncStorage.setItem(DATE_KEY, now.toString());
            Animated.timing(this.state.arrowAngle, {
                toValue: 0,
                duration: 50,
                easing: Easing.inOut(Easing.quad)
            }).start();
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
            this.state.needHead ?
                <View
                    style={[defaultHeaderStyles.header, this.props.refreshViewStyle, { height: this.props.refreshViewHeight }]}
                >
                    {this.renderSpinner()}
                </View> : null
        );
    }

    renderSpinner() {
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
                            height: 35, 
                            borderRadius: 17.5,
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
                contentContainerStyle={{ minHeight: this.props.hasBanner ? (height - 150 - (this.props.extraInvalidHeight ? this.props.extraInvalidHeight : 120)) : (height - (this.props.extraInvalidHeight ? this.props.extraInvalidHeight : 120)) }}
                // onMomentumScrollEnd={this.onScrollEndDrag}
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
        width,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
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
