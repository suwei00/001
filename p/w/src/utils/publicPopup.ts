import { h, render } from 'vue';
import P3Dialog from '@template-components/p3-dialog/index.vue';

export interface DialogProps {
  component: any
  title: string;
  showClose?: boolean;
  closeClick?: boolean;
  fixed?: boolean;
  onOk?: (data?: any) => void;
  onClose?: () => void,
  data?: any
}

export const cgDialog = ({ title, component, showClose, closeClick, fixed, onOk, onClose, data = {} }: DialogProps) => {
  const id = guid()
  const removeNode = () => {
    if (document.getElementById(id)) {
      document.getElementById(id)?.remove()
    }
  }

  const closeModel = () => {
    removeNode()
    if (onClose) {
      onClose()
    }
  }

  const okModel = (result: any) => {
    removeNode()
    if (onOk) {
      onOk(result)
    }
  }
  const vnode = h(P3Dialog, { title, showClose, closeClick, fixed, onClose: closeModel }, [h(component, { onClose: closeModel, onOk: okModel, ...data })])
  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
  render(vnode, div);

  return removeNode
};

const guid = () => {
  let idStr = Date.now().toString(36)
  idStr += Math.random().toString(36).substr(2)
  return idStr
}
