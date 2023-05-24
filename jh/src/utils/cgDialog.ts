import { h, render } from 'vue'
import CgDialog from '~/components/cgDialog.vue'
interface CGDialogProps {
  title: string
  content: string
  cancelText?: string
  confirmText?: string
  isCancel?: boolean
  isConfirm?: boolean
  onOk: () => void
}
// 确认弹窗
export const cgDialog = ({ title, content, cancelText, confirmText, isCancel, isConfirm, onOk }: CGDialogProps) => {
  if (document.getElementById('cgDialogID'))
    document.getElementById('cgDialogID')?.remove()

  const vnode = h(CgDialog, { title, content, cancelText, confirmText, isCancel, isConfirm, onOk })
  const div = document.createElement('div')
  div.id = 'cgDialogID'
  document.body.appendChild(div)
  render(vnode, div)
}
