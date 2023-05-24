import { defineComponent, createVNode, render } from 'vue';
import LoadingComponent from './loading.vue';

const LoadingConstructor = defineComponent(LoadingComponent);

let instance: any;
interface Loading {
  open: () => void;
  close: (test?: string) => void;
}
let isLoading = false;
export function useLoading(): Loading {
  const loding = {
    open() {
      if (!isLoading) {
        isLoading = true;
        instance = createVNode(LoadingConstructor);
        const container = document.createElement('div');
        render(instance, container);
      }
    },
    close(test?: string) {
      if (isLoading) {
        console.log(test);
        console.log('关闭LOADING');
        instance.component.proxy.close();
        isLoading = false;
      }
    }
  };
  return loding;
}
