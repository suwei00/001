const getServiceUrl = () => {
  return import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_TEST_DOMAIN}/date?r=${performance.now()}` : `${location.origin}/date?r=${performance.now()}`
}
/**
 * 获取服务器时间
 */
export function getServerTime() {
  const url = getServiceUrl()
  return new Promise((resolve) => {
    if (is403())
      return resolve(0)

    const xhr: any = new XMLHttpRequest()
    xhr.open('head', url, true)
    xhr.send(null)
    xhr.timeout = 15000
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const serverDateStr = xhr.getResponseHeader('Date')

        // 1，相对于服务器的本地时间
        const serverDate: Date = new Date(serverDateStr)
        const now = new Date().getTime()
        const offsetTime = serverDate.getTime() - now
        const localTime = new Date(new Date().getTime() + offsetTime)

        // console.log('服务器时间', serverDateStr)
        // console.log('偏移时间', offsetTime, 'ms')
        // console.log('发送时间', localTime.toUTCString())
        // console.log('====================')
        resolve(localTime.toUTCString())
      }
    }
  })
}
