<script setup lang="ts" name="sport-esport-iframe">
// 体育和电竞的iframe公用页面
const { url } = defineProps<{ url: string }>()
</script>

<template>
  <iframe :key="url" :src="url" frameborder="0" />
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 1400px;
}
</style>

<route lang="yaml">
meta:
  layout: main
  key: sport-iframe
</route>
