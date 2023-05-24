<script lang="ts" setup>
import useRouterBack from '~/hooks/routerBackHooks'
// component
import bgImage from '~/components/bgImage.vue'
// static
import timeList from '~/static/timeList'
// utils
import { getSupportImage } from '~/utils/help'
// 背景图
import arrowBgSrc from '~/assets/images/public/headLeft.png?preset=full'
import arrowDownBgSrc from '~/assets/images/public/down.png?preset=full'

const props = withDefaults(defineProps<Props>(), {
  styles: '',
  defaultLeftOn: true,
  station: true,
  height: '43px',
  isOnLeft: false,
  showSelect: false,
  selectStyles: {},
  isTimeSelect: true,
  selectList: [],
  modelValue: null,
})

const emit = defineEmits(['update:modelValue', 'onSelect', 'onLeft'])

const arrowBg = `url(${getSupportImage(arrowBgSrc)})`

interface Props {
  title?: string
  styles?: string // 请不要在styles中写height 会造成高度错误.
  height?: string // 请在此处写高度
  station?: boolean // 是否是站位 true站位
  defaultLeftOn?: boolean // 是否允许左侧点击使用自带的返回事件
  isOnLeft?: boolean // 是否允许左侧点击使用自带的返回事件

  showSelect?: boolean // 是否显示选择
  selectStyles?: any //
  isTimeSelect?: boolean // 是否是时间选择
  selectList?: any // 选择列表 [{label: '全部', value: 1}] 必须含这种格式
  modelValue?: any // 选择的值 *如果使用了选择功能 一定要绑定喔
}
const { goBack } = useRouterBack()

const {
  defaultLeftOn,
  title,
  station,
  height,
  selectStyles,
} = props
const headWarpHeight = station ? height : '' // 是否固定头部

const goBacks = () => {
  if (!defaultLeftOn)
    return

  if (props.isOnLeft)
    emit('onLeft')

  else
    goBack()
}

// 选择逻辑
const selectStylesMain = {
  top: height,
  height: 'auto',
  marginTop: '-1px', // 解决视觉差问题 请勿随意删除
  ...selectStyles,
}
const visible = ref(false)
const selectListMain = computed(() => {
  return props.isTimeSelect ? timeList : (props.selectList ?? [])
})
const selectLabel = computed(() => {
  if (!props.modelValue)
    return ''
  let item: any = {}
  if (props.isTimeSelect)
    item = timeList.find(item => item.value === props.modelValue)

  else
    item = props.selectList.find(item => item.value === props.modelValue)

  if (item) {
    return item.label
  }
  else {
    if (selectListMain.value.length) {
      emit('update:modelValue', selectListMain.value[0].value)
      return selectListMain.value[0].label
    }
    else {
      return ''
    }
  }
})

const open = () => {
  visible.value = !visible.value
}
const onSelect = (item: any, index: any) => {
  console.log(item, '=======<<<')
  emit('update:modelValue', item.value)
  emit('onSelect', item, index, item.value, item.label) // 选择成功事件
  visible.value = !visible.value
}

const headerRef = ref(null)
defineExpose({ headerRef })
</script>

<template>
  <div ref="headerRef" class="headWarp">
    <div class="head" :style="styles">
      <div class="headLeft">
        <div class="headArrow" @click="goBacks()">
          <slot name="headArrow">
            <span class="arrow" />
          </slot>
        </div>
        <div class="headLeftMain">
          <slot name="headLeft" />
        </div>
      </div>
      <div class="headTitle">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          <slot name="headTitle" />
        </template>
      </div>
      <div class="headRight">
        <div v-if="showSelect" class="showSelect" @click="open()">
          <span>{{ selectLabel }}</span>
          <bgImage :image="arrowDownBgSrc" :class="{ visibleShow: visible }" />
        </div>
        <slot name="headRight" />
      </div>
    </div>
  </div>

  <van-popup v-model:show="visible" position="top" :style="selectStylesMain">
    <div class="customizeTopSelectBox">
      <ol>
        <li
          v-for="(item, index) in selectListMain" :key="index" :class="modelValue === item.value ? 'active' : ''"
          @click="onSelect(item, index)"
        >
          {{ item.label }}
        </li>
      </ol>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.headWarp {
  width: 100%;
  height: v-bind(headWarpHeight);
  color: #000000;

  .head {
    width: 100%;
    height: v-bind(height);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2100;
    background-color: #fff;

    .headLeft {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      left: 18px;
      top: 0;

      .arrow {
        display: flex;
        align-items: center;

        &::before {
          content: ' ';
          display: block;
          width: 11px;
          height: 22px;
          margin-right: 5px;
          background-image: v-bind(arrowBg);
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }

    .headTitle {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-weight: 800;
      line-height: 18px;
    }

    .headRight {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      right: 18px;
      top: 0;

      .showSelect {
        display: flex;
        align-items: center;

        span {
          line-height: 16px;
        }

       img{
          width: 13px;
          height: 7px;
          margin-left: 4px;
          // 旋转动画
          transition: transform 0.3s;
          transform-origin: center;

          &.visibleShow {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}

.customizeTopSelectBox {
  width: 100%;
  padding: 15px 9px;

  ol {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

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
