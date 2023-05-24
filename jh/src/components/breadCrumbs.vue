<script lang="ts" setup>
// component
import bgImage from '~/components/bgImage.vue'

// 背景图
import arrowBgSrc from '~/assets/images/public/minGreyRight.png?preset=full'

interface Props {
  modelValue: any
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: {
    list: [],
    username: '',
  },
})
const emit = defineEmits(['update:modelValue', 'onTab'])

const active: any = ref(0)

const onClickTab = (item: any) => {
  const { modelValue } = props
  const { list } = modelValue
  const oldList = JSON.parse(JSON.stringify(list))
  const items = oldList[active.value]
  const newList = JSON.parse(JSON.stringify(list))
  // 移除指定下标后面所有的元素
  newList.splice(active.value + 1, newList.length - active.value)
  modelValue.list = newList
  modelValue.username = item.username
  emit('update:modelValue', modelValue)
  emit('onTab', items.value, items.label, active.value, oldList)
}
</script>

<template>
  <div class="breadCrumbsWarp">
    
    <van-tabs v-model:active="active" shrink @click-tab="onClickTab">
      <van-tab v-for="(item, index) in modelValue.list" :key="index">
        <template #title>
          <div class="breadCrumbs">
            <span>{{ item.label }}</span>
            <bgImage :image="arrowBgSrc" class="breadCrumbsIcon" />
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.breadCrumbsWarp {
  width: 100%;
  height: 30px;
  padding: 0 20px;
  background-color: #fff;

  :deep(.van-tabs__wrap) {
    height: 30px;
  }

  :deep(.van-tabs__nav) {
    height: 30px;
  }

  :deep(.van-tabs__nav--line) {
    padding: 0;
  }

  :deep(.van-tab--grow) {
    padding: 0 5px;
  }

  :deep(.van-tabs__line) {
    background-color: transparent;
  }

  .breadCrumbs {
    display: flex;
    align-items: center;

    span {
      color: #505050;
      font-size: 10px;
    }

    .breadCrumbsIcon {
      width: 7px;
      height: 11px;
      margin-left: 4px;
    }
  }
}
</style>
