// @ts-ignore
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// @ts-ignore
import { store } from '@/store';
import Event from '@/event';
import { getServerTime, setServerTime, setXxetaConfig } from 'cg-utils'
import { getServiceUrl } from '@/utils/common';
import xxaqt from './xxaqt'
import httpFilterConfig from './httpFilterConfig';
import { getErrorJson } from '@/http/modules/sysDate';
// import { CGToast } from '@/utils/cgToast'
import { Toast } from 'vant';
import { closeConnect } from './mqtt';
import codeMsg from './codeMsg';
import { monitorErrorInsert } from './APIs';
// 天空蓝
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';

export const getData = (data: ObjectParams) => {
  let ret = '';
  const keys = Object.keys(data);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = data[key];
    ret += `${encodeURIComponent(key)}=${encodeURIComponent(value)}${index < keys.length - 1 ? '&' : ''
      }`;
  }
  return ret;
};
// 监控上报实例
export const logAxiosInstance = axios.create({
  baseURL: '/monitor',
  headers: {
    d: 25
  }
});

let Timestamp: any = -1
setInterval(() => {
  setServerTime(`${getServiceUrl('date')}?r=${performance.now()}`)
}, 15000)

let Error: any = {};
getErrorJson().then(json => (Error = json));

// 接口实例
const axiosInstance = axios.create({ timeout: 12000 });
axiosInstance.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/dev' : '/';

axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    // 天空蓝Store
    const { token } = storeToRefs(useAppStore())

    const config = httpFilterConfig[request.url || ''];
    request.headers['request-startTime'] = new Date().getTime();
    // 是监控接口
    if (request.url?.startsWith('log')) {
      request.baseURL = '/monitor';
      return request;
    }
    // token
    request.headers.t = token.value

    // console.log("🎆 ~ file: core.ts:59 ~ request", request.data)

    // 验签
    if (Timestamp < 0)
      Timestamp = await getServerTime(`${getServiceUrl('date')}?r=${performance.now()}`)

    setXxetaConfig(request as any, {
      'd': 25,
      'value': globalConfig.XXTEA_KEY,
      'X-Ca-Timestamp': Timestamp,
      'murmurhash_key': 24
    })

    // 场馆登录， 场馆转账  场馆获取余额
    // 请求 加个请求头  p
    // 如果是 IM电竞 IM体育   p=1
    // 其他场馆  p=0
    if (config?.header?.key) {
      const id: string = request.params?.id || '';
      const activeIds: string[] = ['5864536520308659696', '1846182857231915191'];
      request.headers[`${config?.header?.key || 'p'}`] = activeIds.includes(id) ? '1' : '0';
    }

    if (request.responseType) request.headers.responseType = request.responseType;
    if (request.headers['Content-Type'] === 'multipart/form-data;') {
      return request;
    }

    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 天空蓝Store
    const { setToken, setCaptchaId } = useAppStore()

    // 获取接口耗时
    const start = response.config.headers['request-startTime'];
    const currentTime = new Date().getTime();
    const requestDuration = currentTime - start;
    const {
      userInfo: { uid = '0', username = 'anonymous' }
    } = require('@/store/modules/user/UserModule').default;
    // monitorErrorInsert({
    //   uid: +uid,
    //   api_path: response.config.url,
    //   username,
    //   error_title: 'requestSuccess',
    //   error_type: 4,
    //   request_status: response.status,
    //   request_time: requestDuration
    // });
    if (response.data) {
      if (response.headers.id) {
        store.commit('app/setToken', response.headers.id);
        setToken(response.headers.id)
      }
      if (response.headers.vid) {
        store.commit('app/setCaptchaId', response.headers.vid);
        setCaptchaId(response.headers.vid)
      }
      const responseURL =
        (response.config && response.config.url?.includes('plat/balance')
          ? 'plat/balance'
          : response.config.url) || '';
      const config = httpFilterConfig[responseURL ? responseURL.split('?')[0] : ''];
      const noErrTip = config && config.noErrTip === true;
      const defaultErrTipTxt = (config && config.errTxt) || '';
      const result = response.data;
      if (!noErrTip && result.status === false && result.data && result.data !== '1273') {
        const msg = codeMsg[result.data] || Error[result.data] || result.data || defaultErrTipTxt;
        Toast(msg);
      }

      if (result.data === '1273') {
        result.code = '1273';
      }
      if (result.status === false && (result.data === 'token' || result.data === '1003')) {
        closeConnect();
        const link_id = localStorage.getItem('link_id');
        // localStorage.clear();
        link_id && localStorage.setItem('link_id', link_id);
        // 登录失效，更新用户信息
        store.commit('setUserInfo', {
          uid: '',
          name: '',
          be_agent_at: '',
          is_agent: '',
          verify_type: ''
        });
        // 更新登录状态
        store.commit('setLogin', false);
        // 提示跳转登录
        Event.emit('natsLogin', { msg: 'login first' });
        Event.emit('login', { msg: 'login first' });
        // localStorage.setItem('TOKEN', '');
        store.commit('app/setToken', null);
      }
      if (response.config.url?.split('?')[0] === 'member/login') {
        // 登录成功链接mqtt
        console.log('============888888888', result);
        // mqttConnect();
      }
      if (response.config.url?.split('?')[0] === 'member/logout') {
        // 退出登陆的时候断开mqtt
        closeConnect();
      }

      if (result.status === false) {
        const msg = result.data;
        result.data = codeMsg[msg] || Error[msg] || msg;
      }
      return result;
    } else {
      return Promise.reject(response);
    }
  },
  (err: any) => {
    const start = err.config.headers['request-startTime'];
    const currentTime = new Date().getTime();
    const requestDuration = currentTime - start;
    const {
      userInfo: { uid = '0', username = 'anonymous' }
    } = require('@/store/modules/user/UserModule').default;
    // monitorErrorInsert({
    //   uid: +uid,
    //   api_path: err.config.url,
    //   username,
    //   error_title: 'requestError',
    //   error_type: 4,
    //   request_status: err.response?.status,
    //   request_time: requestDuration
    // });
    return Promise.reject(err);
  }
);

export default axiosInstance;
