import { h, render } from 'vue'
import router from '~/router/index'
import FinancePopup from '~/components/publicPopup/finance-popup.vue'
import LoginPopup from '~/components/publicPopup/login-popup.vue'
import BetDetailPopup from '~/components/publicPopup/bet-detail-popup.vue'

/**
 *
 *
 * @export 银行卡充值提现弹窗
 * @param {('deposit' | 'withdraw')} type 类型
 * @param {string} id 通道id 提款为999
 */
export function financePopup(type: 'deposit' | 'withdraw', id: string) {
  // 是否弹窗提醒
  checkFinancePopupState({ id }).then((res) => {
    if (res) {
      if (document.getElementById('financePopupID'))
        document.getElementById('financePopupID')?.remove()

      const vnode = h(FinancePopup, { type, id })
      const div = document.createElement('div')
      div.id = 'financePopupID'
      document.body.appendChild(div)
      render(vnode, div)
    }
  })
}

/**
 *
 *
 * @export 登陆弹窗
 */
export function loginPopup() {
  if (document.getElementById('loginPopupID'))
    document.getElementById('loginPopupID')?.remove()

  const vnode = h(LoginPopup, { goLogin: () => { router.push('/entry/login') } })
  const div = document.createElement('div')
  div.id = 'loginPopupID'
  document.body.appendChild(div)
  render(vnode, div)
}

/**
 *
 *
 * @export 投注明细弹窗
 * @param {string} type 玩法
 * @param {string} data 投注内容
 */
export function betDetailPopup(type: string, data: string) {
  if (document.getElementById('betDetailPopupID'))
    document.getElementById('betDetailPopupID')?.remove()

  const vnode = h(BetDetailPopup, { type, data })
  const div = document.createElement('div')
  div.id = 'betDetailPopupID'
  document.body.appendChild(div)
  render(vnode, div)
}
