<script setup lang='ts' name="personal-empty">
import emptyImg from '@images/personal/personal-empty.png?preset=full'
const { desc = '暂无数据' } = defineProps<{ desc?: string }>()
</script>

<template>
  <div class="personal-empty">
    <slot name="image">
      <jl-image :src="emptyImg" w-355px h-165px />
    </slot>
    <span class="text">{{ desc }}</span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.personal-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text {
    color: #94A6B7;
    line-height: 20px;
    font-size: 15px;
  }
}
</style>

