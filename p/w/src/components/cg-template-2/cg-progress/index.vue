<template>
  <div :class="['cg-progress', position]">
    <div :class="['cg-progress-item', position]" :style="{height:`var(--cg-px-${height})`,borderRadius:`var(--cg-px-${Number(height)/2})`}">
      <!-- <div class="cg-progress-style-b-item" :style="progress_style_b !== '100%' ? { width: `${checkRadio}%` } : { width: `100%` }"></div> -->
      <div class="cg-progress-style-b-item" :style="{ width: `${rate}%`, borderRadius: round ? `var(--cg-px-${Number(height)/2})` : 0 }">
      <span v-if="position==='center'" class="txt-center"><slot>
        {{ rate+'%' }}
      </slot></span>
      </div>
      <!-- <div class="cg-progress-style-b-slot"><slot /></div> -->
    </div>
      <div v-if="position === 'top' || position === 'bottom'" class="txt-top-bottom">
        <slot>
        {{ rate+'%' }}
      </slot>
      </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
import CgProgress from './index.d';

interface Props extends CgProgress.Props {
  rate: number | string;
  position: 'none' | 'top' | 'center' | 'bottom';
  height: number | string;
  round?: boolean;
  // progress_style_c: string; // 样式一，文本居中
  //     progress_style_b: string; // 样式二，文本居下
  //     progress_style_t: string; // 样式三，文本居上
}

const props = withDefaults(defineProps<Props>(), { round: true });

// const checkRadio = computed(() => {
//   console.log('sdfsdfsdfdsfdsfds')
//   let returnStr = 0;
//     if (progress_style_b) {
//       console.log('progress_style_b', progress_style_b)
//       returnStr = +progress_style_b.slice(0, -1);
//     } else if (progress_style_t) {
//       returnStr = +progress_style_t.slice(0, -1);
//     }
//   return returnStr;
// });

// if (progress_style_b) {
//   let returnStr = +progress_style_b.slice(0, -1);
//   const tt = setInterval(() => {
//     checkRadio.value = returnStr += 1;
//     if (checkRadio.value >= 99) clearInterval(tt);
//   }, 400);
// }
// if (progress_style_t) {
//   let returnStr = +progress_style_t.slice(0, -1);
//   const tt = setInterval(() => {
//     checkRadio.value = returnStr += 1;
//     if (checkRadio.value >= 99) clearInterval(tt);
//   }, 400);
// }
</script>
<script lang="ts">
export default {
  name: 'CgProgress'
};
</script>

<style lang="scss" scoped>
.cg-progress {
  position: relative;
  .txt-top-bottom {
    position: absolute;
    left: 0;
    width: 100%;
  }
  &.top {
    .txt-top-bottom {
      top: -100%;
    }
  }
  &.bottom {
    .txt-top-bottom {
      bottom: -100%;
    }
  }
}
.cg-progress-item {
  overflow: hidden;
  width: 200px;
  // height: 6px;
  position: relative;
  background: var(--cg-color-grey5);
  border: 1px solid var(--cg-color-white);
  box-shadow: 0 0 3px var(--cg-color-black2);
  // border-radius: 3px;
  font-size: var(--cg-font-26);
  color: var(--cg-color-white);
  .cg-progress-style-c-item,
  .cg-progress-style-b-item,
  .cg-progress-style-t-item {
    position: absolute;
    height: 100%;
    background: linear-gradient(90deg, var(--cg-color-blue1) 0%, var(--cg-color-blue6) 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    transition: all ease-in 0.4s;
  }
  .cg-progress-style-b-item,
  .cg-progress-style-t-item {
    border-radius: 7px;
  }
  .cg-progress-style-b-slot {
    color: var(--cg-color-blue12);
    margin: 14px auto;
    display: flex;
    justify-content: center;
    font-size: var(--cg-font-32);
  }
}
</style>
