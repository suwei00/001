<script setup lang='ts' name="personal-tabs">
import checkedImg from '@images/personal/deposit/checked.png?preset=full'
import type { WithNanoid } from 'type'
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: itemProp['value']): void
  (e: 'change', index: number, item: itemProp, event?: MouseEvent): void
}>()
const checkedUrl = getImageUrl(checkedImg)
interface itemProp {
  label: string | number
  value: string | number
  [key: string]: any
}
interface Props {
  modelValue?: number
  list: Array<itemProp>
}
interface ListItem extends itemProp, WithNanoid { }
const { list } = toRefs(props)
const tabList = computed<Array<ListItem>>(() => list.value.map(item => ({ ...item, nanoid: nanoid() })))
let data = $(useVModel(props, 'modelValue', emit))
const handleClick = (index: number, item: itemProp, event?: MouseEvent) => {
  if (data !== index) {
    emit('change', index, item, event)
    data = index
  }
}
</script>

<template>
  <ul class="personal-tabs">
    <li
      v-for="(item, index) in tabList" :key="item.nanoid" :data-index="index" :class="{ active: index === data }"
      @click="event => handleClick(index, item, event)"
    >
      <slot name="tab" :item="item" :active="item.value === data" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.personal-tabs {
  display: flex;
  align-items: center;
  margin-left: -20px;
  margin-top: -20px;
  flex-wrap: wrap;

  li {
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    cursor: pointer;
    border: 1px solid $border-color;
    align-items: center;
    border-radius: 6px;
    justify-content: center;
    color: $color-black-basic;
    font-size: 15px;
    user-select: none;
    transition: all .05s;

    &.active {
      border: 2px solid $color-primary-second;
      position: relative;
      box-shadow: 0px 10px 30px 1px #DAE8F2;

      &::after {
        content: '';
        width: 23px;
        height: 23px;
        right: -1px;
        bottom: -1px;
        position: absolute;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: v-bind(checkedUrl);
      }
    }
  }
}

.personal-tabs {
  li:not(.active):hover {
    border: 1px solid #597EF7;
    position: relative;
    box-shadow: 0px 10px 30px 1px #dae8f2;
    color: #597EF7;
  }
}
</style>
