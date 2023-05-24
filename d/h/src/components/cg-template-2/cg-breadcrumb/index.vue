<script lang="ts" setup>
import { computed } from 'vue';
import { type FormOptions } from '../cg-form';
import { CgIcon } from '@/components/cg-template-2';
import { useVModel } from '@vueuse/core'
import { userInfoStateStore } from '@/store-pinia/userInfo';

const props = withDefaults(defineProps<{
  modelValue: string;
  list: FormOptions[] | string[];
  addCurrentUser?: boolean;
}>(), {
  modelValue: '',
});

const userStore = userInfoStateStore()
const userInfo = computed(() => userStore.userInfo)
const emit = defineEmits(['update:modelValue']);

const currentValue = useVModel(props, 'modelValue', emit);

const listComputed = computed(() => {
  if (!props.list) {
    return [];
  }
  const list = props.list.map((item: any) => {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item,
      };
    }
    return item;
  });

  // 是否添加当前用户到面包屑首位
  if (props.addCurrentUser) {
    list.unshift({
      label: userInfo.value.username,
      value: userInfo.value.username,
    });
  }

  return list;
});

const clickItem = (item: any) => {
  currentValue.value = item.value;
};
</script>

<template>
  <div class="cg-breadcrumb">
    <div v-for="item, index in listComputed" class="item flex-middle">
      <span @click="clickItem(item)" :class="[index === (listComputed.length - 1) ? 'active' : '']" class="text">{{
        item.label
      }}</span>
      <cg-icon v-if="index < (listComputed.length - 1)" name="i_polygon" :width="26" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg-breadcrumb {
  overflow: hidden;

  .item {
    float: left;
    font: var(--cg-font-text8);
    color: var(--cg-color-black1);
    height: 39px;

    .text {
      display: inline-block;
      margin: 0 4px;

      &.active {
        color: var(--cg-color-blue1);
      }
    }
  }
}
</style>