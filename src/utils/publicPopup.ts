import { h, render } from 'vue'
import CgDialog from '@/components/cg-dialog/index.vue'

// 确认弹窗
export const cgDialog = ({ title, content, content2, cancelText, confirmText, isCancel, onOk }: CGDialogProps) => {
  if (document.getElementById('cgDialogID'))
    document.getElementById('cgDialogID')?.remove()

  const vnode = h(CgDialog, { title, content, content2, cancelText, confirmText, isCancel, onOk })
  const div = document.createElement('div')
  div.id = 'cgDialogID'
  document.body.appendChild(div)
  render(vnode, div)
}
