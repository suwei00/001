import { KEYS, encryptQuery } from './xxtea'
import { murmurhash3_32_gc } from './murmurhash3.js'
export function sign(method, data, path, t) {
  const l_t = t
  let _path = ''
  let signStr = ''
  if (method.toLocaleString() === 'get') {
    // get请求 如果是 json
    _path = path.lastIndexOf('.json') > -1 ? path : pare(data) ? `/${path}&${pare(data)}` : `/${path}`
    if (_path.includes('//'))
      _path = _path.replace('//', '/')
    signStr = KEYS['25'] + l_t + _path
  }
  else if (method.toLocaleString() === 'post') {
    _path = `/${path}`
    if (_path.includes('//'))
      _path = _path.replace('//', '/')
    const s = encryptQuery(data)
    signStr = s + KEYS['25'] + l_t + _path
  }
  // console.log(`⚽接口: ${path},📊请求参数: `, data)
  signStr += '1.0.0'
  // console.groupCollapsed(`🔑🔑签名参数--${path}🔑🔑`)
  // console.log('nonce加密前的字符串', signStr)
  // console.log('nonce-------', murmurhash3_32_gc(signStr, 36))
  // console.groupEnd()
  return murmurhash3_32_gc(signStr, 36)
}

function pare(params = {}) {
  const query = []
  for (const key in params) {
    const value = params[key]
    if (value !== undefined && value !== null)
      query.push(`${key}=${value}`)
  }
  return query.join('&')
}
