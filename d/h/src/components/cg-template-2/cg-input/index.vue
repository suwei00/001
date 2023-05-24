<script lang="ts" setup>
import { ref, computed, useAttrs, watch, nextTick } from 'vue';
import CgInput from './index.d';

interface Props extends CgInput.Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: ''
});

const attrs = useAttrs();
console.log('attrs ', attrs);

const inputRef = ref();

const emits = defineEmits(['input']);

const inputListeners = computed(() => {
  return {
    // 从父级添加所有的监听器
    // ...$listeners,
    // 然后我们添加自定义监听器
    // 这里确保组件配合 `v-model` 的工作
    input: (e: any) => {
      emits('input', e.target.value);
      // 保证原生的 input value 是可控的
      nextTick(setNativeInputValue);
    }
  };
});

const nativeInputValue = computed(() => {
  // 将传入的值转为 String，防止出错
  return props.value === null || props.value === undefined ? '' : props.value + '';
});

const setNativeInputValue = () => {
  // 将展示的原生的 input value 和 props 中的 value 保持一致
  const input = inputRef.value;
  if (!input) return;
  if (input.value === nativeInputValue.value) return;
  input.value = nativeInputValue.value;
};

watch(
  () => nativeInputValue.value,
  () => {
    setNativeInputValue();
  }
);
</script>

<template>
  <label>
    <input ref="inputRef" v-bind="$attrs" :value="value" v-on="inputListeners" />
  </label>
</template>

<style scoped></style>
