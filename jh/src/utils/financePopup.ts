import { h, render } from 'vue'
import popup from '~/components/popAmountCard.vue'

export default function financePopup(type: 'deposit' | 'withdraw', id: string) {
  // 是否弹窗提醒
  checkFinancePopupState({ id }).then((res: any) => {
    if (res?.data) {
      if (document.getElementById('financePopup'))
        document.getElementById('financePopup')?.remove()

      const vnode = h(popup, { type, id })
      const div = document.createElement('div')
      div.id = 'financePopup'
      document.body.appendChild(div)
      render(vnode, div)
    }
  })
}
