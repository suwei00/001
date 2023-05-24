// 倒计时 时间格式化
export const downTimeFormat = (time: number, format = 'ss') => {
  let second = Math.floor(time / 1000) % 60
  const minute = Math.floor(time / 1000 / 60) % 60
  const hour = Math.floor(time / 1000 / 60 / 60) % 24
  const day = Math.floor(time / 1000 / 60 / 60 / 24)
  if (format === 'ss')
    second = Math.floor(time / 1000)

  const formatObj: any = {
    dd: day,
    hh: hour,
    mm: minute,
    ss: second,
  }
  return format.replace(/(dd+|hh+|mm+|ss+)/g, (result, key) => {
    let value = formatObj[key]
    if (key.length > 1 && value < 10) {
      if (format === 'ss')
        value = `${value}`

      else
        value = `0${value}`
    }
    return value || 0
  })
}
// 日期格式化 formatDate(time,'yyyy-MM-dd hh:mm:ss')
export function formatDate(date: any, fmt: any) {
  if (typeof date !== 'number')
    date = Number(date)

  if (date < 1) {
    return ''
  }
  else {
    date = new Date(date)
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))

    const o: any = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }
    return fmt
  }
}

function padLeftZero(str: any) {
  return (`00${str}`).substr(str.length)
}

