<script setup lang='ts'>
import type CgContainerHead from './index';
interface Props extends CgContainerHead.Props {
  height?: string,
  padding?: string,
  bg?: string,
  font?:string,
}
const props = withDefaults(defineProps<Props>(), { height: '80', padding: '0', bg: '' ,font:''})
</script>
<template>
  <div class="cg-container-head">
    <div class="cg_default" :style="{
      height: `var(--cg-px-${height})`,
      background: bg ? `var(${props.bg})` : `var(--cg-gradient-white-blue)`,
      font: font ? `var(${props.font})` : `var(--cg-font-text1)`,
    }">
      <div class="header_left" :style="`left:var(--cg-px-${padding})`">
        <slot name="left"></slot>
      </div>
      <div class="header_center">
        <slot name="center"></slot>
      </div>
      <div class="header_right" :style="`right:var(--cg-px-${padding})`">
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
  .cg_default {
    padding: 0 18px;
    font: var(--cg-font-text1);
    color: var(--cg-color-black1);
    background: var(--cg-gradient-white-blue);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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