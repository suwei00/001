import type { AxiosRequestConfig } from 'axios'
import { decryptQuery, getServerTime, setServerTime, setXxetaConfig } from 'cg-utils'

const keyVal = import.meta.env.PROD ? '1400778756' : '2085999532'

let Timestamp: any = -1
setInterval(() => {
  setServerTime(getServiceUrl())
}, 15000)

// 错误状态码翻译JSON
let errorJson: Record<number, string> = {}
getErrorJson().then(json => (errorJson = json))

// axios实例
const service = axios.create({
  baseURL: import.meta.env.MODE === 'dev' ? '/api' : '',
  timeout: 10000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})

// 请求拦截
service.interceptors.request.use(async (config: any) => {
  const appStore = useAppStore()
  if (Timestamp < 0)
    Timestamp = await getServerTime(getServiceUrl())

  setXxetaConfig(config as any, {
    'murmurhash_key': 36,
    'd': 25,
    'value': keyVal,
    'X-Ca-Timestamp': Timestamp,
  })

  // token
  if (appStore.token)
    config.headers!.t = appStore.token

  return config
},
(error: unknown) => {
  Promise.reject(error)
},
)

// 响应拦截
service.interceptors.response.use(
  async (response: any) => {
    const result: any = import.meta.env.PROD
      ? decryptQuery(response.data, {
        'd': 25,
        'value': keyVal,
        'X-Ca-Timestamp': Timestamp,
      })
      : response.data

    // 对响应数据做点什么
    if (!result.status) {
      const data = result.data
      const message = errorJson[data] || data

      // 设置了noToast，不弹提示
      if (response.config?.noToast)
        return Promise.reject(new Error(message))

      // 错误提示
      showToast(message)
      if (message === 'token') {
        window.parent.postMessage(
          {
            action: 'outLogin',
          },
          '*',
        )
      }

      return Promise.reject(new Error(`出错了！🐞🐞🐞${message}`))
    }

    if (result)
      return result.data
  },
  (error: unknown) => {
    // do something
    return Promise.reject(error)
  },
)

// 通用的请求函数
export async function request<T>(config: AxiosRequestConfig & { noToast?: boolean }) {
  return service.request<T, T>(config)
}

export default request
