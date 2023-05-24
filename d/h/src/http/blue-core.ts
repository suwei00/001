import axios, { AxiosRequestConfig } from 'axios';
import { getServerTime, setServerTime, setXxetaConfig } from 'cg-utils';
import { getServiceUrl } from '@/utils/common';
import httpFilterConfig from './httpFilterConfig';
import { getErrorJson } from '@/http/modules/sysDate';
import { Toast } from 'vant';
import { mqttConnect } from './mqtt';
import codeMsg from './codeMsg';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import router from '@/router/index';

export const getData = (data: ObjectParams) => {
  let ret = '';
  const keys = Object.keys(data);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = data[key];
    ret += `${encodeURIComponent(key)}=${encodeURIComponent(value)}${
      index < keys.length - 1 ? '&' : ''
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

let Timestamp: any = -1;
setInterval(() => {
  setServerTime(`${getServiceUrl('date')}?r=${performance.now()}`);
}, 15000);

let Error: any = {};
getErrorJson().then(json => (Error = json));

// 接口实例
const axiosInstance = axios.create({ timeout: 12000 });
axiosInstance.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/dev' : '/';

// 请求拦截
axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    const { token } = storeToRefs(useAppStore());

    const config = httpFilterConfig[request.url || ''];
    request.headers['request-startTime'] = new Date().getTime();

    // 是监控接口
    if (request.url?.startsWith('log')) {
      request.baseURL = '/monitor';
      return request;
    }

    if (request.method === 'post') {
      console.log('------加密前：', request.data);
    }

    // token
    request.headers.t = token.value;

    // 验签
    if (Timestamp < 0)
      Timestamp = await getServerTime(`${getServiceUrl('date')}?r=${performance.now()}`);

    setXxetaConfig(request as any, {
      d: 25,
      value: globalConfig.XXTEA_KEY,
      'X-Ca-Timestamp': Timestamp,
      murmurhash_key: 24
    });

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

// 响应拦截
axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.status === 403) {
      Toast('IP Bị Hạn Chế, Vui Lòng Liên Hệ CSKH');
      return Promise.reject(403);
    }

    const { setToken, setCaptchaId, removeToken } = useAppStore();

    // 状态错误
    if (!response.data.status) {
      const data = response.data.data;
      if (data === 'token' || data === '1003') {
        // 登录失效，更新用户信息
        removeToken();
        // 打开登录弹窗
        router.push('/entry/login');
        // 重连mqtt
        mqttConnect();
      }

      const msg = codeMsg[data] || Error[data] || data;
      // 自定义不弹错误提示
      if (response.config?.noToast) {
        return Promise.reject(data);
      }

      if (data.includes('password') || data === '1006' || data.includes('1330')) {
        return Promise.reject(data);
      }

      // 弹出错误提示
      Toast(msg);
      return Promise.reject(data);
    }

    if (response.data) {
      if (response.headers.id) setToken(response.headers.id);
      if (response.headers.vid) setCaptchaId(response.headers.vid);

      return response.data.data;
    }
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

// 通用的请求函数
export async function request<T>(config: AxiosRequestConfig & { noToast?: boolean }) {
  return axiosInstance.request<T, T>(config);
}

export default request;
