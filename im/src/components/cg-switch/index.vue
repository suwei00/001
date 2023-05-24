<script setup lang="ts">
import { useVModel } from '@vueuse/core';
interface CGSwitch {
  modelValue: boolean;
  disabled?: boolean;
  inactiveBg?: string;
  activeBg?: string;
}

const props = withDefaults(defineProps<CGSwitch>(), {
  modelValue: true,
  disabled: false,
  inactiveBg: 'var(--cg-color-bg-1)',
  activeBg: 'var(--cg-color-bg-6)'
})

const emit = defineEmits(['update:modelValue', 'disabled', 'onChange']);
const disabled = useVModel(props, 'disabled', emit);
const handleClick = () => {
  if (disabled.value) return;
  emit('update:modelValue', !props.modelValue);
  emit('onChange');
};

</script>

<template>
  <div class="cg_switch" :class="{ disabled: disabled }" @click="handleClick"
    :style="{ backgroundColor: props.modelValue ? inactiveBg : activeBg }">
    <div class="inner" :class="{ active: props.modelValue }"></div>
  </div>
</template>
  
<style lang="scss" scoped>
.cg_switch {
  position: relative;
  display: inline-block;
  width: 88px;
  height: 44px;
  border-radius: 22px;
  transition: background-color 0.3s;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.inner {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: transform 0.3s, background-color 0.3s;
  background-color: var(--cg-color-bg-white);
}

.active {
  transform: translateX(45px);
}
</style>
