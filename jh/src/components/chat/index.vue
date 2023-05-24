<script setup lang='ts'>
import useRouterBack from '~/hooks/routerBackHooks'
const props = defineProps<{ isShow: boolean }>()
const { token, userInfo } = storeToRefs(useUserInfoStore())
const visible = ref(true)
const dragState = dragStateStore()
const { goTo } = useRouterBack()
const { clearToken } = useUserInfoStore()

const cpBase = import.meta.env.MODE !== 'production' ? 'https://chat.jlcs001.com' : location.origin.replace('h5.', 'chat.')
const schedule = ref(0)
let timer: any

const iframeSrc = ref()

const LoadingCompleted = () => {
  clearInterval(timer)
  schedule.value = 100
  const t = setTimeout(() => {
    visible.value = false
    clearTimeout(t)
  }, 100)
}

const renderFrame = () => {
  const iframe = document.getElementById('cglottery')
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

watch(() => token.value, (newVal) => {
  if (!newVal)
    iframeSrc.value = ''
})

watch(() => props.isShow, (newVal) => {
  if (newVal && !iframeSrc.value) {
    const chatInfoObj = {
      username: userInfo.value.username,
      uid: userInfo.value.uid,
      level: userInfo.value.level,
      avatar: userInfo.value.avatar,
      chat_id: userInfo.value.chat_id,
    }
    iframeSrc.value = `${cpBase}?t=${token.value}&info=${JSON.stringify(chatInfoObj)}&viewport=${window.innerHeight}`
    renderFrame()
  }
})

onMounted(() => {
  window.addEventListener('message', (data: any) => {
    switch (data.data.action) {
      case 'closeWindow':
        dragState.setShowChat(false)
        break
      case 'outLogin':
        dragState.setShowChat(false)
        goTo('/entry/login')
        clearToken()
        break
      default:
        break
    }
  })
})
</script>

<template>
  <div v-show="isShow" class="chat_content">
    <iframe
      v-if="iframeSrc" id="cglottery" allow="clipboard-read; clipboard-write"
      :style="{ height: '100%', width: '100%', opacity: visible ? 0 : 1 }" :src="iframeSrc"
    />
  </div>
</template>

<style lang='scss' scoped>
.chat_content{
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9997;
}
</style>
