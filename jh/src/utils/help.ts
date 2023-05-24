import { copy } from 'clipboard'
import { Toast } from 'vant'
// 复制成功img
import bgSrc from '~/assets/images/public/success.png?preset=full'
// 检测浏览器是否支持webp格式
export const canUseWebp = () => {
  return document.documentElement.classList.value.split(' ').includes('webp')
}

// 检测浏览器是否支持avif格式
export const canUseAvif = () => {
  return document.documentElement.classList.value.split(' ').includes('avif')
}
export const canUseGif = () => {
  return document.documentElement.classList.value.split(' ').includes('gif')
}
export const Local = {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify({ data: value }))
  },
  getItem(key: string): any {
    let storage: any = localStorage.getItem(key)
    if (storage) {
      try {
        storage = JSON.parse(storage)
        return storage.data
      }
      catch (e) {
        return null
      }
    }
    return null
  },
  removeItem(key: string): void {
    localStorage.removeItem(key)
  },
  clearItem(): void {
    localStorage.clear()
  },
}

export const Session = {
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify({ data: value }))
  },
  getItem(key: string): any {
    let storage: any = sessionStorage.getItem(key)
    if (storage) {
      try {
        storage = JSON.parse(storage)
        return storage.data
      }
      catch (e) {
        return null
      }
    }
    return null
  },
  removeItem(key: string): void {
    sessionStorage.removeItem(key)
  },
  clearItem(): void {
    sessionStorage.clear()
  },
}

// 获取浏览器支持的图片格式
export const getSupportImage = (imgs: import('vite-plugin-image-presets').ImageAttrs[]) => {
  if (!imgs?.length)
    return ''
  if (canUseAvif())
    return imgs[0].srcset as string
  if (canUseWebp())
    return imgs[1].srcset as string
  if (canUseGif())
    return imgs[1].srcset as string

  return imgs[3].srcset as string
}

// 获取错误提示
export function getLangPath() {
  return 'https://dl.alskdoi.com/lang/error/zh.json'
}
export function getErrorJson(): any {
  if (location.pathname === '/403')
    return null

  const url = `${getLangPath()}?r=${performance.now()}`
  return fetch(url).then(res => res.json())
}

// 复制操作
export const handleCopy = (dom: any, cb?: (text: string) => void) => {
  const text = copy(dom)
  // Toast('复制成功')
  Toast({
    message: '复制成功',
    icon: getSupportImage(bgSrc),
    iconSize: 60,
    className: 'handleCopyClass',
  })
  return cb?.(text)
}

// 保留两位小数
export const reserveDecimal = (val: number | string, thousand = true, num = 2) => {
  try {
    const valStr = val.toString()
    const valArr = valStr.split('.')
    const valArrA = valArr[0] ? valArr[0] : '0'
    let valArrASte = valArrA
    const valArrB = valArr[1]
    // 千位分隔符
    if (thousand) {
      const reg = /\B(?=(\d{3})+(?!\d))/g
      valArrASte = valArrA.replace(reg, ',')
    }

    // 小数位
    const valArrBStr = valArrB?.slice(0, num) ?? ''
    // 补完小数位
    const valArrBStr2 = valArrBStr?.padEnd(num, '0')

    return `${valArrASte}.${valArrBStr2}`
  }
  catch (e) {
    return val
  }
}

export const isDev = () => {
  return import.meta.env.DEV
}
