import { useLhcData } from '~/hooks/useLhcData'

const { shengxiaoDataGenerated, getShenxiaoNameList, weishuNameList } = useLhcData()
const locationName: Array<string> = ['', '大', '小', '单', '双', '质', '合']
const sumName: Array<string> = ['', '和大', '和小', '和单', '和双']
const leng6: Array<string> = ['', '大', '小', '单', '双', '龙', '虎']
const to5: Array<string> = ['', '5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双']
const dragonTiger: Array<string> = ['', '龙', '虎', '和']
const shenxiaoData = shengxiaoDataGenerated()

export function translateText(text: any, type: string) {
  let _l1: any, _l2: any, _l3: any
  let _row1: any
  if (!text || !type)
    return ''
  switch (type) {
    case 'dxds2_front':
    case 'dxds2_back':
    case 'dxds3_front':
    case 'dxds3_back':
      _l1 = text.split('_').map((row: any) => {
        _row1 = row.split(',')
        return _row1.map((r: any) => {
          return locationName[r] as any
        })
      })
      return _l1.map((row: any) => (row.length ? row.join(' ') : '-')).join(',')
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
      _l2 = text.split(',').map((it: any) => {
        return to5[it]
      })
      return _l2.join(',')
    case 'tmtw':
    case 'ewl':
    case 'swl':
    case 'fwl':
      return weishuNameList(type, text)

    case 'hxz':
    case 'hxbz':
    case 'exl':
    case 'sxl':
    case 'fxl':
      return getShenxiaoNameList(shenxiaoData, text)

    default:
      _l3 = text.replace(/,/g, ' ').split('_')
      _l3 = _l3.map((num: any) => {
        return num || '-'
      })
      return _l3.join(',')
  }
}

export function translateTextByList(text: any, type: string) {
  let _l1: any, _l2: any, _l3: any
  if (!text || !type)
    return ''
  switch (type) {
    case 'dxds2_front':
    case 'dxds2_back':
    case 'dxds3_front':
    case 'dxds3_back':
      _l1 = text.split(',').map((row: any) => {
        _l2 = row.split(' ')
        return _l2.map((r: any) => {
          return locationName[r] as any
        })
      })
      return _l1.map((row: any) => (row.length ? row.join(' ') : '-')).join(',')
    default:
      _l3 = text.split(',')
      _l3 = _l3.map((num: any) => {
        return num || '-'
      })
      return _l3.join(',')
  }
}
