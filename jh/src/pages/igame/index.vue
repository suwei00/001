<script lang="ts" setup>
import dayjs from 'dayjs'
import Header from '~/components/Header.vue'

const { query } = useRoute()
const iframeUrl = computed(() => {
  return (query.gameUrl || '') as string
})

// 获取h5浏览器的高度
const iFrameHeight = ref(0)
const hederRef = ref(null)

onMounted(() => {
  const h5Height = document.documentElement.clientHeight
  // const headerHeight = hederRef.value.headerRef.offsetHeight
  const headerHeight = 0
  console.log('h5Height', h5Height, headerHeight)
  iFrameHeight.value = h5Height - headerHeight
})
</script>

<template>
  <div class="iGameContainer">
    
    <iframe :style="{ height: `${iFrameHeight}px` }" :src="iframeUrl" frameborder="0" width="100%" height="100%" />
  </div>
</template>

<style lang="scss" scoped>
</style>
