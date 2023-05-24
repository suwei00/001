
declare namespace MyT {
 interface levelListParamResult {
  /** vip等级list */
  name: string
  level: number
  /**  1可用 0 不可用 */
  state: number
}
 interface levelUpdateParam {
  // 弹窗 可以选择的vip等级list
  /** vip等级 */
  level: number
}
}
