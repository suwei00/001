import { startLoading as sLoading } from '@/utils/loading'
import { ref } from 'vue'

export function useLoading() {
  const startTime = ref(0);
  const closeTime = ref(0);
  let loading: any = null;

  const startLoading = () => {
    startTime.value = Date.now();
    loading = sLoading();
  }

  const closeLoading = () => {
    closeTime.value = Date.now();
    if (closeTime.value - startTime.value < 500) {
      setTimeout(() => {
        loading.closeLoading();
      }, 500 - (closeTime.value - startTime.value));
    } else {
      loading.closeLoading();
    }

  }

  return {
    startLoading,
    closeLoading
  }
}