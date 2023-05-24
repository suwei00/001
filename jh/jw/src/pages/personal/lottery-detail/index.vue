<script setup lang='ts' name="lottery-detail">
import cpDetail from './components/cp-detail/index.vue'
import futureDetail from './components/future-detail/index.vue'

const type = ref(1)
const typeList = [{
  label: '彩票详情',
  value: 1,
}, {
  label: '追号详情',
  value: 2,
}]
</script>

<template>
  <div class="lottery-detail">
    <personal-title :hider-border="true" title="彩票明细" />
    <jl-tabs v-model="type" :list="typeList" />
    <cp-detail v-if="type === 1" />
    <future-detail v-else />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.lottery-detail {
  @include pageCard;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
