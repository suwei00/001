import type { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

let Timestamp: any = -1

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

// 错误状态码翻译JSON
let errorJson: Record<number, string> = {}
getErrorJson().then(json => (errorJson = json))
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '' : '/api',
  timeout: 10000,
  paramsSerializer(params) {
    // 过滤空值
    return qs.stringify(omitBy(params, isUndefined))
  },

})
axiosInstance.interceptors.request.use(async (request) => {
  if (is403())
    return Promise.reject(new Error('403'))
  // 使用appstore中的token，必须放置在请求中
  const appStore = useAppStore()
  if (Timestamp < 0)
    Timestamp = await getServerTime()
  // 设置设备类型
  request.headers!['request-startTime'] = new Date().getTime()
  request.headers!.d = 24
  request.headers!.v = '1.0.0'
  request.headers!.u = performance.now()
  request.headers!.lang = 'zh-CN'
  request.headers!['X-Ca-Timestamp'] = Timestamp
  if (request.url?.toString().includes('?'))
    request.url += `&r=${performance.now()}`
  else
    request.url += `?r=${performance.now()}`
  const str = sign(request.method, deleteEmptyValue(request.data || request.params), request.url, Timestamp)
  request.headers!['X-Ca-Nonce'] = str

  // console.error('headers', request.headers)

  if (appStore.token)
    request.headers!.t = appStore.token
  if (request.method === 'post' || request.method === 'put')
    request.data = encryptQuery(request.data)

  return request
}, (error) => {
  const err = new Error(error.code)
  // 对请求错误做些什么
  return Promise.reject(err)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response: any) => {
  response.data = import.meta.env.DEV || import.meta.env.MODE === 'test' ? response.data : decryptQuery(response.data)

  const { close: closeLoading } = useLoading()
  const appStore = useAppStore()
  const userStore = useUserStore()
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (!response.data.status) {
    closeLoading()
    const data = response.data.data
    const message = errorJson[data] || data
    if (response.data.data === 'token') {
      console.warn('token失效')
      appStore.$reset()
      appStore.clearToken()
      userStore.$reset()
      loginPopup()
      return Promise.reject(new Error(' '))
    }
    // 汇率发生变化时重新获取汇率
    if (response.data.data === '1294' || response.data.data === '1340') {
      ElMessage.error({ grouping: true, message })
      return Promise.reject(new Error('汇率发生变化'))
    }

    // 弹出错误提示
    if (response.config?.noToast)
      return Promise.reject(new Error(message))
    // 统一错误提示
    ElMessage.error({ grouping: true, message })
    return Promise.reject(new Error(message))
  }
  if (response.data)
    return response.data.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 通用的请求函数
export async function request<T>(config: AxiosRequestConfig & { noToast?: boolean }) {
  return axiosInstance
    .request<T, T>(config)
}

export default request
