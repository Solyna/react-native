'use strict';

import { StyleSheet, View, WebView } from 'react-native';

import Dimensions from 'Dimensions';
import React from 'react';
import RootSiblings from 'react-native-root-siblings';

const staticHtml = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"><script src=\'https://ssl.captcha.qq.com/TCaptcha.js\'></script></head><body><script>var ele = document.createElement(\'button\');var captcha1 = new TencentCaptcha(ele, \'2072642366\', function (result) {var jsonstring = JSON.stringify(result);window.postMessage(jsonstring);},{needFeedBack:false});captcha1.show();</script></body></html>';

const patchPostMessageFunction = function () {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

class TencentCaptcha {
    static show = (callback) => {
        let sibling = new RootSiblings(
            <View style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
                <WebView
                    source={{ html: staticHtml }}
                    automaticallyAdjustContentInsets={false}
                    injectedJavaScript={patchPostMessageJsCode}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    style={styles.webview}
                    onMessage={(e) => {
                        let stringResult = e.nativeEvent.data;
                        let jsonrResult = JSON.parse(stringResult);
                        callback && callback(jsonrResult);
                        sibling.destroy();
                    }}
                />
            </View>
        );
    };
}

const { width, height } = Dimensions.get('window');
// const webviewSize = { width: Platform.OS == 'ios' ? width : width, height: height };
const styles = StyleSheet.create({
    webview: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: width,
        height: height,
        backgroundColor: 'transparent'
    }
});

export default TencentCaptcha;
