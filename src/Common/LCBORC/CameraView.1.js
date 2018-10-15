import React from 'react';
import {
    View, StyleSheet, Image, Text, CameraRoll, NativeModules, Dimensions, TouchableOpacity, ScrollView

} from 'react-native';
import { Camera, CameraPosition, FlashMode, CameraManager, AutoFocus, CameraMode } from './Camera';
// import { NotScalingText } from '../NotScalingText';
import { Polygon, Svg } from 'react-native-svg';

const ORCModule = NativeModules.LCBORCModule;
const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;
// const ImageUploadModule = NativeModules.LCBImageHandleModule;
const bridge = NativeModules.LCBHybridHandlerBridge;


export default class CameraView extends React.PureComponent {
    static propTypes = {

    };
    static defaultProps = {
        cameraMode: CameraMode.PICTURE// 拍照识别模式
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectPhoto: false,
            cameraMode: CameraMode.PICTURE,
            cameraPosition: CameraPosition.BACK,
            flashMode: FlashMode.OFF,
            autoFocus: AutoFocus.ON,
            playSoundOnCapture: false,
            base64string: null,
            photos: [],
            zoom: 1,
            imageSize: {
                width: 0,
                height: 0
            },

            cameraPositionText: '切换摄像头',
            flashModeText: '闪光灯',
            autoFocusText: '对焦模式',
            zoomText: '倍数',
            camera_height: 359,
            camera_width: 250,
            left: (window_height - 359) / 2,
            right: 359 + (window_height - 359) / 2,
            top: (window_width - 250) / 2,
            bottom: 250 + (window_width - 250) / 2
        };
        this.degree = 0;
    }



    async componentDidMount() {
        let degreeResult = await CameraManager.getDeviceOrientation();
        this.degree = degreeResult.degree;
        if (this.degree == 90 || this.degree == 270) {
            this.setState({
                camera_height: 187.5,
                camera_width: 269.25,
                left: (window_width - 269.25) / 2,
                right: 269.25 + (window_width - 269.25) / 2,
                top: (window_height - 187.5) / 2,
                bottom: 187.5 + (window_height - 187.5) / 2
            });
        } else if (this.degree == 0 || this.degree == 180) {
            this.setState({
                camera_height: 359,
                camera_width: 250,
                left: (window_height - 359) / 2,
                right: 359 + (window_height - 359) / 2,
                top: (window_width - 250) / 2,
                bottom: 250 + (window_width - 250) / 2

            });
        }
    }

    selectPictureReg() {
        this._handleButtonPress();
    }

    async cutPictureReg() {
        try {
            let cutResult = await bridge.callHandler('image.picker', { type: 'pt', maxCountAllowed: 1, crop: true });
            if (cutResult) {
                this.setState({
                    imageSize: cutResult.data,
                    base64string: cutResult.data.thumbUrl
                });
                // console.warn(JSON.stringify(cutResult));
                let regResult = await ORCModule.photoRecog(cutResult.data.imageUrl, 6);
                console.warn(JSON.stringify(regResult));
            }
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async takePicture() {
        try {
            let takepictureResult = await this.camera.takePicture();
            this.setState({
                imageSize: takepictureResult.metadata,
                base64string: takepictureResult.base64string
            });
            let saveResult = await CameraManager.saveToAlbum(takepictureResult);
            if (saveResult) {
                console.warn(JSON.stringify(saveResult));
            }
            // this.setState({ base64string: result.base64string });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async takePictureReg() {
        try {
            let takepictureResult = await this.camera.takePicture();
            // this.setState({
            //     imageSize: takepictureResult.metadata,
            //     base64string: takepictureResult.base64string
            // });
            // let saveResult = await CameraManager.saveToAlbum(takepictureResult);
            let regResult = await ORCModule.photoRecog(takepictureResult.url, 6);
            console.warn(JSON.stringify(regResult));
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async onFramePreview(e) {
        try {
            const { base64string, metadata, scanRect } = e;
            let result = await ORCModule.scanRecog(base64string, 6, this.degree, metadata.width, metadata.height,
                scanRect.left, scanRect.right, scanRect.top, scanRect.bottom
            );
            console.warn('onFramePreview:', result.recogResult.toString());
            this.stopScan();

            this.setState({
                imageSize: result.imageInfo.metadata,
                base64string: result.imageInfo.base64string
            });
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async startScan() {
        try {
            let result = await this.camera.startScan();

        } catch (e) {

        }
    }

    stopScan() {
        this.camera.stopScan();
    }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos'
        }).then(r => {
            var edges = r.edges;
            var photos = [];
            for (var i in edges) {
                photos.push(edges[i].node.image.uri);
            }
            this.setState({
                photos: photos
            });
            this.setState({
                selectPhoto: true
            });

        }).catch((err) => {

        });
    };

    switchCameraPosition() {
        if (this.state.cameraPosition == CameraPosition.BACK) {
            this.setState({
                cameraPosition: CameraPosition.FRONT,
                cameraPositionText: '正面'
            });
        } else if (this.state.cameraPosition == CameraPosition.FRONT) {
            this.setState({
                cameraPosition: CameraPosition.BACK,
                cameraPositionText: '反面'
            });
        }
    }

    switchFlashMode() {
        if (this.state.flashMode == FlashMode.OFF) {
            this.setState({
                flashMode: FlashMode.ON,
                flashModeText: '开'
            });
        } else if (this.state.flashMode == FlashMode.ON) {
            this.setState({
                flashMode: FlashMode.AUTO,
                flashModeText: '自动'
            });
        } else if (this.state.flashMode == FlashMode.AUTO) {
            this.setState({
                flashMode: FlashMode.OFF,
                flashModeText: '关'
            });
        }
    }

    switchAutoFocus() {
        if (this.state.autoFocus == AutoFocus.OFF) {
            this.setState({
                autoFocus: AutoFocus.ON,
                autoFocusText: '开'
            });
        } else if (this.state.autoFocus == AutoFocus.ON) {
            this.setState({
                autoFocus: AutoFocus.OFF,
                autoFocusText: '关'
            });
        }
    }
    switchZoom() {
        let zoom = this.state.zoom + 0.1;
        let zoomText = this.state.zoom.toString() + '倍';
        this.setState({
            zoom: zoom,
            zoomText: zoomText
        });
    }

    async takePictureReg2(url) {
        try {
            let regResult = await ORCModule.photoRecog(url, 6);
            console.warn(JSON.stringify(regResult));
        } catch (e) {
            console.warn(e.toString());
        }
    }

    render() {

        return (
            <View style={[{ flex: 1, backgroundColor: 'black' }, StyleSheet.absoluteFill]}>
                <Camera style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                    ref={(ref) => this.camera = ref}
                    cameraMode={this.state.cameraMode}
                    cameraPosition={this.state.cameraPosition}
                    flashMode={this.state.flashMode} autoFocus={this.state.autoFocus} zoom={this.state.zoom}
                    playSoundOnCapture={this.state.playSoundOnCapture}
                    scanRect={{
                        left: this.state.left,
                        top: this.state.top,
                        bottom: this.state.bottom,
                        right: this.state.right
                    }}
                    onOrientationChanged={(degree) => {
                        this.degree = degree;
                        if (degree == 90 || degree == 270) {
                            this.setState({
                                camera_height: 187.5,
                                camera_width: 269.25,
                                left: (window_width - 269.25) / 2,
                                right: 269.25 + (window_width - 269.25) / 2,
                                top: (window_height - 187.5) / 2,
                                bottom: 187.5 + (window_height - 187.5) / 2
                            });
                        } else if (degree == 0 || degree == 180) {
                            this.setState({
                                camera_height: 359,
                                camera_width: 250,
                                left: (window_height - 359) / 2,
                                right: 359 + (window_height - 359) / 2,
                                top: (window_width - 250) / 2,
                                bottom: 250 + (window_width - 250) / 2
                            });
                        }
                    }}
                    onFramePreview={(data) => {
                        this.onFramePreview(data);
                    }}
                    onMountError={(error) => {
                        if (__DEV__) console.log('onMountError:', error);
                    }}
                    onCameraReady={() => {
                    }}>
                    <Svg
                        height={this.state.camera_height}
                        width={this.state.camera_width}>
                        <Polygon
                            // points="0,0 250,0 259,359 0,359"  //多边形的每个角的x和y坐标
                            points={`0,0 ${this.state.camera_width},0 ${this.state.camera_width},${this.state.camera_height} 0,${this.state.camera_height}`} // 多边形的每个角的x和y坐标
                            stroke="red" // 外边框颜色
                            fill="transparent" // 填充颜色
                            strokeWidth="2" // 外边框宽度
                        />
                    </Svg>
                    <View style={{
                        position: 'absolute',
                        width: 70,
                        height: 400,
                        left: 0,
                        top: 10,
                        flexDirection: 'column'
                    }}>
                        <Text style={styles.text} onPress={() => {
                            this.switchCameraPosition();
                        }}>{this.state.cameraPositionText}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.switchFlashMode();
                        }}>{this.state.flashModeText}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.switchAutoFocus();
                        }}>{this.state.autoFocusText}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.switchZoom();
                        }}>{this.state.zoomText}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.takePictureReg();
                        }}>{'拍照识别'}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.selectPictureReg();
                        }}>{'选择图片识别'}</Text>
                        <Text style={styles.text} onPress={() => {
                            this.cutPictureReg();
                        }}>{'裁剪图片识别'}</Text>
                    </View>
                </Camera>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: 40,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'transparent' }} onPress={() => {
                        this.setState({ cameraMode: CameraMode.PICTURE });
                    }}>拍照模式</Text>
                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'transparent' }} onPress={() => {
                        this.takePicture();
                    }}>拍照</Text>
                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'transparent' }} onPress={() => {
                        this.startScan();
                    }}>开始扫描</Text>
                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'transparent' }} onPress={() => {
                        this.stopScan();
                    }}>停止扫描</Text>
                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'transparent' }} onPress={() => {
                        this.setState({ cameraMode: CameraMode.SCAN });
                    }}>扫描模式</Text>
                </View>
                {this.state.base64string ? <Image style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: (this.state.imageSize.width / 10),
                    height: (this.state.imageSize.height / 10)
                }}
                source={{ uri: this.state.base64string }} /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: 'red',
        backgroundColor: 'transparent',
        height: 25,
        borderWidth: 1,
        borderColor: 'red',
        margin: 3,
        textAlign: 'center'
    },

    flex: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    image: {
        height: 120,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    }
});

