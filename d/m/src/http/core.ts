import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/store';
import httpFilterConfig from './httpFilterConfig';
import codeMsg from './codeMsg';
import { getErrorJson } from '@/http/modules/sysDate';
import Toast from '@template-components/toast';
import router from '@/router';
import { closeConnect } from '@/http/mqtt';
import { getServiceUrl } from '@/utils/common';
import { getServerTime, setXxetaConfig } from 'cg-utils'
import dayjs from 'dayjs';


export const getData = (data: ObjectParams) => {
  let ret = '';
  const keys = Object.keys(data);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = data[key];
    ret += `${encodeURIComponent(key)}=${encodeURIComponent(value)}${index < keys.length - 1 ? '&' : ''}`;
  }
  return ret;
};
// 监控上报实例
export const logAxiosInstance = axios.create({
  baseURL: '/monitor'
});
const useIn8 = require(`@/language/${globalConfig.LANG}`);
// 接口实例
const axiosInstance = axios.create({ timeout: 12000 });

let Timestamp: any = -1;
// 错误状态码对应的越南语
let Error: any = {};

getErrorJson().then(json => (Error = json));

setInterval(async () => {
  Timestamp = await getServerTime(getServiceUrl('date') + `?r=${performance.now()}`)
}, 15000);

axiosInstance.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/dev' : '/';

axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    const config = httpFilterConfig[request.url || ''];
    // 是监控接口
    if (request.url?.startsWith('log')) {
      request.baseURL = '/monitor';
      return request;
    }
    if (Timestamp < 0) Timestamp = await getServerTime(getServiceUrl('date') + `?r=${performance.now()}`);

    setXxetaConfig(request as any, {
      'd': 24,
      'value': globalConfig.XXTEA_KEY,
      'X-Ca-Timestamp': Timestamp,
      showConsole: true,
      murmurhash_key: 24
    })

    request.headers.lang = globalConfig.LANG;
    const token = store.getters.token;
    if (token) request.headers.t = token;

    // 场馆登录， 场馆转账  场馆获取余额11
    // 请求 加个请求头 p
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
    if (response.data) {
      if (response.headers.id) {
        store.commit('app/setToken', response.headers.id);
      }
      if (response.headers.vid) {
        store.commit('app/setVid', response.headers.vid);
      }


      store.commit('app/setDateTime', dayjs(response.headers.date).valueOf());
      let url = '';
      if (response.config && response.config.url) {
        url = response.config.url;
        if (url.includes('?')) {
          url = url.substring(0, url.indexOf('?'));
        }
        if (url.includes('plat/balance')) {
          url = 'plat/balance';
        }
      }
      const config = httpFilterConfig[url];
      const noErrTip = config && config.noErrTip === true;
      const defaultErrTipTxt = (config && config.errTxt) || '';
      const result = response.data;
      if (!noErrTip && result.status === false && result.data) {
        const msg = codeMsg[result.data] || Error[result.data] || result.data || defaultErrTipTxt;
        switch (url) {
          case 'promo/plat/list':
            break;
          default:
            Toast(msg);
            break;
        }
      }
      if (result.status === false && ['token', '1003'].includes(result.data)) {
        // 关闭mqtt
        closeConnect();
        // 登录失效，更新用户信息
        store.commit('setUserInfo', { uid: '', name: '', be_agent_at: '', is_agent: '', verify_type: '' });
        Toast(useIn8['token']);
        localStorage.removeItem('TOKEN');
        // 更新登录状态
        store.commit('setLogin', false);
        if (router?.currentRoute?.value?.meta?.requiresAuth === true) {
          router.push('/entry/login');
        }
      }
      if (result.status === false) {
        const code = result.data;
        if (code) result.code = code;
        result.data = codeMsg[code] || Error[code] || code;
      }
      return result;
    } else return Promise.reject(response);
  },
  err => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
