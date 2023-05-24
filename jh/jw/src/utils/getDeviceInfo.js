import murmurHash3 from 'murmurhash3js'

const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
function getBrowser() {
  const UserAgent = navigator.userAgent.toLowerCase()
  const browserInfo = {}
  const browserArray = {
    IE: window.ActiveXObject || 'ActiveXObject' in window, // IE
    Chrome: UserAgent.includes('chrome') && UserAgent.includes('safari'), // Chrome浏览器
    Firefox: UserAgent.includes('firefox'), // 火狐浏览器
    Opera: UserAgent.includes('opera'), // Opera浏览器
    Safari: UserAgent.includes('safari') && !UserAgent.includes('chrome'), // safari浏览器
    Edge: UserAgent.includes('edg'), // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
  }
  // console.log(browserArray)
  for (let i in browserArray) {
    if (browserArray[i]) {
      let versions = ''
      if (i === 'IE') {
        versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2]
      }
      else if (i === 'Chrome') {
        for (const mt in navigator.mimeTypes) {
          // 检测是否是360浏览器(测试只有pc端的360才起作用)
          if (navigator.mimeTypes[mt].type === 'application/360softmgrplugin')
            i = '360'
        }
        versions = UserAgent.match(/chrome\/([\d.]+)/)[1]
      }
      else if (i === 'Firefox') {
        versions = UserAgent.match(/firefox\/([\d.]+)/)[1]
      }
      else if (i === 'Opera') {
        versions = UserAgent.match(/opera\/([\d.]+)/)[1]
      }
      else if (i === 'Safari') {
        versions = UserAgent.match(/version\/([\d.]+).*/)[1]
      }
      else if (i === 'Edge') {
        versions = UserAgent.match(/edg\/([\d.]+)/)[1]
      }
      else if (i === 'QQBrowser') {
        versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1]
      }
      browserInfo.type = i
      browserInfo.version = versions?.split('.')[0]
      browserInfo.mobile = UserAgent.match(/applewebkit.*mobile.*/) ? 'mobile' : 'pc' // 是否为移动终端
      browserInfo.isIos = !!UserAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || UserAgent.includes('intel mac os')
    }
  }
  return browserInfo
}
function getIosVersion() {
  const str = navigator.userAgent.toLowerCase()
  const ver = str.match(/cpu iphone os (.*?) like mac os/)
  return Array.isArray(ver) ? ver[1].replace(/_/g, '.') : '1'
}
// 获取 系统默认字体
function getFontFamily() {
  const html = document.documentElement
  const computedStyles = window.getComputedStyle(html)
  return computedStyles['font-family']
}
// 判断系统字体
function isSupportFontFamily(f = '') {
  if (typeof f != 'string')
    return false

  const h = getFontFamily()
  if (f.toLowerCase() === h.toLowerCase())
    return true

  const e = 'a'
  const d = 100
  const a = 100
  const i = 100
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  canvas.width = a
  canvas.height = i
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.textBaseline = 'middle'
  function g(j) {
    ctx.clearRect(0, 0, a, i)
    ctx.font = `${d}px ${j}, ${h}`
    ctx.fillText(e, a / 2, i / 2)
    const k = ctx.getImageData(0, 0, a, i).data
    return [].slice.call(k).filter((l) => {
      return l !== 0
    })
  }
  return g(h).join('') !== g(f).join('')
}
function checkSystemFonts() {
  const fontFamily = [
    'Arial',
    'Microsoft YaHei',
    'sans-serif',
    'Tahoma',
    'Helvetica',
    '\\5b8b\\4f53',
    'Hiragino Sans GB',
    'Verdana',
    'Heiti SC',
    'Hiragino KakuGothic',
    'Times New Roman',
    'Helvetica Neue',
    'PingFang SC',
    'San Francisco',
    'Droid Sans',
    'Droid Sans',
    'Droid Sans Fallback',
    'STXihei',
    'WenQuanYi Micro Hei',
  ]

  return fontFamily.filter(font => isSupportFontFamily(font)).join('，')
}
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.font = '18pt Arial'
  context.textBaseline = 'top'
  context.fillText('Hello, user.', 2, 2)
  const url = canvas.toDataURL('img/jpeg')
  return murmurHash3.x86.hash128(url, 24)
}
function getTimeZone() {
  return `UTC+${0 - new Date().getTimezoneOffset() / 60}`
}
// 获取系统信息
function getOperationSys() {
  let OS = ''
  const OSArray = {}
  const UserAgent = navigator.userAgent.toLowerCase()
  OSArray.Windows = (navigator.platform == 'Win32') || (navigator.platform == 'Windows')
  OSArray.Mac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC')
    || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel')
  OSArray.iphone = UserAgent.includes('iPhone')
  OSArray.ipod = UserAgent.includes('iPod')
  OSArray.ipad = UserAgent.includes('iPad')
  OSArray.Android = UserAgent.includes('Android')
  for (const i in OSArray) {
    if (OSArray[i])
      OS = i
  }
  return OS
}

export function getDeviceInfo() {
  const browser = getBrowser()
  const info = {
    webrtcid: '',
    deviceType: 'ios',
    isIos: browser.isIos,
    OS: 'OS',
    iosVersion: getIosVersion(),
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    colorDepth: window.screen.colorDepth,
    language: window.navigator.language,
    netWork: navigator.connection && navigator.connection.effectiveType,
    browser_version: browser.version,
    browser_type: browser.type,
    devicePixelRatio: window.devicePixelRatio,
    fingerprint: getCanvasFingerprint(),
    userAgent: window.navigator.userAgent,
    zone: getTimeZone(), // 时区
    font: getFontFamily(), // 当前默认字体
    allFonts: checkSystemFonts(), // 所有支持的字体
    date: new Date(),
    UUID: uuid(),
    system: getOperationSys(),
  }

  const data = [
    info.font,
    info.allFonts,
    info.language,
    info.zone,
    info.screenWidth,
    info.screenHeight,
    info.innerWidth,
    info.innerHeight,
    info.colorDepth,
    info.iosVersion,
  ]

  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({ iceServers: [] })
    pc.createDataChannel('xxx000xxxx')
    pc.createOffer().then((SDP) => {
      pc.setLocalDescription(SDP, () => {}, () => {})
    })
    pc.onicecandidate = (ice) => {
      // console.log('ice===》》》》', ice)
      if (ice && ice.candidate && ice.candidate.candidate) {
        const rtcId = ice.candidate.candidate.split(' ')[0].split(':')[1]
        data.push(rtcId)
      }

      info.webrtcid = murmurHash3.x86.hash128(data.join('|'), 24)

      resolve(info)
    }
  })
}

export function getIp() {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://www.cloudflare.com/cdn-cgi/trace', true)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = xhr.response
            .trim()
            .split('\n')
            .reduce((obj, pair) => {
              pair = pair.split('=')
              return (obj[pair[0]] = pair[1]) && obj
            }, {})
          resolve(data)
        }
      }
    }
  })
}
