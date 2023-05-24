import { startLoading as sLoading } from '@/utils/loading'
import { ref } from 'vue'

export function useLoading() {
  const startTime = ref(0);
  const closeTime = ref(0);
  let loading: any = null;

  let timer: any = null;

  const startLoading = () => {

    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      startTime.value = Date.now();
      loading = sLoading();
    }

  }

  const closeLoading = () => {
    closeTime.value = Date.now();
    const time = (closeTime.value - startTime.value < 500) ? 500 - (closeTime.value - startTime.value) : 0;
    timer = setTimeout(() => {
      loading.closeLoading();
      timer = null;
    }, time);
  }

  return {
    startLoading,
    closeLoading
  }
}