<script lang="ts" setup>
// component
import bgImage from '~/components/bgImage.vue'
// static
import timeList from '~/static/timeList'
// 背景图
import arrowBgSrc from '~/assets/images/public/greyDown.png?preset=full'

interface Props {
  modelValue: Record<string, any> | null
  searshList: {
    name: string
    list: {
      label: any
      value: any
      [key: string]: any
    }[] | null
    [key: string]: any
  }[] | null
  top?: number
  selectStyles?: any
  [key: string]: any
  topText?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  searshList: null,
  selectStyles: {},
  top: 40,
  topText: '',
})
const emit = defineEmits(['update:modelValue', 'onSelect'])
const { selectStyles, top } = props

const selectBtnBoxWarpRef: any = ref(null)
const selectBtnBoxMainRef: any = ref(null)
const visible = ref(false)
const activeIndex = ref(0)
const styles = computed(() => {
  if (selectBtnBoxMainRef.value) {
    return {
      height: 'auto',
      ...selectStyles,
      top: `${selectBtnBoxMainRef.value.offsetHeight + top}px`,
    }
  }
  else {
    return {
      height: 'auto',
      ...selectStyles,
    }
  }
})
const searshListMain = computed(() => {
  const { searshList, modelValue } = props
  if (searshList) {
    return searshList.map((item: any) => {
      let lists = []
      let label: any = ''
      let value: any = null
      if (item.isSelectTime)
        lists = timeList
      else
        lists = item.list ?? []

      if (modelValue) {
        if (modelValue[item.name] !== null && modelValue[item.name] !== undefined) {
          value = modelValue[item.name]
          label = lists.find((i: any) => i.value === value)?.label ?? ''
        }
        else {
          value = lists[0]?.value
          label = lists[0]?.label
          const oldModelValue = modelValue
          oldModelValue[item.name] = value
          emit('update:modelValue', oldModelValue)
        }
      }

      return {
        ...item,
        label,
        value,
        list: lists,
      }
    })
  }
  else {
    return []
  }
})
const selectListOption = computed(() => {
  const { searshList } = props
  if (searshList?.length) {
    const items: any = searshList[activeIndex.value]
    if (items.isSelectTime)
      return timeList
    else
      return items.list ?? []
  }
  else {
    return []
  }
})

const activeSelectValue: any = ref(null)
const loading = ref(false)

const open = (index: number) => {
  if (loading.value)
    return
  activeIndex.value = index
  activeSelectValue.value = searshListMain.value[index].value

  visible.value = true
}

const onSelect = (item: any, index: any) => {
  const currentName = searshListMain.value[activeIndex.value].name
  const oldModelValue: any = props.modelValue
  oldModelValue[currentName] = item.value
  visible.value = !visible.value
  loading.value = true

  new Promise((resolve) => {
    emit('update:modelValue', oldModelValue)
    emit('onSelect', resolve, item, index, activeIndex.value, item.value, item.label) // 选择成功事件
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  selectBtnBoxWarpRef.value.style.height = `${selectBtnBoxMainRef.value.offsetHeight}px`
})
</script>

<template>
  <div ref="selectBtnBoxWarpRef" class="customizeTopSelectWarp">
    <div ref="selectBtnBoxMainRef" class="customizeTopSelectMain">
      <ol>
        <li v-for="(item, index) in searshListMain" :key="index">
          <div class="customizeTopSelectBtn" @click="open(index)">
            <van-loading v-if="loading" size="12" style="margin-right:2px" />
            <span :class="visible ? 'visibleShow' : ''">{{ item.label }}</span>
            <bgImage :image="arrowBgSrc" :class="(visible && activeIndex === index) ? 'visibleShow' : ''" />
          </div>
        </li>
      </ol>
    </div>
  </div>

  <van-popup v-model:show="visible" position="top" :style="styles">
    <div class="customizeTopSelectBox">
      <div v-if="topText" class="topText">
        {{ topText }}
      </div>
      <ol>
        <li
          v-for="(item, index) in selectListOption" :key="index"
          :class="activeSelectValue === item.value ? 'active' : ''" @click="onSelect(item, index)"
        >
          {{ item.label }}
        </li>
      </ol>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.customizeTopSelectWarp {
  width: 100%;
  position: relative;
  background-color: #fff;

  .customizeTopSelectMain {
    width: 100%;
    position: fixed;
    top: v-bind(top)px;
    left: 0;
    z-index: 2101;
    background-color: #fff;
    padding: 15px 19px 0 19px;

    ol {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      li {
        width: calc(100%/3);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 15px;

        .customizeTopSelectBtn {
          width: 100px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F5F5F9;
          border-radius: 30px;
          color: #000000;

          span {
            &.visibleShow {
              color: #808E9E;
            }
          }

         img{
            display: block;
            width: 13px;
            height: 7px;
            margin-left: 4px;
            // 旋转动画
            transition: all 0.3s;
            transform-origin: center;
            &.visibleShow {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}

.customizeTopSelectBox {
  width: 100%;
  padding: 0 9px;
  .topText{
    width: 100%;
    padding: 10px 25px 0 25px;
    // min-height: 16px;
    font-size: 10px;
    color: #949494;
    line-height: 22px;
  }

  ol {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0 15px 0;

    li {
      width: 81px;
      height: 31px;
      margin-bottom: 9px;
      margin-right: 11px;
      background: #FFFFFF;
      border-radius: 15px;
      border: 1px solid #CCCED8;
      color: #AFB2BA;
      display: flex;
      align-items: center;
      justify-content: center;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.active {
        color: #FFFFFF;
        background: #5A7EF7;
        border: 1px solid #5A7EF7;
      }
    }
  }
}
</style>
