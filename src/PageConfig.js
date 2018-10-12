/* 
    react-navigation阅读API参考链接
    https://reactnavigation.org/docs/zh-Hans/api-reference.html
*/

import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import HomeScreen from './Pages/home/HomeScreen';
import ContentScreen from './Pages/content/ContentScreen';
import SettingScreen from './Pages/about/SettingScreen';
import DetailScreen from './Pages/detail/DetailScreen';

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
    Content: {
        screen: ContentScreen,
        navigationOptions: {
            tabBarLabel: '内容',
            tabBarIcon: ({ focused }) => (
                <Image style={{ width: 20, height: 20 }} resizeMode='stretch'
                    source={focused ? require('./assets/icon/clubLogo_clicked.png') : require('./assets/icon/clubLogo_unclicked.png')} />
            )
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: '关于',
            tabBarIcon: ({ focused }) => (
                <Image style={{ width: 20, height: 20 }} resizeMode='stretch'
                    source={focused ? require('./assets/icon/myProfileLogo_clicked.png') : require('./assets/icon/myProfileLogo_unclicked.png')} />
            )
        }
    },
})

//将新屏幕添加在堆栈顶部的屏幕之间转换的方法
const PageConfig = createStackNavigator(
    {
        /*路由配置 */
        /* TabContainer是主屏幕 */
        TabContainer: {
            screen: TabContainer,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                header:null
            })
        },
        Home: {
            screen:HomeScreen,
            navigationOptions:({navigation})=>({
                
            })
        },
        Details: DetailScreen,
    }, {
        initialRouteName: 'TabContainer',//设置堆栈的默认屏幕
        //屏幕的默认导航选项
        navigationOptions: {
            /* headerStyle: {
                backgroundColor: '#fa5a4b'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            } */
        }
        /* 
        initialRouteParams:初始路由配置参数
        initialRouteKey :初始路由的参数
        path:覆盖路由配置中设置的路径的映射
        */
    });

export default PageConfig;