import { onBeforeUnmount, onMounted, onUnmounted, Ref, unref, watchEffect } from 'vue';

/**
 * @description 锁定body滚动
 * @param {Ref} visible
 */
export default function useLockScroll(visible: Ref<boolean> | boolean) {
  watchEffect(() => (document.body.style.overflow = unref(visible) ? 'hidden' : ''));
  onBeforeUnmount(() => {
    document.body.style.overflow = '';
  });
}
