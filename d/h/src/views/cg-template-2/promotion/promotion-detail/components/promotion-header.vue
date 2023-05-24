<script setup lang='ts'>
import { CgHeader } from '@/components/cg-template-2';
defineProps<{ title: string }>()
</script>
<template>
  <CgHeader>
    <p v-if="title.length <= 30">
      <span>{{ title }}</span>
    </p>
    <van-notice-bar v-else class="promotion-header-bar" background="transparent" :scrollable="true">
      <template #default>
        <span class="text-font" v-html="title"></span>
      </template>
    </van-notice-bar>
  </CgHeader>
</template>
<script lang='ts'>
export default {
  name: 'PromotionHeader'
}
</script>

<style lang='scss' scoped>
.promotion-header-bar {
  width: 90%;
  color: var(--cg-color-black1);
  font: var(--cg-font-h2);
  margin-left: 64px;
}
</style>