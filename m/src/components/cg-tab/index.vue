<script setup lang="ts">
interface CGTabProps {
  modelValue: number | string;
  list: Array<any>;
  itemHeight?: string,
}
const props = withDefaults(defineProps<CGTabProps>(), {
  itemHeight: '82',
  modelValue: '',
})
const emit = defineEmits(['update:modelValue', 'onChange']);
const onTabChange = (item: any) => {
  if (item.value === props.modelValue)
    return
  emit('update:modelValue', item.value)
  emit('onChange', item)
}
</script>

<template>
  <div class="cg_tab">
    <div class="list flex ai-c jc-sa">
      <div class="flex1" v-for="item in props.list" :key="item.id" @click="onTabChange(item)" :style="{
        height: props.itemHeight && `var(--cg-px-${props.itemHeight})`,
        lineHeight: props.itemHeight && `var(--cg-px-${props.itemHeight})`
      }" :class="[modelValue === item.value ? 'active' : '']">
        {{ item.label }}
        <div class="acitve_bot" v-if="modelValue === item.value"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_tab {
  background-color: var(--cg-color-bg-white);
  border-bottom: 6px solid transparent;

  .list {
    font: var(--cg-font-6);
    text-align: center;
    color: var(--cg-color-text-4);

    .acitve_bot {
      width: 80px;
      height: 6px;
      background-color: var(--cg-color-bg-1);
      border-radius: 3px;
      margin: 0 auto;
    }
  }

  .active {
    color: var(--cg-color-text-1);
    font: var(--cg-font-5);

  }
}
</style>
