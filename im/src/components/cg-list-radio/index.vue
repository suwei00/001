<script setup lang='ts'>
interface CgListRadioProps {
  modelValue?: string | number,
  itemHeight?: string,// item高度
  list: { [text: string]: any, value: string, label: string }[]
}
const props = withDefaults(defineProps<CgListRadioProps>(), {
  itemHeight: '112',
  modelValue: '',
})
const emit = defineEmits(['update:modelValue', 'onChange']);
const changeItem = (item: any) => {
  if (item.value === props.modelValue)
    return
  emit('onChange', item);
  emit('update:modelValue', item.value)
}
</script>
<template>
  <div class="cg_list_radio " v-for="item in props.list" :key="item.value">
    <div class="list_item flex ai-c jc-sb" @click="changeItem(item)">
      <div :style="{
        height: props.itemHeight && `var(--cg-px-${props.itemHeight})`,
        lineHeight: props.itemHeight && `var(--cg-px-${props.itemHeight})`
      }">
        <div>{{ item.label }}</div>
      </div>
      <cg-icon name="icon_select" v-if="modelValue === item.value"></cg-icon>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cg_list_radio {
  background-color: var(--cg-color-bg-white);
  padding: 0 32px;
  color: var(--cg-color-text-3);
  font: var(--cg-font-text6);

  .list_item {
    border-bottom: 2px solid var(--cg-color-border-1);
  }
}

.cg_list_radio:last-child {
  .list_item {
    border-bottom: 0;
  }

}
</style>