import { h, render } from 'vue'
import toast from '@cg-template-1-components/cg-toast/index.vue'

export function CGToast(message: string) {
  if (document.getElementById('CGToastID')) {
    document.getElementById('CGToastID')?.remove()
  }

  const vnode = h(toast, { message })
  const div = document.createElement('div')
  div.id = 'CGToastID'
  document.body.appendChild(div)
  render(vnode, div)
}