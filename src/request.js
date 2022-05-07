import axios from 'axios';
import { Base64 } from "js-base64";
import { encrypt, decrypt } from './utils/rsa';
axios.defaults.withCredentials = true;
/**
 * 请求方法
 * @param {*} fun 方法名称
 * @param {*} params 参数
 * @param {*} type 方法类型
 * @param {*} url fun 是否是个url
 * @param {*} withoutCookies 不需要 cookies
 * @returns 
 */
const req = function (fun, params, type, isurl, withoutCookies) {
    // 请求是否需要携带 cookie 默认是携带的
    if (withoutCookies) {
        axios.defaults.withCredentials = false;
    } else {
        axios.defaults.withCredentials = true;
    }
    // http://helingkai.com/api/
    // http://127.0.0.1:3000/
    return new Promise((resolve, reject) => {
        axios.request({
            url: isurl ? fun : (process.env.NODE_ENV === "development" ? 'http://127.0.0.1:3000/' : '/api/') + fun,
            method: type,
            data: Base64.encode(JSON.stringify(params)),
            timeout: 1000 * 60
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * 请求方法
 * @param {*} fun 方法名称
 * @param {*} params 参数
 * @param {*} type 方法类型
 * @param {*} url fun 是否是个url
 * @param {*} withoutCookies 不需要 cookies
 * @returns 
 */
const reqkoa = function (fun, params, type, withoutCookies) {
    // 请求是否需要携带 cookie 默认是携带的
    if (withoutCookies) {
        axios.defaults.withCredentials = false;
    } else {
        axios.defaults.withCredentials = true;
    }
    // http://helingkai.com/apikoa/
    // http://127.0.0.1:3000/
    return new Promise((resolve, reject) => {
        axios.request({
            url: (process.env.NODE_ENV === "development" ? 'http://127.0.0.1:3011/' : '/apikoa/') + fun,
            method: type,
            data: { params: encrypt(JSON.stringify(params)) },
            timeout: 1000 * 60
        }).then(res => {
            resolve(JSON.parse(decrypt(res.data)))
        }).catch(err => {
            reject(err)
        });
    });
}

export { req, reqkoa }