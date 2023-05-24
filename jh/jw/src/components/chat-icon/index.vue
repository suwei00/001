<script setup lang='ts'>
import chatIcon from '@images/home/chat_iocn.png?preset=full'
import scaling from '@icons/personal/finance/close-icon.svg?preset=full'

const chatIconRef = ref()
const chatIconMoveStartTime = ref<number | null>(null)
const chatIconMoveEndTime = ref<number | null>(null)
const { width: windowWidth, height: widthHeight } = useWindowSize()
const ballWidth = 64
const isOpen = ref(false)
const iframeSrc = ref('')
const router = useRouter()
const appStore = useAppStore()
const { token } = $(storeToRefs(appStore))
const userStore = useUserStore()
const isDrag = ref(false)
const { userInfo }: any = $(storeToRefs(userStore))
const chatHost = getChatHost()
const cpBase = import.meta.env.MODE !== 'production' ? import.meta.env.VITE_CHAT_URL : chatHost

const { x, y, style } = useDraggable(chatIconRef, {
  initialValue: { x: windowWidth.value - ballWidth, y: widthHeight.value - ballWidth - 300 },
  onStart() {
    isDrag.value = true
    chatIconMoveStartTime.value = new Date().getTime()
  },
  onEnd() {
    isDrag.value = false
    chatIconMoveEndTime.value = new Date().getTime()
  },
})

// 判断是不是点击
const isChatIconClick = computed(() => {
  if (!chatIconMoveStartTime.value || !chatIconMoveEndTime.value)
    return false
  return chatIconMoveEndTime.value - chatIconMoveStartTime.value < 200
})

// 小球范围限制
watch([x, y], () => {
  if (x.value <= 0)
    x.value = 0
  if (y.value <= 84)
    y.value = 84
  if (x.value > windowWidth.value - ballWidth)
    x.value = windowWidth.value - ballWidth
  if (y.value > widthHeight.value - ballWidth)
    y.value = widthHeight.value - ballWidth
})

const openChat = () => {
  if (!isChatIconClick.value)
    return
  if (!token)
    return router.push('/entry/login')
  const chatInfoObj = {
    username: userInfo.username,
    uid: userInfo.uid,
    level: userInfo.level,
    avatar: userInfo.avatar,
    chat_id: userInfo.chat_id,
  }
  iframeSrc.value = `${cpBase}?t=${token}&info=${JSON.stringify(chatInfoObj)}&viewport=656&windowType=pc`
  isOpen.value = true
  x.value = (windowWidth.value - 370) / 2
  y.value = 84
}

const closure = () => {
  isOpen.value = false
  x.value = windowWidth.value - ballWidth
  y.value = widthHeight.value - ballWidth - 300
}

onMounted(() => {
  window.addEventListener('message', (data: any) => {
    switch (data.data.action) {
      case 'closeWindow':
        closure()
        break
      case 'outLogin':
        router.push('/entry/login')
        break
      default:
        break
    }
  })
})
</script>

<template>
  <div ref="chatIconRef" class="chat" :style="style" :class="{ chat_h: isOpen }" @mousedown.prevent.stop="null">
    <div v-if="isOpen" class="chat_window">
      <img class="scaling" :src="getSupportImage(scaling)" @click="closure">
      <div class="window_frame">
        <div v-if="isDrag" class="frame_cover" />
        <iframe
          v-if="iframeSrc"
          id="cgChat" allow="clipboard-read; clipboard-write" :style="{ height: '100%', width: '100%' }"
          :src="iframeSrc"
        />
      </div>
    </div>
    <div
      v-else id="chat-icon" class="chat-icon"
      @click="openChat"
    >
      <img :src="getSupportImage(chatIcon)">
    </div>
  </div>
  <div v-if="isDrag" class="main_global" />
</template>

<style lang='scss' scoped>
.main_global{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.chat {
  position: fixed;
  right: 0px;
  top: 70%;
  z-index: 2000;
  width: 58px;
  height: 60px;

  .chat-icon {
    width: 58px;
    height: 60px;
    cursor: pointer;
    box-shadow: 0px 0px 10px #fcefd5;
    border-radius: 50%;
    user-select: none;

    &:hover {
      animation: jelly 0.5s;
    }
  }

  .chat_window{
    width: 370px;
    height: 690px;
    border-radius: 16px;
    background-color: #FFFFFF;
    box-shadow: 0px 6px 12px 1px rgba(0,0,0,0.16);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .window_frame{
      position:relative;
      padding: 10px;
      padding-top: 0px;
      flex: 1;
      width: 100%;
    }

    .scaling{
      width: 12px;
      height: 12px;
      margin: 4px 10px;
      margin-top: 8px;
    }
  }

  .frame_cover{
    position: absolute;
    width: 350px;
    height: 653px;
  }
}

@keyframes jelly {

  0%,
  100% {
    transform: scale(1, 1);
  }

  33% {
    transform: scale(0.9, 1.1);
  }

  66% {
    transform: scale(1.1, 0.9);
  }
}

.chat_h{
  width: 370px;
  height: 690px;
}
</style>
