<script lang="ts" setup>
import CreateMqtt from '@/utils/socket.js'

const { setToken } = useAppStore()
const { setInfo } = useUserStore()

const params = new URLSearchParams(location.search)
setToken(params.get('t') ?? '')
setInfo(params.get('info') ?? '')
if (params.get('viewport'))
  sessionStorage.setItem('viewport', params.get('viewport') ?? '')
else
  sessionStorage.removeItem('viewport')

sessionStorage.setItem('WINDOW_TYPE', params.get('windowType') ?? 'H5')

document.documentElement.style.setProperty('--viewport-height', `${sessionStorage.getItem('viewport') || window.innerHeight}px`)

onMounted(() => {
  CreateMqtt.mqttConnect()
})

onUnmounted(() => {
  CreateMqtt.mqttDisconnect()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/scss/index.scss';
</style>
