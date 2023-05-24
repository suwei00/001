import { useLoading } from '@template-components/loading';
import { Directive } from 'vue';
const { open, close } = useLoading();
// p3-loading效果指令
const loading: Directive = {
  beforeMount(el: Element) {
    open();
  },
  updated(el: Element, bind) {
    if (bind.value) {
      open();
    } else {
      close();
    }
  }
};
export default loading;
