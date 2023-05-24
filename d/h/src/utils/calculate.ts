import _ from 'lodash'
// 保留几位小数
const keepDecimals = (val: any, num: any = 2) => {
    return _.floor(val, num)
}

export {
    keepDecimals
}