import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View, Picker, StyleSheet, TouchableOpacity, PixelRatio, Platform } from 'react-native';
import LCBPicker from './Pickers/Picker';
import { store } from '../Store/Store';


let cityMap = {};

export default class CityPicker extends React.Component {
    static propTypes = {
    }

    constructor(props, context) {
        super(props, context);
    }
    state = {
        fadeInOpacity: new Animated.Value(0),  // Initial value for opacity: 0
        contentHeight: new Animated.Value(0),
        cityData: [],
        provinceId: this.props.cityCode > 0 ? String(this.props.cityCode).slice(0, 3) : 0,
        cityCode: this.props.cityCode
    }

    onCityChange = (cityCode) => {
        this.setState({ cityCode })
    }

    onProvinceChange = async (provinceId) => {
        this.setState({ provinceId })
        let cityQuery = await this.props.getPlaceInfo(provinceId);
        this.setState({
            cityData: cityQuery.result,
            cityCode: cityQuery.result[0].id
        })
    }

    componentWillMount() {
        if (this.props.provinceName) {//优先使用定位省市
            let provinceId = this.getprovinceIdByName(this.props.provinceName.replace('省', '').replace('市', ''))
            this.setState({ provinceId })
        } else {
            // 首先判断store节点SearchAddress里有没有省会列表provinceList
            //匹配省会id和城市id，找到provinceId
            let cityId = this.props.cityCode ? this.props.cityCode : store.getState().client.city.code
            const isMatched = ProvinceList.some(item => {
                return String(cityId).startsWith(item.id)
            })
            if (isMatched) {
                let provinceId = String(cityId).slice(0, 3)
                this.setState({ provinceId })
            } else {
                let provinceId = ProvinceList[0].id
                this.setState({ provinceId })
            }
        }
    }

    getprovinceIdByName(name) {
        for (var index = 0; index < ProvinceList.length; index++) {
            var province = ProvinceList[index];
            if (province.name == name) {
                return province.id
            }
        }
        return -1
    }

    getprovinceNameById(provinceId) {
        for (var index = 0; index < ProvinceList.length; index++) {
            var province = ProvinceList[index];
            if (province.id == provinceId) {
                return province.name
            }
        }
        return ''
    }

    componentDidMount() {
        var timing = Animated.timing;
        Animated.parallel(['fadeInOpacity', 'contentHeight'].map((property) => {
            return timing(this.state[property], { toValue: 1, duration: 250 });
        })).start(() => {
            this._loadCityInfo()//首次获取城市
        })
    }

    async _loadCityInfo() {
        let cityQuery = await this.props.getPlaceInfo(this.state.provinceId);
        let cityList = cityQuery.result
        let cityCode = this.state.cityCode
        if (cityCode < 0) {
            for (var index = 0; index < cityList.length; index++) {
                var city = cityList[index];
                if (city.name == this.props.cityName) {
                    cityCode = city.id
                    break
                }
            }
        }

        this.setState({
            cityData: cityQuery.result,
            cityCode: cityCode
        })
    }

    render() {
        let pickerComponent = null;
        let getList = (data) => {
            let res = [];
            for (let i = 0; i < data.length; i++) {
                cityMap[data[i].id] = data[i].name;
                if (Platform.OS == 'ios') {
                    res.push(<Picker.Item key={data[i].id} label={data[i].name} value={data[i].id} style={styles.pickerItem} />)
                }
                else {
                    res.push(<LCBPicker.Item key={data[i].id} value={data[i].id} style={styles.pickerItem}>{data[i].name}</LCBPicker.Item>);
                }
            }
            return res
        }

        if (Platform.OS == 'ios') {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <Picker style={styles.provincePicker} onValueChange={this.onProvinceChange} selectedValue={this.state.provinceId}>
                        {getList(ProvinceList)}
                    </Picker>
                    <Picker style={styles.cityPicker} onValueChange={this.onCityChange} selectedValue={this.state.cityCode}>
                        {
                            getList(this.state.cityData)
                        }
                    </Picker>
                </View>
        } else {
            pickerComponent =
                <View style={styles.pickerContainer}>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onProvinceChange} selectedValue={this.state.provinceId}>
                        {
                            getList(ProvinceList)
                        }
                    </LCBPicker>
                    <LCBPicker style={{ flex: 1 }} onValueChange={this.onCityChange} selectedValue={this.state.cityCode}>
                        {
                            getList(this.state.cityData)
                        }
                    </LCBPicker>
                </View>
        }

