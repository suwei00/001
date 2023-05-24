/**
 * @FileDescription: 消息加密/解密
 * @Author: Jango
 * @Date: 2023年05月10日
 * @LastEditors: Jango
 * @LastEditTime: 2023年05月10日
 */

// @ts-ignore
import CryptoJS from 'crypto-js/crypto-js' //引用AES源码js
const VITE_APP_PUBLIC_KEY:string = import.meta.env.VITE_APP_PUBLIC_KEY;

const key = CryptoJS.enc.Utf8.parse(VITE_APP_PUBLIC_KEY) //密钥
const iv = CryptoJS.enc.Utf8.parse('') //偏移量

const decrypt = (word: string) => {
    //解密方法
    let decryptedStr
    let base64 = CryptoJS.enc.Base64.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(base64)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    try {
        decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
        return decryptedStr.toString().replace(/[\r\n]/g, '')
    } catch (error) {
        localStorage.clear()
    }
}

const encrypt = (word: string) => {
    //加密方法
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export { decrypt, encrypt }
