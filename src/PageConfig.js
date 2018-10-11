/* 
    react-navigation阅读API参考链接
    https://reactnavigation.org/docs/zh-Hans/api-reference.html
*/

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

// 当然也可以自定义头部组件替换
/* class LogoTitle extends Component {
  render() {
    return (
      <Image source={{ uri: 'https://ocpvgmewj.qnssl.com/mkt_banner_ad/banner_ad_iphone_img/20180912/417bad82-ec2e-4da3-98e1-4fdc00b81d6c.jpg' }} style={{ width: 30, height: 30 }} />
    )
  }
} */

class HomeScreen extends Component {
    // 添加标题
    static navigationOptions = {
        title: 'Home',
        // 使用自定义头部组件替换
        // headerTitle: <LogoTitle />
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                    <Text>点我跳转到新页面</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class DetailsScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: navigation.getParam('otherParam', 'A Nest Details Screen'),
            //可以自定义某个页面的头部样式
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <TouchableOpacity onPress={() => this.props.navigation.push('Details')}>
                    <Text>点我 再次 跳转到新页面</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>回家</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text>go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class ContentScreen extends Component {
    static navigationOptions = {
        title: 'Content',
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ContentScreen!</Text>
            </View>
        )
    }
}
class SettingScreen extends Component {
    static navigationOptions = {
        title: 'Setting',
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        )
    }
}

//屏幕底部的选项卡
const TabContainer = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarVisible: true,//显示或隐藏标签栏，默认为true
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Image style={{ width: 20, height: 20 }} resizeMode='stretch'
                    source={focused ? require('./assets/icon/homepageLogo_clicked.png') : require('./assets/icon/homepageLogo_unclicked.png')} />
            )
        }
    },
    Content: ContentScreen,
    Setting: SettingScreen,
})

//将新屏幕添加在堆栈顶部的屏幕之间转换的方法
const PageConfig = createStackNavigator(
    {
        /*路由配置 */
        /* TabContainer是主屏幕 */
        TabContainer: {
            screen: TabContainer,
            navigationOptions: ({ navigation }) => ({
                title: '主页',
                gesturesEnabled: false
            })
        },
        Home: HomeScreen,
        Details: DetailsScreen,
    }, {
        initialRouteName: 'TabContainer',//设置堆栈的默认屏幕
        //屏幕的默认导航选项
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fa5a4b'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
        /* 
        initialRouteParams:初始路由配置参数
        initialRouteKey :初始路由的参数
        path:覆盖路由配置中设置的路径的映射
        */
    });

export default PageConfig;