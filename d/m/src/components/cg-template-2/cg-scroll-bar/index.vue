<script setup lang='ts'>
import { onMounted, ref, withDefaults, onUpdated } from 'vue'
import 'animate.css';

interface Props {
  height?: string, // 容器高度
  always?: boolean // 是否滚动时才显示
  color?: string // 滚动条颜色
  background?: string, // 滚动轨道颜色
  yellowStyle?: boolean, // 特殊：中奖弹窗的黄色风格
  scrollBarHeight?: number | string // 滚动条占容器高度的百分比 默认100%
  scrollBarTop?: number | string // 滚动条距离容器顶部的位置的的百分比 默认0
  maxHeight?: number | string // 超过最大高度时滚动 单位px
  inside?: boolean // 滚动条在内容区内
}

const props = withDefaults(defineProps<Props>(), { always: true })

const contentBoxRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const barHeight = ref(0)
const barMove = ref(0)
const showBar = ref(false)

const init = () => {
  const timer = setTimeout(() => {
    barHeight.value = contentBoxRef.value?.clientHeight! / contentRef.value?.clientHeight! * 100

    if (props.always) {
      // 滚动条保持显示
      if (contentRef.value?.clientHeight! > contentBoxRef.value?.clientHeight!) {
        showBar.value = true
      }
      contentBoxRef.value?.addEventListener('scroll', (e) => {
        barMove.value = (e.target as HTMLElement).scrollTop / contentBoxRef.value?.clientHeight! * 100
      })
    } else {
      // 需要滚动条消失
      let startTop: number
      let endTop: number
      let t: any
      contentBoxRef.value?.addEventListener('scroll', (e) => {
        clearTimeout(t)
        startTop = (e.target as HTMLElement).scrollTop
        showBar.value = true
        barMove.value = (e.target as HTMLElement).scrollTop / contentBoxRef.value?.clientHeight! * 100

        t = setTimeout(() => {
          endTop = (e.target as HTMLElement).scrollTop
          if (startTop === endTop) {
            showBar.value = false
          }
        }, 500);
      })
    }
    clearTimeout(timer)
  }, 0);
}

const toTop = () => {
  contentBoxRef.value?.scrollTo(0, 0)
}

defineExpose({ toTop })

onMounted(() => {
  init()
})
onUpdated(() => {
  init()
})
</script>
<template>
  <div :style="{ height: `${height}` }" :class="{ 'cg-scroll-bar-inside': inside }" class="cg-scroll-bar">
    <div ref="contentBoxRef" :style="{ maxHeight: maxHeight && `${maxHeight}px` }" class="content-box">
      <div ref="contentRef" class="content-wrapper">
        <slot />
      </div>
    </div>
    <template v-if="always">
      <div v-show="showBar" class="bar-box" :class="{ 'yellow-style': yellowStyle, inside }"
        :style="{ backgroundColor: background, height: `${scrollBarHeight}%`, top: `${scrollBarTop}%` }">
        <div
          :style="{ height: `${barHeight >= 100 ? 0 : barHeight}%`, transform: `translateY(${barMove}%)`, backgroundColor: color }"
          class="bar">
        </div>
      </div>
    </template>
    <template v-else>
      <Transition enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-show="showBar" class="bar-box" :class="{ 'yellow-style': yellowStyle }"
          :style="{ backgroundColor: background, height: `${scrollBarHeight}%`, top: `${scrollBarTop}%` }">
          <div
            :style="{ height: `${barHeight >= 100 ? 0 : barHeight}%`, transform: `translateY(${barMove}%)`, backgroundColor: color }"
            class="bar">
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CGScrollBar'
}
</script>

<style lang='scss' scoped>
.cg-scroll-bar {
  width: 100%;
  height: 100%;
  position: relative;

  .content-box {
    flex-grow: 1;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;

    /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }

    .content-wrapper {

      &::after,
      &::before {
        display: table;
        content: '';
        clear: both;
      }
    }
  }

  .bar-box {
    position: absolute;
    top: 0;
    right: -13px;
    height: 100%;
    width: 6px;
    background-color: var(--cg-color-blue10);
    border-radius: 20px;

    .bar {
      width: 100%;
      background-color: var(--cg-color-blue6);
      border-radius: 20px;
    }
  }

  .inside {
    right: 0;
  }

  .yellow-style {
    background-color: var(--cg-color-orange);

    .bar {
      background-color: var(--cg-color-white);
    }
  }
}

.cg-scroll-bar-inside {
  padding-right: 12px;
  box-sizing: border-box;
}
</style>