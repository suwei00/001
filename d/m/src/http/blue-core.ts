import axios, { AxiosRequestConfig } from 'axios';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { LogInAndRegister } from '@/utils/logIn';
import httpFilterConfig from './httpFilterConfig';
import codeMsg from './codeMsg';
import { getErrorJson } from '@/http/modules/sysDate';
import Toast from '@/components/cg-template-2/toast';
import { mqttConnect } from '@/http/mqtt';
import { getServiceUrl } from '@/utils/common';
import { getServerTime, setXxetaConfig } from 'cg-utils';

let time = 0;

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
const axiosInstance = axios.create({
  timeout: 12000,
  baseURL: process.env.NODE_ENV === 'development' ? '/dev' : '/'
});

let Timestamp: any = -1;
// 错误状态码对应的越南语
let Error: any = {};

getErrorJson().then(json => (Error = json));

setInterval(async () => {
  Timestamp = await getServerTime(getServiceUrl('date') + `?r=${performance.now()}`);
}, 15000);

// 请求拦截
axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    // Store
    const { token } = storeToRefs(useAppStore());

    const config = httpFilterConfig[request.url || ''];

    if (request.method === 'post') {
      console.log('------加密前：', request.data);
    }

    // 是监控接口
    if (request.url?.startsWith('log')) {
      request.baseURL = '/monitor';
      return request;
    }
    if (Timestamp < 0) Timestamp = await getServerTime(getServiceUrl('date') + `?r=${performance.now()}`);

    setXxetaConfig(request as any, {
      d: 24,
      value: globalConfig.XXTEA_KEY,
      'X-Ca-Timestamp': Timestamp,
      // showConsole: true,
      murmurhash_key: 24
    });

    request.headers.lang = globalConfig.LANG;
    if (token.value) request.headers.t = token.value;

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

// 响应拦截
axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.status === 403) {
      Toast('IP Bị Hạn Chế, Vui Lòng Liên Hệ CSKH');
      return Promise.reject(403);
    }

    // tore
    const { setToken, setCaptchaId, removeToken } = useAppStore();

    // 状态错误
    if (!response.data.status) {
      let state = true;
      let _time = new Date().getTime();

      if (_time - time < 2000) {
        state = false;
      } else {
        time = new Date().getTime();
      }
      const data = response.data.data;
      if (data === 'token' || data === '1003') {
        // 登录失效，更新用户信息
        removeToken();
        if (state) {
          Toast(useIn8['token']);
        }
        // 打开登录弹窗
        LogInAndRegister('LogIn');
        // 关闭mqtt
        mqttConnect();
      }

      const msg = codeMsg[data] || Error[data] || data;
      // 自定义不弹错误提示
      if (response.config?.noToast) {
        return Promise.reject(data);
      }

      if (response.config.url.includes('member/login') && (data.includes('password') || data === '1006' || data.includes('1330'))) {
      } else {
        if (state) {
          Toast(msg);
        }
      }

      // 弹出错误提示
      return Promise.reject(data);
    }

    if (response.data) {
      if (response.headers.id) setToken(response.headers.id);
      if (response.headers.vid) setCaptchaId(response.headers.vid);

      return response.data.data;
    }
  },
  err => {
    return Promise.reject(err);
  }
);

// 通用的请求函数
export async function request<T>(config: AxiosRequestConfig & { noToast?: boolean }) {
  return axiosInstance.request<T, T>(config);
}

export default request;
