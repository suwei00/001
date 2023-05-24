<script setup lang="ts">
import { timeConvert } from '@/utils/time';

interface CGTimeProps {
  time: number,// 时间戳
  color?: string,// 颜色
  font?: string,// 字体大小，字重
  format?: string,// 格式化
  isBg?: boolean,// 是否有背景色
}
const props = withDefaults(defineProps<CGTimeProps>(), {
  color: '4',
  font: '11',
  format: 'HH:mm',
  isBg: false,
})
</script>

<template>
  <span :class="[isBg ? 'cg_bg_time' : 'cg_time']"
    :style="`color: var(--cg-color-text-${props.color});font: var(--cg-font-${props.font})`">
    {{ timeConvert(+props.time, props.format) }}
  </span>
</template>

<style lang="scss" scoped>
.cg_bg_time {
  display: inline-block;
  padding: 12px 16px;
  @include transrgba($color-black, 0.3);
  border-radius: 8px;
}
</style>
