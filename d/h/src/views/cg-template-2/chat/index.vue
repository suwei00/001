<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router';
import { Communicator } from '@/utils/common';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { useDragStore } from '@/store-pinia/drag'

const props = defineProps<{ isShow: boolean }>()

const router = useRouter();
const userStore = userInfoStateStore()
const appStore = useAppStore()
const dragStore = useDragStore()
const { userInfo } = storeToRefs(userStore)
const { token, isLogin } = storeToRefs(appStore)

const visible = ref(true)
let timer: any
const schedule = ref(0)
const LoadingCompleted = () => {
  clearInterval(timer)
  schedule.value = 100
  const t = setTimeout(() => {
    visible.value = false
    clearTimeout(t)
  }, 100)
}
const renderFrame = () => {
  const iframe = document.getElementById('iframe-chat')
  if (iframe) {
    timer = setInterval(() => {
      schedule.value++
      if (schedule.value > 90)
        clearInterval(timer)
    }, 50)
    iframe!.onload = function () {
      LoadingCompleted()
    }
  }
  else {
    setTimeout(() => {
      renderFrame()
    }, 50)
  }
}

const iframeSrc = ref('')
watch(() => props.isShow, (newVal) => {
  if (newVal && !iframeSrc.value) {
    const http = window.location.protocol
    const query = isLogin.value ? `?t=${token.value}&uid=${userInfo.value.uid}&prefix=${userInfo.value.prefix}` : '';
    const chatUrl = globalConfig.IS_DEV ? globalConfig.CHAT_URL : `${http}//chat.${window.location.host.replace('www', '').replace('h5.', '')}`;

    iframeSrc.value = `${chatUrl}${query}`;
    renderFrame()
  }
})

const actionList = {
  balance: () => {
    userStore.getUserInfo();
  }
};

onMounted(() => {
  window.addEventListener('message', ({ data }) => {
    // console.log(data);
    switch (data.action) {
      case 'inteface':
        actionList[data.data] && actionList[data.data]();
        break;

      case 'toPath':
        const {
          data: { path }
        } = data;
        switch (path) {
          case 'back':
            // router.back();
            break;

          case 'login':
            appStore.removeToken()
            router.push({ path: '/entry/login' });
            break;

          case 'deposit':
            // 存款
            router.push({ path: '/deposit' });
            break;

          case 'withdraw':
            // 取款
            router.push({ path: '/withdraw' });
            break;

          case 'winning':
            // 投注记录(当日) 已结算
            router.push({ path: '/bet', query: { src: 'bet' } });
            break;

          case 'unsettlement':
            // 当日 投注记录 未结算
            router.push({ path: '/bet' });
            break;

          case 'discount':
            // 优惠
            router.push({ path: '/promotion' });
            break;

          case 'cskh':
            // 客服
            router.push({ path: '/customer-service' });
            break;

          case 'home':
            // 首页
            router.push({ path: '/home' });
            break;

          case 'bet':
            // 彩票首页
            Communicator.action('publicLaunch', { id: 5, paltInfo: { flags: 1, game_type: 5, id: '8840968486572375835', maintained: 1, name: 'VNCP', seq: 1, state: 1 } });
            break;

          case 'balance':

          default:
            break;
        }
        // 隐藏聊天室
        dragStore.setShowChat(false)
        break;

      default:
        break;
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('message', () => { });
});
</script>
<script lang='ts'>
export default {
  name: 'Chat'
}
</script>

<template>
  <div v-show="isShow" class="chat" id="chat-page">
    <iframe v-if="iframeSrc" id="iframe-chat" allow="clipboard-read; clipboard-write"
      :style="{ height: '100%', width: '100%', opacity: visible ? 0 : 1 }" :src="iframeSrc" />
  </div>
</template>

<style lang="scss" scoped>
.chat {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1990;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
