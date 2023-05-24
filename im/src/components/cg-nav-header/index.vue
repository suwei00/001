<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

interface CGNavBarProps {
  title?: string
  leftText?: string
  rightText?: string
  leftArrow?: boolean
  border?: boolean
  fixed?: boolean
  placeholder?: boolean
  zIndex?: number | string
  clickable?: boolean
  background?: string
  titleColor?: string
  textColor?: string
}
const props = withDefaults(defineProps<CGNavBarProps>(), {
  zIndex: 1,
  clickable: true,
  fixed: true,
  placeholder: true,
})

const slots = useSlots()

const emits = defineEmits(['clickLeft', 'clickRight', 'clickTitle'])

const navBar = ref()
const show = ref(true)

const hasLeft = computed(() => props.leftArrow || props.leftText || slots.left)
const hasRight = computed(() => props.rightText || slots.right)

const styleNavBar = computed(() => {
  let style: any = {}
  if (props.background) {
    style.background = props.background
  }
  return style
})

const navLeftClick = (e: any) => {
  emits('clickLeft', e)
}

const navRightClick = (e: any) => {
  emits('clickRight', e)
}

const navTitleClick = (e: any) => {
  emits('clickTitle', e)
}

const toggle = () => {
  show.value = !show.value
}

defineExpose({ toggle })
</script>

<template>
  <div v-if="fixed && placeholder" class="cg-nav-bar__placeholder"></div>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div
      v-show="show"
      class="cg-nav-bar"
      :class="{ 'cg-nav-bar--fixed': fixed, 'has-left': hasLeft, 'has-right': hasRight }"
      :style="styleNavBar"
    >
      <div class="cg-nav-bar__content">
        <div v-if="hasLeft" class="cg-nav-bar__left" @click="navLeftClick">
          <template v-if="slots.left">
            <slot name="left"></slot>
          </template>
          <template v-else>
            <cg-icon v-if="leftArrow" name="icon_nav_back" @click="$router.go(-1)" />
            <span v-if="leftText" class="cg-nav-bar__text">{{ leftText }}</span>
          </template>
        </div>
        <div class="cg-nav-bar__title cg-ellipsis" @click="navTitleClick">
          <slot>
            {{ title }}
          </slot>
        </div>
        <div v-if="hasRight" class="cg-nav-bar__right" @click="navRightClick">
          <template v-if="slots.right">
            <slot name="right"></slot>
          </template>
          <template v-else>
            <span v-if="rightText" class="cg-nav-bar__text">{{ rightText }}</span>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.cg-nav-bar__placeholder {
  height: 92px;
}
.cg-nav-bar {
  position: relative;
  z-index: 9;
  line-height: 1.1;
  text-align: center;
  background: var(--cg-color-bg-1);
  user-select: none;
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .cg-nav-bar__content {
    position: relative;
    display: flex;
    align-items: center;
    height: 92px;
    .cg-nav-bar__title {
      max-width: 60%;
      margin: 0 auto;
      color: var(--cg-color-bg-white);
      font-weight: normal;
      font-size: 34px;
    }

    .cg-nav-bar__left,
    .cg-nav-bar__right {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      padding: 0 var(--van-padding-md);
      font-size: var(--van-font-size-md);
    }
    .cg-nav-bar__left {
      left: 0;
      .cg_icon {
        margin-right: 4px;
      }
    }
    .cg-nav-bar__right {
      right: 0;
    }
    .cg-nav-bar__text {
      color: var(--cg-color-bg-white);
    }
  }
}
</style>
