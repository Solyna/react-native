import React, { PureComponent } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Config } from '../../Core/PageConfig';

export default class extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            soaList: [{
                title: 'soa1',
                url: 'https://m.lechebang.cn/'
            }, {
                title: 'soa2',
                url: 'https://m2.lechebang.cn/'
            }, {
                title: 'soa3',
                url: 'https://m3.lechebang.cn/'
            }, {
                title: 'soa4',
                url: 'https://m4.lechebang.cn/'
            }, {
                title: 'soa5',
                url: 'https://m5.lechebang.cn/'
            }],
            currSoa: Config.env
        };
    }
    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <TouchableOpacity onPress={this.props.onPressMask} style={styles.mask}></TouchableOpacity>
                <ScrollView style={styles.container}>
                    <TouchableOpacity onPress={this.props.onClose}><Text>关闭</Text></TouchableOpacity>
                    <Text>各模块配置信息</Text>
                    <Text>{JSON.stringify(Config.configModule(), (key, value) => {
                        if (key === 'vertime') {
                            const date = new Date(value);
                            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                        }
                        return value;
                    }, 2)}</Text>
                    <Text>当前SOA地址：</Text>
                    <Text>{this.state.currSoa}</Text>
                    <Text>切换SOA地址：</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {this.state.soaList.map(soa =>
                            <TouchableOpacity
                                key={soa.title}
                                onPress={() => {
                                    Config.env = soa.url;
                                    this.setState({
                                        currSoa: Config.env
                                    });
                                }}
                                style={[styles.button, this.state.currSoa === soa.url && styles.activeBtn]}>
                                <Text>{soa.title}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{height: 20}}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.3
    },
    container: {
        width: '70%',
        height: 300,
        padding: 10,
        position: 'absolute',
        top: 100,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'red'
    },
    button: {
        width: 40,
        height: 26,
        marginRight: 5,
        backgroundColor: '#ccc',
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeBtn: {
        borderColor: 'red',
        backgroundColor: 'yellow'
    }
});
