const locationName = ['', '大', '小', '单', '双', '质', '合']
const sumName = ['', '和大', '和小', '和单', '和双']
const leng6 = ['', '大', '小', '单', '双', '龙', '虎']
const dragonTiger = ['', '龙', '虎', '和']
const to5 = ['', '5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双']
const chineseZodiacList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
// 头尾
const headAndTail = [
  '0头',
  '1头',
  '2头',
  '3头',
  '4头',
  '0尾',
  '1尾',
  '2尾',
  '3尾',
  '4尾',
  '5尾',
  '6尾',
  '7尾',
  '8尾',
  '9尾',
]
export function translateText(text, type) {
  let _l1, _l2, _l3, _l4, _l5
  switch (type) {
    case 'dxds2_front':
    case 'dxds2_back':
    case 'dxds3_front':
    case 'dxds3_back':
      _l1 = text.split('_').map((row) => {
        const _row1 = row.split(',')
        return _row1.map((r) => {
          return locationName[r]
        })
      })
      return _l1.map(row => (row.length ? row.join(' ') : '-')).join(',')
    case 'lmzh':
    case 'gyh':
      return sumName[text]
    case 'lmwan':
    case 'lmqian':
    case 'lmbai':
    case 'lmshi':
    case 'lmge':
      return locationName[text]
    case 'lhdwq':
    case 'lhdwb':
    case 'lhdws':
    case 'lhdwg':
    case 'lhdqb':
    case 'lhdqs':
    case 'lhdqg':
    case 'lhdbs':
    case 'lhdbg':
    case 'lhdsg':
      return dragonTiger[text]
    case 'first':
    case 'second':
    case 'third':
    case 'fourth':
    case 'fifth':
    case 'sixth':
    case 'seventh':
    case 'eight':
    case 'ninth':
    case 'tenth':
      return leng6[text]
    case 'dds':
      _l2 = text.split(',').map((it) => {
        return to5[it]
      })
      return _l2.join(',')
    case 'fxl':
    case 'sxl':
    case 'exl':
    case 'hxbz':
    case 'hxz':
      _l4 = text.split(',').map((it) => {
        return chineseZodiacList[it - 1]
      })
      return _l4.join(' ')
    case 'tmtw':
      return headAndTail[text]
    case 'ewl':
    case 'swl':
    case 'fwl':
      _l5 = text.split(',').map((it) => {
        return `${it}尾`
      })
      return _l5.join(' ')
    default:
      _l3 = text.replace(/,/g, ' ').split('_')
      _l3 = _l3.map((num) => {
        return num || '-'
      })
      return _l3.join(',')
  }
}
const rederResult = (id, result) => {
  let _result = result
  if (id && lotteryType.lhc.includes(id.toString()))
    _result = result.slice(0, 17) + result.slice(17).replace(',', '+')

  return _result || ' - '
}
