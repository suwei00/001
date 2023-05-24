import dayjs from 'dayjs'
import { uniqBy } from 'lodash-es'

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

// 检测浏览器是否支持webp格式
export const canUseWebp = () => {
  return document.documentElement.classList.value.split(' ').includes('webp')
}

// 检测浏览器是否支持avif格式
export const canUseAvif = () => {
  return document.documentElement.classList.value.split(' ').includes('avif')
}
// 获取浏览器支持的图片格式
export const getSupportImage = (imgs: any) => {
  if (!imgs?.length)
    return ''
  if (canUseAvif())
    return imgs[0].srcset as string
  if (canUseWebp())
    return imgs[1].srcset as string
  return imgs[2].srcset as string
}

// 获取css中v-bind绑定值
export const getImageUrl = (imgs: any) => {
  return `url(${getSupportImage(imgs)})`
}

const setAtName = (list: Array<any>, str: string) => {
  const active: any = list.find(x => x.username === str)
  if (active)
    return active.nick_name
  else
    return str
}

export const unescapeHtml = (html: any, del?: number) => {
  const chatState = chatStateStore()
  const { isManage, memberList } = storeToRefs(chatState)
  if (del) {
    return '<span style="color:#C5CBE0">消息已被删除</span>'
  }
  else {
    const _html = html.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&nbsp;/g, ' ')

    const Div = document.createElement('div')
    Div.innerHTML = _html
    let __html = Div.innerText
    __html = __html.replace(/(\[)([^\]]{2})([^\]]*)([^\]]{1})(\])/g, ($0, $1, $2, $3, $4, $5): any => {
      return `${$1}${setAtName(memberList.value, `${$2}${$3}${$4}`)}${$5}`
    })
    return isManage.value ? __html.replace(/(\[)([^\]]*)(\])/g, '<span style="color:#597EF7">$2</span>') : __html.replace(/(\[)([^\]]{2})([^\]]*)([^\]]{1})(\])/g, '<span style="color:#597EF7">$2***$4</span>')
  }
}

export const unescapeHtmlList = (html: any) => {
  const _html = html.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&nbsp;/g, ' ')

  const Div = document.createElement('div')
  Div.innerHTML = _html
  return Div.innerText
}

export const removeHtmlTag = (str: string) => {
  return str.replace(/<[^>]+>/g, '')
}

export const unescapeSearch = (html: any, search: string) => {
  const Div = document.createElement('div')
  Div.innerHTML = html
  const _html = Div.innerText
  try {
    return _html
      .replace(_html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&nbsp;/g, ' ')
      .replace(/\[/g, '<span style="color:#597EF7">')
      .replace(/\]/g, '</span>')
      .replace(new RegExp(`(${search})`, 'g'), '<span style="color:#597EF7">$1</span>')
  }
  catch {
    return _html
      .replace(_html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&nbsp;/g, ' ')
      .replace(/\[/g, '<span style="color:#597EF7">')
      .replace(/\]/g, '</span>')
  }
}

export const setTimeView = (time: any) => {
  const resultDay = dayjs(time * 1000)
  const toDay = dayjs()
  const yesterday = toDay.subtract(1, 'day')
  if (toDay.isSame(resultDay, 'day'))
    return resultDay.format('HH:mm')
  else if (yesterday.isSame(resultDay, 'day'))
    return `昨天${resultDay.format('HH:mm')}`
  else
    return resultDay.format('MM/DD HH:mm')
}

export const addDateItem = (list: Array<ChatT.ChatType>) => {
  const toDay = dayjs().format('YYYY/MM/DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY/MM/DD')
  const alreadyExist: Array<string> = []
  const copyList: Array<ChatT.ChatType> = []
  let _list = uniqBy(list.filter(t => t.f !== 't'), 'ts')
  _list = _list.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
  _list.forEach((item: ChatT.ChatType) => {
    const day = dayjs(Number(item.t) * 1000).format('YYYY/MM/DD')
    if (!alreadyExist.includes(day)) {
      alreadyExist.push(day)
      const _day = toDay === day ? '今天' : day === yesterday ? '昨天' : dayjs(Number(item.t) * 1000).format('MM/DD')
      const addItme: any = { id: `t_${item.ts}`, f: 't', c: _day, is_del: 0, ts: item.ts, t: item.t }
      copyList.push(addItme)
    }
    item.id = item.ts
    copyList.push(item)
  })
  return copyList
}

export const nameDesensitization = (name: string | undefined, isManage: boolean) => {
  return isManage ? name : `${name?.slice(0, 2)}***${name?.slice(name.length - 1)}`
}

export const cgXor = (a: Array<string>, b: Array<string>) => {
  a.forEach((item) => {
    const _inx = b.indexOf(item)
    b.splice(_inx, 1)
  })
  return b.join('')
}

export const showImgType = (url: string) => {
  let suffix = ''
  if (canUseAvif())
    suffix = '?x-oss-process=image/resize,w_200/format,avif'
  else if (canUseWebp())
    suffix = '?x-oss-process=image/format,webp'

  return `${url}${suffix}`
}

export const viewImgType = (url: string) => {
  let suffix = ''
  if (canUseWebp())
    suffix = '?x-oss-process=image/format,webp'

  return `${url}${suffix}`
}

