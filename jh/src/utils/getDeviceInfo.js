// import MobileDetect from 'mobile-detect';
import murmurHash3 from 'murmurhash3js'
import { getBrowser } from './helpers'
import {
  checkSystemFonts,
  getFontFamily,
  getIosVersion,
  getTimeZone,
  uuid,
} from './deviceUtil'

// 获取系统信息
function getOperationSys() {
  let OS = ''
  const OSArray = {}
  const UserAgent = navigator.userAgent.toLowerCase()
  OSArray.Windows = (navigator.platform === 'Win32') || (navigator.platform === 'Windows')
  OSArray.Mac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC')
    || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
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

export default function getDeviceInfo() {
  const { version, type, isIos } = getBrowser()
  const browser = getBrowser()
  const info = {
    webrtcid: '',
    deviceType: isIos ? 'ios' : 'android',
    isIos: browser.isIos,
    // model: md.phone() || md.tablet(),
    // vs: getIosVersion(),
    OS: isIos ? 'ios' : 'android',
    iosVersion: getIosVersion(),
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    colorDepth: window.screen.colorDepth,
    language: window.navigator.language,
    netWork: navigator.connection && navigator.connection.effectiveType,
    browser_version: version,
    browser_type: type,
    devicePixelRatio: window.devicePixelRatio,
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
    // info.innerWidth,
    // info.innerHeight,
    info.colorDepth,
    info.iosVersion,
  ]

  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({ iceServers: [] })
    if (!pc) {
      info.webrtcid = murmurHash3.x86.hash128(data.join('|'), 24)
      resolve(info)
    }
    // eslint-disable-next-line spaced-comment
    pc.createDataChannel('xxx000xxxx') //create a bogus data channel
    pc.createOffer().then((SDP) => {
      pc.setLocalDescription(
        SDP,
        () => {},
        () => {},
      )
    })
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const rtcId = ice.candidate.candidate.split(' ')[0].split(':')[1]
        data.push(rtcId)
      }

      info.webrtcid = murmurHash3.x86.hash128(data.join('|'), 24)

      resolve(info)
    }
  })
}
