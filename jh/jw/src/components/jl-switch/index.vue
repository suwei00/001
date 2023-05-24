<!-- list必须传入value和name字段,v-model绑定item的value值 -->
<script lang="ts" setup name="jl-switch">
interface itemProp {
  label: string
  value: string | number
  [key: string]: any
}
interface Props {
  modelValue: number | string
  list: Array<itemProp>
  width?: string
}

const props = withDefaults(defineProps<Props>(), { width: '100px' })
const emit = defineEmits<{
  (e: 'update:modelValue', value: itemProp['value']): void
  (e: 'change', index: number, item?: itemProp, event?: MouseEvent): void
}>()
const { list } = toRefs(props)
const { width } = toRefs(props)
const switchList = computed(() => list.value.map(item => ({ ...item, nanoid: nanoid() })))
const data = useVModel(props, 'modelValue', emit)
const getActiveIndex = () => {
  if (!list?.value) {
    console.warn('<jl-switch/> list没有配置')
    throw new Error('<jl-switch/> list没有配置')
  }
  if (isNil(data.value)) {
    console.warn('<jl-switch/> v-model没有配置')
    throw new Error('<jl-switch/> v-model没有配置')
  }
  return list.value.findIndex(item => item.value === data.value)
}
const activeIndex = computed(getActiveIndex)

const changeTabIndex = (index: number, item: itemProp, event?: MouseEvent) => {
  if (index !== activeIndex.value) {
    emit('change', index, item, event)
    data.value = item.value
  }
}
</script>

<template>
  <div v-if="list?.length && !isNil(data)" class="switch">
    <div class="btn-group">
      <div
        v-for="(item, index) in switchList"
        :key="item.nanoid"
        class="btn" :style="{ width }"
        :data-name="item.label"
        :class="{ active: activeIndex === index }" @click="event => changeTabIndex(index, item, event)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch {
  display: flex;

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

    .btn {
      text-align: center;
      color: #ffffff;
      font-size: 15px;
      color: $color-black-primary;
      line-height: 39px;
      height: 42px;
      border: 1px solid $border-color;
      position: relative;
      cursor: pointer;
      transition: all ease-out 0.3s;
      user-select: none;

      &:first-child {
        border-radius: 6px 0px 0px 6px;
      }

      &:last-child {
        border-radius: 0px 6px 6px 0px;
      }

      &+.btn {
        margin-left: -1px;
      }

      &.active {
        color: $color-primary-second;
        border: 1px solid $color-primary-second;
        transition: color border ease-in 0.3s;
        font-family: $jl-font;
        font-weight: bold;
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
