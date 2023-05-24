<template>
  <div :class="['cg-progress', position]">
    <div :class="['cg-progress-item', position]" :style="{height:`var(--cg-px-${height})`,lineHeight:`var(--cg-px-${height})`,borderRadius:`var(--cg-px-${Number(height)/2})`}">
      <!-- <div class="cg-progress-style-b-item" :style="progress_style_b !== '100%' ? { width: `${checkRadio}%` } : { width: `100%` }"></div> -->
      <div class="cg-progress-style-b-item" :style="{ width: `${rate}%`, borderRadius: round ? `var(--cg-px-${Number(height)/2})` : 0 }">
        <!-- <div v-if="position==='center'" class="txt-center"><slot>
        {{ rate+'%' }}
      </slot></div> -->
      </div>
      <span v-if="position==='center'" class="fixed-in-center"><slot>
        {{ rate+'%' }}
      </slot></span>
      </div>
      <div v-if="position === 'top' || position === 'bottom'" class="txt-top-bottom">
        <slot>
        {{ rate+'%' }}
      </slot>
      <!-- <div class="cg-progress-style-b-slot"><slot /></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  rate: number;
  position: 'none' | 'top' | 'center' | 'bottom';
  height: number | string;
  round: boolean;
  // progress_style_c: string; // 样式一，文本居中
  //     progress_style_b: string; // 样式二，文本居下
  //     progress_style_t: string; // 样式三，文本居上
}

const props = withDefaults(defineProps<Props>(), {
  round: true
});

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
  font: var(--cg-font-text7);
  .txt-top-bottom {
    position: absolute;
    left: 0;
    width: 100%;
    color: var(--cg-color-black);
    text-align: center;
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
  width: 100%;
  // width: 200px;
  // height: 6px;
  position: relative;
  // background: var(--cg-color-grey5);
  // border: 1px solid var(--cg-color-white);
  // box-shadow: 0 0 3px var(--cg-color-black2);
  // border-radius: 3px;
  text-align: center;
  font: var(--cg-font-text7);
  line-height: 2;
  color: var(--cg-color-white);
  // background: var(--cg-color-gray);
  // box-shadow: 0px 0px 6px var(--cg-color-grey7);
  // box-shadow: 0px 0px 6px var(--cg-color-blue29);
  box-shadow: 0px 2px 2px var(--cg-color-white);
  background: linear-gradient(360deg, var(--cg-color-blue13), var(--cg-color-blue14)) padding-box,
              linear-gradient(360deg, var(--cg-color-blue13), var(--cg-color-blue14)) border-box;
  // background: linear-gradient(to top, var(--cg-color-blue13), var(--cg-color-blue14));
  border: 2px solid transparent;
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
    // font-size: var(--cg-font-32);
  }
  .txt-center {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
  .fixed-in-center {
    position: relative;
    z-index: 6;
  }
}
</style>
