/* import {
    Config
} from '../Core/PageConfig.js';
import  {DeviceInfo} from './Deviceinfo';
import {
    NativeModules
} from 'react-native';
import {
    Platform
} from 'react-native';
import {
    store
} from '../Store/Store.js';
import {
    uuid
} from './Uuid.js';

let lcb_client_id;

async function getLcbClientId() {
    let bridge = NativeModules.LCBHybridHandlerBridge;
    let result = await bridge.callHandler('app.privateInfo', {});
    return result.data.trace.clientId;
}


export async function postJson(urlPath, params, timeout) {
    timeout = timeout || 8000;
    if (!lcb_client_id) {
        lcb_client_id = await getLcbClientId();
    }

    let host = Config.env ? Config.env : 'https://m.lechebang.com/';
    let url = host + urlPath;
    if (__DEV__) {
        console.log('request:' + url + '\n' + JSON.stringify(params));
    }

    return _fetch(fetch_promise(url, params), timeout, url);
}

export async function getJson(url, timeout = 8000) {
    return _fetch(fetch_promise(url), timeout, url);
}

const getUserAgentForRN = () => {
    return DeviceInfo.getUserAgent() + ' RN';
};

function _fetch(fetch_promise, timeout, url) {
    var abort_fn = null;
    var abort_promise = new Promise((resolve, reject) => {
        abort_fn = function () {
            reject(url + ' request timeout!');
        };
    });
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function () {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

function fetch_promise(url, params) {
    let fetchPromise = null;
    if (params) {
        const { client: { userInfo } } = store.getState();
        if (userInfo) {
            params.token = userInfo.token;
        }
        fetchPromise = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': getUserAgentForRN()
            },
            body: JSON.stringify({
                ...params,
                'appCode': Platform.OS == 'android' ? '600' : '700',
                'lcb_client_id': lcb_client_id,
                'lcb_request_id': uuid()
            })
        });
    } else {
        fetchPromise = fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': getUserAgentForRN()
            }
        });
    }
    return fetchPromise.then((response) => {
        if (__DEV__) {
            console.log('response:' + url + '\n' + JSON.stringify(response));
        }
        return response.json();
    }).then((result) => {
        // 处理token失效
        if (result.statusCode == 904 && !url.includes('/gateway/user/currentUser')) {
            store.dispatch({
                type: 'INVALID_TOKEN'
            });
        }
        return result;
    }).catch((error) => {
        console.warn(error);
    });
}
 */