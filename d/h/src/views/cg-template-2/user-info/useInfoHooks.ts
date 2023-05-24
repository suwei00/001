import { ref, computed } from 'vue';
import { useCountDown } from '@vant/use';

export const useShowCountdown = (ctime: number) => {
  const countDown = useCountDown({
    time: ctime,
    onFinish: () => {
      counting.value = false;
      countDown.reset();
    }
  });

  const counting = ref(false);
  const allseconds = computed(() => Math.floor(countDown.current.value.total / 1000));
  const start = () => {
    countDown.start();
    counting.value = true;
  };

  return {
    startCount: start,
    allseconds,
    counting
  };
};
