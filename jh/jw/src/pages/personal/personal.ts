// 获取报表里面的成功或失败的样式
export const getReportStatusClass = (val: number | string) => {
  const value = toNumber(val)
  if (value === 0)
    return ''
  return val > 0 ? 'color-color-primary-second' : 'color-color-error'
}

// 获取投注状态
export const getFlag = (value: number) => {
  const item = betStateList.find(item => item.value === `${value}`)
  return item ? item.label : ''
}

// 获取彩票投注状态
export const getCpState = (value: number) => {
  const item = cpBetState.find(item => item.value === `${value}`)
  return item ? item.label : ''
}
// 获取彩票详情模式
export const getCpModel = (value: number) => {
  const item = cpModel.find(item => item.value === `${value}`)
  return item ? item.label : ''
}

//  获取交易类型
export const getTradeType = (value: number) => {
  const item = tradeTypeList.find(item => item.value === value)
  return item ? item.label : ''
}
// 获取交易状态
export const getTradeState = (value: number) => {
  return tradeStateList.find(item => item.value === value)?.label ?? ''
}
// 获取交易状态样式
export const getTradeStateClass = (value: number) => {
  const item = tradeStateList.find(item => item.value === value)
  if (!item?.type)
    return ''
  if (item.type === 1)
    return 'color-color-primary-second'
  return 'color-color-error'
}

// 获取反水类型
export const getRebateType = (value: number) => {
  return rebateTypeList.find(item => item.value === value)?.label ?? ''
}
