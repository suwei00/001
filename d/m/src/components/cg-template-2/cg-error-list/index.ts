import { isArray } from 'lodash';
import { defineComponent, isVNode, createVNode, render } from 'vue';
import toastComponent from './index.vue';
// @ts-ignore
const ToastConstructor = defineComponent(toastComponent);

interface ToastProps {
  message?: string;
  zIndex?: number;
  duration?: number;
}
interface ToastImplements {
  multiple(value: boolean): void;
  [propName: string]: any;
  (options: any): any;
}
let instance: any;
let instances: any[] = [];
let isMultiple: boolean = false; // 是否同时存在多个
let zIndex = 2001;
const ToastError: ToastImplements = (options: any) => {
  if (window === undefined) return;

  if (isArray(options)) {
    options = {
      list: options
    };
  }
  mergeOptions(options);

  // 筛选出未关闭的toast, 已关闭的从dom移除
  instances = instances.filter(item => {
    const { show } = item.component.proxy;
    return show;
  });

  // 清空显示
  if (instances.length && !isMultiple) {
    instances.forEach(item => {
      item.component.proxy.close();
    });
  }
  // 创建新的toast
  instance = createVNode(ToastConstructor, options, isVNode(options.list) ? { default: () => options.list } : null);

  const container = document.createElement('div');
  render(instance, container);
  instance.close = () => {
    instance.component.proxy.close();
  };

  instances.push(instance);
  return instance;
};
ToastError.multiple = (value: boolean) => {
  isMultiple = value;
};

const mergeOptions = (options: ToastProps) => {
  zIndex++;
  return {
    ...options,
    zIndex
  };
};

export default ToastError;
