<!-- list必须传入value和name字段,v-model绑定item的value值 -->
<script lang="ts" setup name="jl-tabs">
interface itemProp {
  label: string
  value: string | number
  [key: string]: any
}
interface Props {
  modelValue: number | string
  beforeChange?: (index: number, item: itemProp) => boolean
  list: Array<itemProp>
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: itemProp['value']): void
  (e: 'change', index: number, item?: itemProp, event?: MouseEvent): void
}>()
const { list } = toRefs(props)
const tabList = computed(() => list.value.map(item => ({ ...item, nanoid: nanoid() })))
const data = useVModel(props, 'modelValue', emit)
const getActiveIndex = () => {
  if (!list?.value) {
    console.warn('<jl-tab/> list没有配置')
    throw new Error('<jl-tab/> list没有配置')
  }
  if (isNil(data.value)) {
    console.warn('<jl-tab/> v-model没有配置')
    throw new Error('<jl-tab/> v-model没有配置')
  }
  return list.value.findIndex(item => item.value === data.value)
}
const activeIndex = computed(getActiveIndex)
const switchRef = ref<HTMLElement | null>(null)

const changeTabIndex = (index: number, item: itemProp, event?: MouseEvent) => {
  if (index === activeIndex.value)
    return
  // 禁止切换
  if (props.beforeChange && !props.beforeChange(index, item))
    return
  emit('change', index, item, event)
  data.value = item.value
}
</script>

<template>
  <div v-if="list?.length && !isNil(data)" ref="switchRef" class="tabs">
    <div class="btn-group">
      <div
        v-for="(item, index) in tabList" :key="item.nanoid" class="btn" :data-name="item.label"
        :class="{ active: activeIndex === index && tabList.length > 1 }" @click="event => changeTabIndex(index, item, event)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  .label-name {
    width: 146px;
    line-height: 40px;
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;
  }

  .btn-group {
    display: flex;
    position: relative;
    border-bottom: 1px solid $border-color;

    .btn {
      color: #ffffff;
      font-size: 15px;
      width: 148px;
      height: 50px;
      color: $color-black-primary;
      line-height: 50px;
      border: 1px solid $border-color;
      position: relative;
      cursor: pointer;
      user-select: none;
      border-bottom: none;

      &+.btn {
        margin-left: -1px;
      }

      &.active {
        color: $color-black-primary;
        transition: color border ease-in 0.3s;
        font-family: $jl-font;
        font-weight: bold;
        position: relative;
        z-index: 1;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 3px;
          width: 100%;
          background-color: $color-primary-second;
        }
      }
    }
  }
}
</style>
