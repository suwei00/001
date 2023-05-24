interface Events {
  // 更新场馆钱包余额
  updateWalletItem: string
  // 已经绑定的提现方式
  doWithdraw: 'bank' | 'digital' | ''
}
// @ts-expect-error 类型提示问题
const emitter = mitt<Events>()
export default emitter
