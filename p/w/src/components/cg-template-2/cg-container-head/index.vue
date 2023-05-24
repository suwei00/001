<script setup lang='ts'>
import { computed } from 'vue';
import type CgContainerHead from './index';
interface Props extends CgContainerHead.Props {
  height?: string,
  padding?: string,
  bg?: string
}
const props = withDefaults(defineProps<Props>(), { height: '48', padding: '10', bg: '' })
</script>
<template>
  <div class="cg-container-head">
    <div class="cg_default" :style="{
      height: `${height}px`,
      background: bg ? `var(${props.bg})` : `var(--cg-gradient-white-blue-head)`,
    }">
      <div class="header_left" :style="`left:${padding}px`">
        <slot name="left"></slot>
      </div>
      <div class="header_center">
        <slot name="center"></slot>
      </div>
      <div class="header_right" :style="`right:${padding}px`">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CGContainerHead'
}
</script>
<style lang='scss' scoped>
.cg-container-head {
  width: 100%;

  .cg_default {
    height: 100%;
    font: var(--cg-font-text1);
    color: var(--cg-color-grey1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .header_left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      max-height: 100%;
      overflow: hidden;
    }

    .header_right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      max-height: 100%;
      overflow: hidden;
    }
  }
}
</style>