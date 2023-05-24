<script setup lang='ts' name="list-transition">
import type { BaseTransitionProps, TransitionGroupProps } from 'vue'
interface Props extends TransitionGroupProps {
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'
  offset?: string | number
  delayInterval?: number
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'ltr',
  offset: '50%',
  delayInterval: 30,
})
const { direction, delayInterval } = toRefs(props)

const transform = $computed(() => {
  switch (direction.value) {
    case 'ltr':
      return `translateX(-${props.offset})`
    case 'rtl':
      return `translateX(${props.offset})`
    case 'ttb':
      return `translateY(-${props.offset})`
    case 'btt':
      return `translateY(${props.offset})`
  }
})
const onEnterConfig = $computed(() => {
  switch (direction.value) {
    case 'ltr':
    case 'rtl':
      return {
        translateX: 0,
      }
    case 'ttb':
    case 'btt':
      return {
        translateY: 0,
      }
  }
})
const onBeforeEnter: BaseTransitionProps['onBeforeEnter'] = (el) => {
  el.style.opacity = 0
  el.style.transform = transform
}
const onEnter: BaseTransitionProps['onEnter'] = (el, done) => {
  anime({
    targets: el,
    opacity: 1,
    ...onEnterConfig,
    delay: el.dataset.index * delayInterval.value,
  }).finished.then(() => done())
}
const onLeave: BaseTransitionProps['onLeave'] = (el, done) => {
  anime({
    targets: el,
    opacity: 0,
    duration: 0,
  }).finished.then(() => done())
}
</script>

<template>
  <transition-group
    mode="out-in" v-bind="props" :css="false" @before-enter="onBeforeEnter" @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition-group>
</template>
