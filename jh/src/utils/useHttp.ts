import { useRequest } from 'vue-request'
type useRequestType = typeof useRequest

const useHttp: useRequestType = (service: any, options: any) => useRequest(service, {
  onError(err) {
    console.log('默认错误处理', err.message)
    // ElMessage.error(err.message)
  },
  ...options,
})
export default useHttp
