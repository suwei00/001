export const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
/**
 * 判断 浏览器类型
 *     手机端或PC端
 *     操作系统
 * */

// const browser = {
//   versions: (function () {
//     const u = navigator.userAgent
//     return {
//       // 移动终端浏览器版本信息
//       trident: u.includes('Trident'), // IE内核
//       presto: u.includes('Presto'), // opera内核
//       webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
//       gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
//       mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
//       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.includes('Intel Mac OS'), // ios终端
//       android: u.includes('Android') || u.includes('Linux'), // android终端或uc浏览器
//       iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
//       iPad: u.includes('iPad'), // 是否iPad
//       webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
//       safari: u.includes('Safari'),
//       QQBrowser: u.includes('qqbrowser'), // qq浏览器
//     }
//   })(),
//   language: navigator.language.toLowerCase(),
// }

export function getIosVersion() {
  const str = navigator.userAgent.toLowerCase()
  const ver = str.match(/cpu iphone os (.*?) like mac os/)
  return Array.isArray(ver) ? ver[1].replace(/_/g, '.') : '1'
}

// 获取 系统默认字体
export function getFontFamily() {
  const html = document.documentElement
  const computedStyles = window.getComputedStyle(html)
  return computedStyles['font-family']
}

// 判断系统字体
export function isSupportFontFamily(f = '') {
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

export function checkSystemFonts() {
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

export function getTimeZone() {
  const time = 0 - new Date().getTimezoneOffset() / 60
  return `UTC${time > 0 ? `+${time}` : time}`
}

export function getAudioCtx() {
  // for legacy browsers
  const AudioContext = window.AudioContext || window.webkitAudioContext

  const audioContext = new AudioContext()

  console.log('audioContext===>', audioContext)
}

export const getIp = () => fetch('https://www.cloudflare.com/cdn-cgi/trace').then(response => response.text()).then((res) => {
  const arr = res.split('\n').reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {})
  return arr
})
// return new Promise((resolve) => {

// const xhr = new XMLHttpRequest()
// xhr.open('get', 'https://www.cloudflare.com/cdn-cgi/trace', true)
// xhr.send()
// xhr.onreadystatechange = () => {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       const data = xhr.response
//         .trim()
//         .split('\n')
//         .reduce((obj, pair) => {
//           pair = pair.split('=')
//           obj[pair[0]] = pair[1]
//           return obj
//         }, {})
//       resolve(data)
//     }
//   }
// }
// })

// 判断客户端
export function getClient() {
  const u = navigator.userAgent
  const isAndroid = u.includes('Android') || u.includes('Adr') // 判断是否是 android终端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 判断是否是 iOS终端

  if (isAndroid)
    return 35

  else if (isIOS)
    return 36

  else
    return 'PC'
}

