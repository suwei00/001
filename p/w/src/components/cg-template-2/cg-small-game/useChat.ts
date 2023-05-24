import { computed, ref } from 'vue';
import { LogInAndRegister } from '@/utils/logIn';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store-pinia';
import { launchVanue } from '@/utils/gameVenue';

export function useChat() {
  const { token } = storeToRefs(useAppStore());
  const chatIconMoveStartTime = ref<number | null>(null);
  const chatIconMoveEndTime = ref<number | null>(null);

  // 是否是点击事件
  const isClick = computed(() => {
    if (!chatIconMoveStartTime.value || !chatIconMoveEndTime.value) return false;
    return chatIconMoveEndTime.value - chatIconMoveStartTime.value < 200;
  });

  const chatClick = () => {
    if (!isClick.value) return;
    if (!token.value) {
      LogInAndRegister('LogIn');
      return;
    }
    launchVanue({ id: '46814147030678', key: 'game' });
  };

  return {
    chatClick,
    chatIconMoveStartTime,
    chatIconMoveEndTime
  };
}