        return (
            <View style={styles.container}>
                <Animated.View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: this.state.fadeInOpacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] })
                }} />
                <Animated.View style={{
                    width: '100%',
                    height: this.state.contentHeight.interpolate({ inputRange: [0, 1], outputRange: [0, 260] }),
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 1. / PixelRatio.get()
                }}>
                    <View style={styles.toolbar}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.props.onCancel() }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>取消</Text>
                        </TouchableOpacity>
                        <Text style={styles.toolbarTitle}>选择地区</Text>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                            this.props.onConfirm(cityMap[this.state.cityCode], this.state.cityCode)
                        }} activeOpacity={1}>
                            <Text style={styles.buttonTextStyle}>确定</Text>
                        </TouchableOpacity>
                    </View>
                    {pickerComponent}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column-reverse'
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#f4f4f8',
        justifyContent: 'space-between'
    },
    buttonTextStyle: {
        color: '#fa5a4b'
    },
    buttonStyle: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbarTitle: {
        flex: 1,
        color: '#333333',
        textAlign: 'center'
    },
    pickerContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    provincePicker: {
        width: '50%',
        height: '100%'
    },
    cityPicker: {
        width: '50%',
        height: '100%'
    },
    pickerItem: {
        fontSize: 14,
        color: 'red'
    }
});

const ProvinceList = [
    {
        "pinyin": "anhui",
        "name": "安徽",
        "id": "105"
    },
    {
        "pinyin": "beijing",
        "name": "北京",
        "id": "101"
    },
    {
        "pinyin": "chongqing",
        "name": "重庆",
        "id": "104"
    },
    {
        "pinyin": "fujian",
        "name": "福建",
        "id": "106"
    },
    {
        "pinyin": "gansu",
        "name": "甘肃",
        "id": "107"
    },
    {
        "pinyin": "guangdong",
        "name": "广东",
        "id": "108"
    },
    {
        "pinyin": "guangxi",
        "name": "广西",
        "id": "109"
    },
    {
        "pinyin": "guizhou",
        "name": "贵州",
        "id": "110"
    },
    {
        "pinyin": "hainan",
        "name": "海南",
        "id": "111"
    },
    {
        "pinyin": "hebei",
        "name": "河北",
        "id": "112"
    },
    {
        "pinyin": "heilongjiang",
        "name": "黑龙江",
        "id": "114"
    },
    {
        "pinyin": "henan",
        "name": "河南",
        "id": "113"
    },
    {
        "pinyin": "hubei",
        "name": "湖北",
        "id": "115"
    },
    {
        "pinyin": "hunan",
        "name": "湖南",
        "id": "116"
    },
    {
        "pinyin": "jiangsu",
        "name": "江苏",
        "id": "118"
    },
    {
        "pinyin": "jiangxi",
        "name": "江西",
        "id": "119"
    },
    {
        "pinyin": "jilin",
        "name": "吉林",
        "id": "117"
    },
    {
        "pinyin": "liaoning",
        "name": "辽宁",
        "id": "120"
    },
    {
        "pinyin": "neimenggu",
        "name": "内蒙古",
        "id": "121"
    },
    {
        "pinyin": "ningxia",
        "name": "宁夏",
        "id": "122"
    },
    {
        "pinyin": "qinghai",
        "name": "青海",
        "id": "123"
    },
    {
        "pinyin": "shandong",
        "name": "山东",
        "id": "124"
    },
    {
        "pinyin": "shanghai",
        "name": "上海",
        "id": "102"
    },
    {
        "pinyin": "shanxi",
        "name": "山西",
        "id": "125"
    },
    {
        "pinyin": "shanxi1",
        "name": "陕西",
        "id": "126"
    },
    {
        "pinyin": "sichuan",
        "name": "四川",
        "id": "127"
    },
    {
        "pinyin": "tianjin",
        "name": "天津",
        "id": "103"
    },
    {
        "pinyin": "xinjiang",
        "name": "新疆",
        "id": "129"
    },
    {
        "pinyin": "xizang",
        "name": "西藏",
        "id": "128"
    },
    {
        "pinyin": "yunnan",
        "name": "云南",
        "id": "130"
    },
    {
        "pinyin": "zhejiang",
        "name": "浙江",
        "id": "131"
    }
]