<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  whiteStyle?: boolean; // 白色风格
  disabled?: boolean;
  small?: boolean; // 弹窗小按钮
  big?: boolean; // 弹窗小按钮
  round?: boolean; // 两边是圆的风格
  mini?: boolean; // 迷你按钮
  width?: number | string; // 宽 单位px
  height?: number | string; // 高 单位px
  padding?: string;
  fontSize?: number | string;
  uppercase?: boolean; // 是否转换为大写字母，默认是
  center?: boolean; // 是否居中
  blue_but?: boolean;
  orange_but?: boolean;
}

const props = withDefaults(defineProps<Props>(), { padding: '0', uppercase: true });
const paddingTransform = computed(() =>
  props.padding
    .split(',')
    .map(s => `var(--cg-px-${s})`)
    .join(' ')
);
</script>
<template>
  <button :style="{
    width: width && `var(--cg-px-${width})`,
    height: height && `var(--cg-px-${height})`,
    padding: paddingTransform,
    fontSize: fontSize && `var(--cg-font-${fontSize})`
  }" :disabled="disabled" class="cg-button" :class="{
  disabled,
  'white-style': whiteStyle,
  big,
  small,
  round,
  mini,
  uppercase,
  center,
  blue_but,
  orange_but
}">
    <slot name="icon" />
    <slot />
  </button>
</template>
<script lang="ts">
export default {
  name: 'CGButton'
};
</script>

<style lang="scss" scoped>
.cg-button {
  display: block;
  width: auto;
  height: 88px;
  border-radius: var(--cg-border-radius);
  font: var(--cg-font-h4);
  color: var(--cg-color-white);
  background: var(--cg-gradient-lightblue-blue);
  border: none;

  &:active {
    background: var(--cg-gradient-bluebtn-active);
  }
}

.white-style {
  color: var(--cg-color-blue1);
  background: var(--cg-gradient-white-lightblue);
  border: 2px solid var(--cg-color-blue4);

  &:active {
    background: var(--cg-gradient-whitebtn-active);
  }
}

.blue_but {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;

  @include webp($base-img-dir + '/button/blue_btn.png');
  background-size: 100% 100%;
  border-radius: 0;

  :deep(.cg_icon) {
    margin-left: 20px;
  }

  &:active {
    transform: scale(0.98);
    @include webp($base-img-dir + '/button/blue_btn_active.png');
    background-size: 100% 100%;
  }
}

.orange_but {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  @include webp($base-img-dir + '/button/orange_but.png');
  background-size: 100% 100%;
  border-radius: 0;

  :deep(.cg_icon) {
    margin-left: 20px;
  }

  &:active {
    transform: scale(0.98);
    @include webp($base-img-dir + '/button/orange_but_active.png');
    background-size: 100% 100%;
  }
}

.small {
  width: 212px;
  height: 64px;
  font-size: var(--cg-font-24);
}

.big {
  width: 100%;
  height: 64px;
  font-size: var(--cg-font-24);
}

.round {
  border-radius: 1000px;
}

.mini {
  font-size: var(--cg-font-24);
  border-radius: 50px;
  height: 48px;
  background: linear-gradient(153.49deg,
      var(--cg-color-blue2) 16.64%,
      var(--cg-color-blue1) 83.36%);
}

.uppercase {
  text-transform: uppercase;
}

.center {
  margin: 0 auto;
}

.disabled {
  opacity: 0.5;
}
</style>
