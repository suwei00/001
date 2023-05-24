/**
 * 获取浏览器类型
 * @returns
 */

export const BrowserType = (): string => {
  const userAgent = window.navigator.userAgent

  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent))
    return 'Safari'

  if (userAgent.includes('Edge'))
    return 'Edge'

  if (userAgent.includes('Firefox'))
    return 'Firefox'

  if (userAgent.includes('Chrome'))
    return 'Chrome'

  if (userAgent.includes('.NET'))
    return 'IE'

  return ''
}

/**
 *  get请求表单序列化
 */
export function param(data: any) {
  let url = ''
  for (const k in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(k)) {
      const value = data[k] !== undefined ? data[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
  }

  return url ? url.substring(1) : ''
}

export function getCookiesKey() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)

  return keys || []
}
// 获取操作系统
export const getOSInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Windows NT 10.0'))
    return { os: 'Windows', os_version: 'Windows 10' }
  if (userAgent.includes('Windows NT 6.2'))
    return { os: 'Windows', os_version: 'Windows 8' }
  if (userAgent.includes('Windows NT 6.1'))
    return { os: 'Windows', os_version: 'Windows 7' }
  if (userAgent.includes('Windows NT 6.0'))
    return { os: 'Windows', os_version: 'Windows Vista' }
  if (userAgent.includes('Windows NT 5.1'))
    return { os: 'Windows', os_version: 'Windows XP' }
  if (userAgent.includes('Windows NT 5.0'))
    return { os: 'Windows', os_version: 'Windows 2000' }
  if (userAgent.includes('iPhone'))
    return { os: 'IPhone', os_version: userAgent.match(/CPU iPhone OS (.*?) like Mac OS X/)?.[1] }
  if (userAgent.includes('Mac') || userAgent.includes('IPad'))
    return { os: 'MacOS', os_version: userAgent.match(/Mac OS X (.*?)\)/)?.[1] }
  if (userAgent.includes('Android'))
    return { os: 'Android', os_version: userAgent.match(/Android (.*?);/)?.[1] }
  return { os: 'Other', os_version: 'Other' }
}

export function getBrowser() {
  const UserAgent: any = navigator.userAgent.toLowerCase()
  const browserInfo: any = {}
  const browserArray: any = {
    IE: 'ActiveXObject' in window, // IE
    Chrome: UserAgent.includes('chrome') && UserAgent.includes('safari'), // Chrome浏览器
    Firefox: UserAgent.includes('firefox'), // 火狐浏览器
    Opera: UserAgent.includes('opera'), // Opera浏览器
    Safari: UserAgent.includes('safari') && !UserAgent.includes('chrome'), // safari浏览器
    Edge: UserAgent.lastIndexOf('edg') > -1, // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
  }
  let versions = ''
  for (const i in browserArray) {
    if (browserArray[i]) {
      if (i === 'IE') {
        const match = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)
        versions = match ? match[2] : '9.2'
        browserInfo.type = 'IE'
      }
      else if (i === 'Chrome') {
        const match = UserAgent.match(/chrome\/([\d.]+)/)
        browserInfo.type = 'Chrome'
        versions = match ? match[1] : '88.2.2'
      }
      else if (i === 'Firefox') {
        const match = UserAgent.match(/firefox\/([\d.]+)/)
        browserInfo.type = 'Firefox'
        versions = match ? match[1] : '99.2.3'
      }
      else if (i === 'Opera') {
        const match = UserAgent.match(/opera\/([\d.]+)/)
        browserInfo.type = 'Opera'
        versions = match ? match[1] : '89.43.3'
      }
      else if (i === 'Safari') {
        const match = UserAgent.match(/version\/([\d.]+).*/)
        browserInfo.type = 'Safari'
        versions = match ? match[1] : '7.3.4'
      }
      else if (i === 'Edge') {
        const match = UserAgent.match(/edg\/([\d.]+)/)
        browserInfo.type = 'Edge'
        versions = match ? match[1] : '32.34'
      }
    }
  }

  browserInfo.browser_version = Number(versions.split('.')[0])
  browserInfo.mobile = UserAgent.match(/applewebkit.*mobile.*/) ? 'mobile' : 'pc' // 是否为移动终端
  browserInfo.isIos = !!UserAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || UserAgent.includes('intel mac os')

  return browserInfo
}
