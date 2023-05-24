import { computed, ref, watch } from 'vue'
import { LogInAndRegister } from '@/utils/logIn';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';

interface ChatWindow {
  width: number[]
  height: number[]
}

export function useChat(chatWindow: ChatWindow) {
  const { token } = storeToRefs(useAppStore());
  const userInfoStore = userInfoStateStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const chatStatus = ref(false);
  const isScreen = ref(false);
  const chatIconMoveStartTime = ref<number | null>(null);
  const chatIconMoveEndTime = ref<number | null>(null);
  

  const chatUrl = computed(() => {
    const url = globalConfig.IS_PROD ? `${window.location.protocol}//chat.${window.location.host.replace('www.', '')}` : globalConfig.CHAT_URL;
    const query = token.value ? `?d=pc&t=${token.value}&uid=${userInfo.value.uid}&prefix=${userInfo.value.prefix}` : '?d=pc';
    return `${url}${query}`;
  })

  const width = computed(() => {
    if (isScreen.value) return chatWindow.width[2];
    if (!chatStatus.value) return chatWindow.width[0];
    return chatWindow.width[1];
  });

  const height = computed(() => {
    if (isScreen.value) return chatWindow.height[2];
    if (!chatStatus.value) return chatWindow.height[0];
    return chatWindow.height[1];
  });

  // 是否是点击事件
  const isClick = computed(() => {
    if (!chatIconMoveStartTime.value || !chatIconMoveEndTime.value) return false;
    return chatIconMoveEndTime.value - chatIconMoveStartTime.value < 200;
  });

  const changeChatStatus = (bool: boolean) => {
    chatStatus.value = bool;
  }

  const chatClick = (bool: boolean) => {
    if (!isClick.value) return;
    console.error('点击', bool)

    if(bool === true) {
      const token = localStorage.getItem('TOKEN');
      if (!token) {
        LogInAndRegister('LogIn')
        return;
      }
    }

    if (bool === false) {
      isScreen.value = false;
    }
    
    changeChatStatus(bool);
  }

  const changeScreen = () => {
    isScreen.value = !isScreen.value;
  }

  watch(token, (val) => {
    if (!val) {
      changeChatStatus(false);
    }
  })

  return {
    width,
    height,
    chatStatus,
    chatUrl,
    chatClick,
    changeChatStatus,
    chatIconMoveStartTime,
    chatIconMoveEndTime,
    changeScreen,
  }
}