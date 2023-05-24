import bus from '@/mixins/bus';
import { onUnmounted } from 'vue';

/**
 * @description mitt bus，自动卸载,支持同个事件多次订阅
 */
export default function useBus(name: string, ...res: Array<(data?: any) => void>) {
  res.forEach(fn => bus.on(name, fn));

  onUnmounted(() => {
    res.forEach(fn => {
      bus.off(name, fn);
    });
  });
}
