/**
 * @description 防抖函数
 * @param fn
 * @param wait
 * @return {debounced}
 * @Author: Jango
 * @Date: 2023年05月5日
 * @LastEditors: Jango
 * @LastEditTime: 2023年05月5日
 */
export function debounce(fn: any, wait: number) {
  const callback = fn;
  let timerId: any = null;
  
  const debounced = () => {
    // 保存作用域
    const context = this;
    // 保存参数，例如 event 对象
    const args = arguments;

    clearTimeout(timerId);
    timerId = setTimeout(function () {
      callback.apply(context, args);
    }, wait);
  }

  // 返回一个闭包
  return debounced;
}

/**
 * @description 节流函数
 * @param fn
 * @return {throttle}
 * @Author: Jango
 * @Date: 2023年05月5日
 * @LastEditors: Jango
 * @LastEditTime: 2023年05月5日
 */
export function throttle(func: any, wait: number) {
  let timeout: any;
  
  return  () => {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
