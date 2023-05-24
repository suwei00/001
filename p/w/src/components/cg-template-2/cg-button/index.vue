<script setup lang="ts">
withDefaults(
  defineProps<{
    whiteStyle?: boolean; // 白色风格
    disabled?: boolean;
    small?: boolean; // 弹窗小按钮
    round?: boolean; // 两边是圆的风格
    mini?: boolean; // 迷你按钮
    width?: number | string; // 宽 单位px
    height?: number | string; // 高 单位px
    paddingX?: number | string;
    paddingY?: number | string;
    fontSize?: number | string;
    customStyle?: boolean;
    blue?: boolean;
    red?: boolean;
    white?: boolean;
    uppercase?: boolean; // 是否转换为大写字母，默认是
    center?: boolean; // 是否居中
    isHover?: boolean;
    shadow?: boolean;
  }>(),
  { uppercase: true, isHover: true, shadow: false }
);
</script>
<template>
  <button
    :style="{
      width: width && `${width}px`,
      height: height && `${height}px`,
      paddingTop: paddingY && `${paddingY}px`,
      paddingBottom: paddingY && `${paddingY}px`,
      paddingLeft: paddingX && `${paddingX}px`,
      paddingRight: paddingX && `${paddingX}px`,
      fontSize: fontSize && `${fontSize}px`
    }"
    class="cg-button"
    :disabled="disabled"
    :class="{ 'white-style': whiteStyle, small, round, mini, customStyle, blue, red, white, uppercase, center, hover: isHover, shadow }"
  >
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
  height: 50px;
  border-radius: var(--cg-border-button-radius);
  font-weight: 700;
  font-size: var(--cg-font-17);
  color: var(--cg-color-white);
  background: var(--cg-gradient-blue-button);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not([disabled]):hover {
    background: var(--cg-hover-blue-button);
  }
}

.uppercase {
  text-transform: uppercase;
}

.small {
  min-width: 160px;
  height: 40px;
  font-size: var(--cg-font-15);
}

.white-style {
  color: var(--cg-color-blue1);
  background: var(--cg-gradient-white-button);
  border: 1px solid var(--cg-color-blue8);

  &:hover {
    background: var(--cg-hover-white-button);
  }
  &:not([disabled]):hover {
    color: var(--cg-color-white);
  }
}

.round {
  border-radius: 200px;
}

.mini {
  font-size: var(--cg-font-15);
  height: 36px;
}

.customStyle {
  min-width: auto;
  padding: 0;
}

.center {
  margin: 0 auto;
}

.blue,
.red,
.white {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-size: var(--cg-font-18);

  &:active {
    opacity: 1;
    background-size: 100% 110%;
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.7;
    background-size: 100% 100%;
    transform: translateY(0px);
  }
}

.blue {
  @include webp($base-img-dir + 'blue_btn.png');
  background-size: 100% 100%;

  &:not([disabled]):hover {
    @include webp($base-img-dir + 'blue_btn_hover.png');
    background-size: 100% 100%;
  }
}

.red {
  @include webp($base-img-dir + 'red_btn.png');
  background-size: 100% 100%;

  &:not([disabled]):hover {
    @include webp($base-img-dir + 'red_btn_hover.png');
    background-size: 100% 100%;
  }
}

.white {
  @include webp($base-img-dir + 'white_btn.png');
  background-size: 100% 100%;
  font-weight: 400;
  color: var(--cg-color-grey1);

  &:not([disabled]):hover {
    @include webp($base-img-dir + 'blue_btn.png');
    background-size: 100% 100%;
    color: var(--cg-color-white);
    font-weight: 700;
  }
}

.shadow {
  filter: var(--cg-img-shadow);
}
</style>
