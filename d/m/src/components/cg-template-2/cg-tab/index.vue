
  
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { isNil } from 'lodash';
import { nextTick } from 'process';
import { ref, onMounted, toRefs, watch, computed } from 'vue';
import CgTab from '.';
type itemProp = {
  name: string;
  value: string | number;
  [key: string]: any;
};
interface Props extends CgTab.Props {
  modelValue: number | string;
  list: Array<itemProp>;
  padding: string;
}

const props = withDefaults(defineProps<Props>(), {});
const { list } = toRefs(props);
const emit = defineEmits<{
  (e: 'update:modelValue', value: itemProp['value']): void;
  (e: 'onChange', index: number, item?: itemProp, event?: MouseEvent): void;
}>();
const data = useVModel(props, 'modelValue', emit);
const getActiveIndex = () => {
  if (!list?.value) {
    console.warn('<switch/> list没有配置');
    throw new Error('<switch/> list没有配置');
  }
  if (isNil(data.value)) {
    console.warn('<switch/> v-model没有配置');
    throw new Error('<switch/> v-model没有配置');
  }
  return list.value.findIndex(item => item.value === data.value);
};
const activeIndex = computed(getActiveIndex);
const activeBtnWidth = ref<number>(0);
const btnTranslateX = ref(0);
const switchRef = ref<HTMLElement | null>(null);

const translateX = () => {
  if (activeIndex.value === -1) return;
  const btn = switchRef.value!.getElementsByClassName('btn')[activeIndex.value] as HTMLElement;
  const btnLeft = btn.offsetLeft;
  const btnWidth = btn.offsetWidth;
  activeBtnWidth.value = btnWidth;
  btnTranslateX.value = btnLeft - 3;
};

onMounted(() => nextTick(translateX));
watch(activeIndex, () => {
  translateX();
});
const changeTabIndex = (index: number, item: itemProp, event?: MouseEvent) => {
  if (index === activeIndex.value) return;
  emit('onChange', index, item, event);
  data.value = item.value;
  nextTick(translateX);
};
</script>
<template>
  <div class="switch" ref="switchRef" v-if="list?.length && !isNil(data)">
    <div class="btn-group">
      <div :style="{ transform: `translateX(${btnTranslateX}px)`, width: `${activeBtnWidth}px` }" class="active-btn-bg"
        v-show="activeBtnWidth !== 0" />
      <div class="btn" :style="`padding:0 ${padding}px`" :data-name="item.name"
        :class="{ active: activeIndex === index }" v-for="(item, index) in list" :key="item.title"
        @click="event => changeTabIndex(index, item, event)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.switch {
  display: flex;

  .btn-group {
    display: flex;
    height: 46px;
    position: relative;
    padding: 3px;
    background: var(--cg-color-blue11);
    box-shadow: var(--cg-tab-shadow);
    border-radius: var(--cg-border-button-radius);
    overflow: hidden;

    .active-btn-bg {
      position: absolute;
      border-radius: var(--cg-border-button-radius);
      height: 40px;
      background-image: var(--cg-gradient-blue-button);
      transition: all ease-in 0.3s;
    }

    .btn {
      color: var(--cg-color-grey1);
      font: var(--cg-font-text4);
      line-height: 40px;
      // padding: 0 47.5px;
      // padding: 0 16px;
      position: relative;
      cursor: pointer;
      transition: all ease-out 0.3s;
      user-select: none;
      text-align: center;

      // 去除font-weight引起的抖动
      &::before {
        display: block;
        content: attr(data-name);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }

      &.active {
        color: var(--cg-color-white);
        font: var(--cg-font-text2);
        transition: all ease-in 0.3s;
        line-height: 40px;
      }


    }
  }
}
</style>
  