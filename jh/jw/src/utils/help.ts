import router from '~/router/index'
import { useAppStore } from '~/store/app'

// 公共跳转提现
export function publicHandleToWithdraw() {
  const appStore = useAppStore()
  const { isBindBank, isBindDigital } = $(storeToRefs(appStore))

  // 所有提现方式都已绑定
  if (isBindBank && isBindDigital)
    return router.push('/personal/withdraw')
  // 绑定了银行卡
  if (isBindBank)
    return router.push('/personal/withdraw')
  // 绑定了数字货币
  if (isBindDigital)
    return router.push('/personal/withdraw?type=digital')
  // 没有绑定任何提现方式
  return emitter.emit('doWithdraw', '')
}

export function getLangPath() {
  return 'https://dl.alskdoi.com/lang/error/zh.json'
}

export function is403() {
  return location.pathname === '/403'
}
/**
 * 获取服务错误json
 */
export function getErrorJson(): Promise<Record<number, string>> {
  const url = `${getLangPath()}?r=${performance.now()}`
  return new Promise((resolve) => {
    if (is403())
      return resolve('')

    const xhr: any = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.send(null)
    xhr.timeout = 15000
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const jsonStr = xhr.responseText
        resolve(JSON.parse(jsonStr))
      }
    }
  })
}
export const getImgUrl = (path: string) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href
}
// 检测浏览器是否支持webp格式
export const canUseWebp = () => {
  return document.documentElement.classList.value.split(' ').includes('webp')
}

// 检测浏览器是否支持avif格式
export const canUseAvif = () => {
  return document.documentElement.classList.value.split(' ').includes('avif')
}

// 获取浏览器支持的图片格式
export const getSupportImage = (imgs: import('vite-plugin-image-presets').ImageAttrs[]) => {
  if (!imgs?.length)
    return ''
  if (canUseAvif())
    return imgs[0].srcset as string
  if (canUseWebp())
    return imgs[1].srcset as string
  return imgs[2].srcset as string
}

// 获取css中v-bind绑定值
export const getImageUrl = (imgs: import('vite-plugin-image-presets').ImageAttrs[]) => {
  return `url(${getSupportImage(imgs)})`
}

// 返回一个设置背景图片的对象
export const getBackgroundImgObj = (imgs: import('vite-plugin-image-presets').ImageAttrs[]) => {
  return { backgroundImage: `url(${getSupportImage(imgs)})` }
}

// 复制操作
export const handleCopy = (dom: Element, cb?: (text: string) => void) => {
  const text = copy(dom)
  return cb?.(text)
}

// 打开链接,兼用safari打不开的问题
export const openLink = (url: string, target = '_blank') => {
  if (!url)
    return
  let timeId: any = null
  timeId = setTimeout(() => {
    window.open(url, target)
    clearTimeout(timeId)
  }, 30)
}
// 时间格式化
export const formatTime = (time: number | Date) => {
  return format(time, 'yyyy-MM-dd HH:mm:ss') ?? ''
}

// 彩票
export const idWithLott = {
  k3: ['1', '2', '3', '4', '5', '6', '7'],
  pk10: ['8', '9', '10', '11', '12', '13'],
  ll5: ['19', '20', '21', '22', '23', '24', '25', '26'],
  ssc: ['14', '15', '16', '17', '18'],
  lucky28: ['27', '28', '29', '30', '31', '32'],
  lhc: ['33', '34', '35', '36', '37', '38', '39'],
}
export const getTypeByID = (id: string | number): string => {
  const type = findKey(idWithLott, (item: any) => item.includes(String(id))) || ''
  return type
}
// 金额格式化成千位符
export const toThousands = (num: number | string) => {
  // 值不符合要求
  if (isNaN(toNumber(num)))
    return ''
  // 转成字符串
  const numStr = num.toString()
  // 判断是否有小数点
  const hasDot = numStr.includes('.')
  // 没有小数点
  if (!hasDot)
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 如果有小数点，获取整数部分和小数部分
  const [integer, decimal] = numStr.split('.')
  // 整数部分格式化成千位符
  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimal}`
}

// 保留小数点后几位,默认两位，不四舍五入
export const toFloat = (num: number | string, n = 2) => {
  // 值不符合要求,返回空字符串
  if (isNaN(Number(num)))
    return ''
  // 判断是否是小数
  const isFloat = (num.toString().includes('.'))
  // 如果是整数,补全小数点后几位
  if (!isFloat)
    return n > 0 ? `${num}.${'0'.repeat(n)}` : `${num}`
  // 如果是小数,获取整数,小数部分
  const [integer, decimal] = num.toString().split('.')
  // 如果小数部分长度小于n,补全小数点后几位
  if (decimal.length < n) {
    const decimalStr = decimal.padEnd(n, '0')
    return `${integer}.${decimalStr}`
  }
  return `${integer}${n > 0 ? '.' : ''}${decimal.slice(0, n)}`
}

// 保留两位小数，格式化成千位符
export const toThousandsFloat = (num: number | string, decimals?: number) => toThousands(toFloat(num, decimals))

// 金额输入仅支持2位小数,超出的不允许输入
export const toFixAmount = (amount: string) => amount.replace(/^0|[^0-9.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

// 彩票记录 投注内容格式化
export const formatBalls = (balls: string) => {
  return balls.replace(/,/g, ' ').split('_').map((num: any) => {
    return num || '-'
  }).join(',')
}

// 清除注册页面输入资料时保存的资料
export const clearWTF = () => {
  sessionStorage.removeItem('whatCode')
  sessionStorage.removeItem('whatUsername')
  sessionStorage.removeItem('whatPassword')
  sessionStorage.removeItem('whatPhone')
}

// 跳转走势图
export const getCpHost = () => {
  // 判断是否有www，有的话替换成cp，没有的话直接拼接cp
  const { host, origin, protocol } = location
  return host.includes('www.') ? origin.replace('www.', 'cp.') : `${protocol}//cp.${host}`
}

// 跳转聊天室
export const getChatHost = () => {
  // 判断是否有www，有的话替换成chat，没有的话直接拼接chat
  const { host, origin, protocol } = location
  return host.includes('www.') ? origin.replace('www.', 'chat.') : `${protocol}//chat.${host}`
}

// 是否开发环境
export const isDev = () => {
  return import.meta.env.DEV
}

// banner、活动图片地址
export const getImgFromUpload = () => `${isDev() ? import.meta.env.VITE_TEST_DOMAIN : location.origin}/upload`

