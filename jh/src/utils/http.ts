import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Toast } from 'vant'
import { useUserInfoStore } from '~/store/userInfo'
import { getErrorJson } from '~/utils/help'
import router from '~/router'
import { closeConnect } from '~/utils/mqtt'

let Timestamp: any = -1

// 错误状态码翻译JSON
let errorJson: any
const result = getErrorJson()
if (result)
  result.then((json: any) => (errorJson = json))

setInterval(() => {
  getServerTime().then(time => (Timestamp = time))
}, 15000)

// 删除对象中的空值
export function deleteEmptyValue(obj: any) {
  if (obj === undefined)
    return {}

  for (const key in obj) {
    if (obj[key] === '' || obj[key] === undefined || obj[key] === null)
      delete obj[key]
  }
  return obj
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : '',
  headers: {
    d: 25,
  },
  paramsSerializer(params) {
    return qs.stringify(params)
  },
})

axiosInstance.interceptors.request.use(async (request) => {
  // 在发送请求之前做些什么
  const userInfoStor = useUserInfoStore()

  if (Timestamp < 0)
    Timestamp = await getServerTime()

  request.headers!['request-startTime'] = new Date().getTime()
  request.headers!.d = 25
  request.headers!.v = '1.0.0'
  request.headers!.u = performance.now()
  request.headers!.lang = 'zh-CN'
  request.headers!['X-Ca-Timestamp'] = Timestamp
  if (request.url?.includes('?'))
    request.url += `&r=${performance.now()}`

  else
    request.url += `?r=${performance.now()}`

  const str = sign(request.method, deleteEmptyValue(request.data || request.params), request.url, Timestamp)
  // console.error('value------', str, request.method, deleteEmptyValue(request.data || request.params), request.url, Timestamp)
  // console.groupCollapsed(`🔑🔑签名参数--${request.url}🔑🔑`)
  // console.log('nonce加密前的字符串', str)
  // console.log('nonce-------', murmurhash3_32_gc(str, 36))
  // console.groupEnd()

  request.headers!['X-Ca-Nonce'] = str

  if (userInfoStor.token)
    request.headers!.t = userInfoStor.token

  if (request.method === 'post' || request.method === 'put')
    request.data = encryptQuery(request.data)

  return request
}, (error) => {
  const err = new Error(error.code)
  // 对请求错误做些什么
  return Promise.reject(err)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  try {
    response.data = import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test' ? response.data : decryptQuery(response.data)
  }
  catch (error) {
    Toast('数据错误')
  }
  const { clearToken } = useUserInfoStore()
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.status === 403)
    return router.push('/403')

  if (!response.data) {
    console.log('无返回数据')
    return Promise.reject(new Error('无返回数据'))
  }

  if (!response.data.status) {
    const data = response.data.data
    const message = errorJson[data] || data

    // 弹出错误提示
    // @ts-expect-error sss
    if (response.config?.noToast)
      return Promise.reject(new Error(message))

    else
      Toast(message)

    if (response.data.data === 'token') {
      Toast('您的账号已在其他设备登录')
      clearToken()
      closeConnect()
      router.push('/entry/login')
    }
  }

  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const err = new Error(error.code)
  return Promise.reject(err)
})

// 泛型接口,T的类型支持
export interface IResponseData<T = any> {
  code: number
  message: string
  data: T
}
// 通用的请求函数
export async function request<T>(config: AxiosRequestConfig & { noToast?: boolean }) {
  if (location.pathname === '/403')
    return

  return axiosInstance
    .request<T, T>(config)
}

export { axiosInstance }
export default request
