<script setup lang='ts'>
import { useVModel } from '@vueuse/core';
import CgSwitch from './index.d';
interface Props extends CgSwitch.Props {
  modelValue: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  disabled: false,
})

const emit = defineEmits(['update:modelValue', 'disabled']);
const isTurn = useVModel(props, 'modelValue', emit);
const disabled = useVModel(props, 'disabled', emit);
// 点击事件
const handleClick = () => {
  if (disabled.value) return;
  isTurn.value = !isTurn.value;
};
</script>
<template>
  <div class="cg-switch" @click="handleClick" :class="[disabled ? 'disabled' : '']">
    <div class="content" :class="[isTurn ? 'off' : 'on']">
      <div class="circle" :class="[isTurn ? 'off' : 'on']"></div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cg-switch {
  --cg-switch-width: 84px;
  --cg-switch-height: 44px;
  --cg-switch-circle-width: 36px;
  --cg-switch-circle-height: 36px;
}

.cg-switch {
  width: var(--cg-switch-width);
  height: var(--cg-switch-height);
  background: linear-gradient(90deg, var(--cg-color-blue13) 0%, var(--cg-color-blue14) 100%);
  border-radius: 100px;
  padding: 4px;
  box-sizing: border-box;


  .content {
    background-color: var(--cg-color-white);
    border-radius: 100px;
    width: 100%;
    height: 100%;
    position: relative;

    &.on {
      background-color: var(--cg-color-white);
    }

    &.off {
      background-color: var(--cg-color-blue11);
    }

    .circle {
      // 设置一个圆形，然后设置宽高一样，然后设置圆角为50%，就可以了
      width: var(--cg-switch-circle-width);
      height: var(--cg-switch-circle-height);
      border-radius: 50%;
      position: absolute;
      transition: left .3s;

      &.on {
        background-color: var(--cg-color-blue11);
        // 背景图
        background-image: url(link($base-img-dir + 'switch.png'));
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        left: 0;
      }

      &.off {
        background-image: url(link($base-img-dir + 'switch.png'));
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        left: calc(100% - var(--cg-switch-circle-width));
      }
    }
  }

  &.disabled {
    opacity: 0.5;
    // 禁用点击
    pointer-events: none;
  }

}
</style>