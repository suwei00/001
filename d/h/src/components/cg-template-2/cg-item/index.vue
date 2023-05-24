<script setup lang='ts'>
import CgItem from './index.d';
import { ref } from 'vue'
import { useVModel } from '@vueuse/core';
import { CgIcon, CgButton, CgDivider } from '@/components/cg-template-2'
interface Props extends CgItem.Props {
  modelValue?: string,
  itemHeight?: string,// item高度
  list: { [text: string]: any, value: string, label: string }[]
}
const props = withDefaults(defineProps<Props>(), {
  itemHeight: '80',
  modelValue: '',
})
const emit = defineEmits(['update:modelValue']);
const currentValue = useVModel(props, 'modelValue', emit);
emit('update:modelValue', props.modelValue)
const selectItem = (item: any) => {
  currentValue.value = item.value
}
</script>
<template>
  <div v-for="item in props.list" :key="item.value" :class="['cg-item', currentValue === item.value ? 'active' : '']">
    <div class="item" :style="{
      height: props.itemHeight && `var(--cg-px-${props.itemHeight})`,
      lineHeight: props.itemHeight && `var(--cg-px-${props.itemHeight})`
    }" @click="selectItem(item)">
      <div>{{ item.label }}</div>
      <cg-divider />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cg-item {
  font: var(--cg-font-text6);
  color: var(--cg-color-black1);

  &.active {
    font: var(--cg-font-h4);
    background: var(--cg-color-blue17);
  }
}

.item {
  text-align: center;
}
</style>