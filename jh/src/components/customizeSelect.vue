<script lang="ts" setup>
// component
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import bgImage from '~/components/bgImage.vue'
// 背景图
import bgSrc1 from '~/assets/images/public/greyDown.png?preset=full'
import bgSrc2 from '~/assets/images/public/minGreyRight.png?preset=full'

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  list: () => [],
  placeholder: '',
  placeholderColor: '#9D9D9D',
  color: '#000000',
  title: '',
  type: '1',
  prohibitSelect: false, // 禁止选择
  prohibitText: '',
})
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
BScroll.use(Wheel)
let bs: any = null

interface Props {
  modelValue: any
  list: any
  placeholder?: string
  [key: string]: any
  placeholderColor?: string
  color?: string
  title?: string
  type?: string
  prohibitSelect?: boolean
  prohibitText?: string
}
const { placeholderColor, color } = props

const wheelWrapperRef: any = ref(null)
const visible = ref(false)
const activeIndex = computed(() => {
  const { modelValue, list }: any = props

  try {
    let crrIndex = -1
    list.forEach((ele: any, index: number) => {
      if (ele.value === modelValue)
        crrIndex = index
    })

    return crrIndex
  }
  catch (err) {
    return -1
  }
})

const showLabel = computed(() => {
  const { list = [] }: any = props

  try {
    return list[activeIndex.value].label ?? ''
  }
  catch (err) {
    return ''
  }
})

const onClose = () => {
  visible.value = false
}

const createWheel = (wheelWrapper: any) => {
  if (!bs) {
    bs = new BScroll(wheelWrapper, {
      wheel: {
        selectedIndex: activeIndex.value,
        wheelWrapperClass: 'wheel-scroll',
        wheelItemClass: 'wheel-item',
        wheelDisabledItemClass: 'wheel-disabled-item',
      },
      useTransition: false,
      probeType: 3,
    })

    // < v2.1.0
    bs.on('scrollEnd', () => {
      // console.log(bs.getSelectedIndex(), '==============scrollEnd');
    })
    // v2.1.0, only when selectedIndex changed
    bs.on('wheelIndexChanged', (index: any) => {
      // 当列表项发生改变的时候
      // console.log(index, '==============wheelIndexChanged');
    })
  }
  else {
    bs.refresh()
  }
  return bs
}

const onConfirm = () => {
  bs.stop()

  onClose()
  const crrIndex: number = bs.getSelectedIndex() < 0 ? 0 : bs.getSelectedIndex()
  if (bs.getSelectedIndex() < 0)
    bs.wheelTo(0, 0, 0)

  const { list } = props
  const crrValue: any = list[crrIndex].value
  emit('update:modelValue', crrValue)
  emit('confirm', crrValue, showLabel.value, activeIndex.value, list[crrIndex])
}

const onCancel = () => {
  bs.restorePosition()
  onClose()
  emit('cancel', activeIndex.value)
}

const onOpen = () => {
  if (props.prohibitSelect)
    return

  if (visible.value)
    return
  visible.value = true

  nextTick(() => {
    const wrapper = wheelWrapperRef.value!.children[0]
    createWheel(wrapper)
  })
}
</script>

<template>
  <div class="customizeSelectWarp-sd">
    <div class="customizeSelectBtn" :class="{ customizeSelectBtnA: type === '1' }" @click="onOpen()">
      <div class="customizeSelectBtnValue">
        <span v-if="prohibitSelect" style="color: #6D839A;">{{ prohibitText }}</span>
        <span v-else-if="showLabel" class="z_label">{{ showLabel }}</span>
        <span v-else class="placeholder">{{ placeholder }}</span>
      </div>
      <div v-if="type !== '2'" class="customizeSelectBtnIcon" :class="{ customizeSelectBtnIconActive: visible }">
        <bgImage :image="bgSrc1" />
      </div>
      <bgImage v-else :image="bgSrc2" class="customizeSelectBtnIcon2" />
    </div>

    <div v-show="visible" class="picker-mask" @click="onCancel()" />
    <div class="picker-warp" :class="{ 'picker-warp-show': visible }">
      <div class="picker-panel" @click.stop>
        <div class="picker-choose">
          <span class="cancel" @click="onCancel">取消</span>
          <span class="confirm" @click="onConfirm">完成</span>
          <p class="picker-title">
            {{ title }}
          </p>
        </div>
        <div class="picker-content">
          <div class="mask-top" />
          <div class="mask-bar" />
          <div class="mask-bottom" />
          <div ref="wheelWrapperRef" class="wheel-wrapper">
            <div class="wheel">
              <ul class="wheel-scroll">
                <li
                  v-for="(item, index) in list" :key="index"
                  :class="{ 'wheel-disabled-item': item.disabled, 'wheel-active-item': index === activeIndex }"
                  class="wheel-item"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="picker-footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customizeSelectWarp-sd {
  width: 100%;

  .customizeSelectBtn {
    flex: 1;
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.customizeSelectBtnA {
      justify-content: flex-end;
    }

    .w_with {
      width: 100%;
    }

    .customizeSelectBtnValue {
      //width: 100%;
      margin-right: 9px;
      color: #828282;

      // font-size: 16px;
      .placeholder {
        color: v-bind(placeholderColor);
      }

      .z_label {
        font-size: 16px;
        font-weight: 400;
        color: #000000;
      }
    }

    .customizeSelectBtnIcon {
      width: 13px;
      height: 7px;
      transition: transform 0.3s ease;
      transform-origin: center;

      &.customizeSelectBtnIconActive {
        // 旋转动画
        transform: rotate(180deg);
      }
    }

    .customizeSelectBtnIcon2 {
      width: 5px;
      height: 10px;
    }
  }
}

.picker-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.picker-warp {
  width: 100%;
  position: fixed;
  z-index: 101;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 288px;
  background: #fff;
  transform: translate3d(0, 288px, 0);
  transition: transform .2s ease-in-out;

  &.picker-warp-show {
    transform: translate3d(0, 0, 0);
  }
}

.picker-panel {
  width: 100%;
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 288px;
  background: #fff;

  .picker-choose {
    width: 100%;
    height: 42px;
    background-color: #F2F2F2;
    position: relative;
    display: flex;
    align-items: center;

    .picker-title {
      width: 100%;
      font-size: 13px;
      line-height: 13px;
      color: #000000;
      text-align: center;
    }

    span {
      position: absolute;
      height: 100%;
      display: flex;
      align-items: center;
      top: 0;
      color: #597EF7;
      font-size: 16px;
      line-height: 16px;

      &.cancel {
        left: 18px;
      }

      &.confirm {
        right: 18px;
      }
    }
  }

  .picker-content {
    position: relative;
    top: 30px;

    .mask-top,
    .mask-bottom {
      z-index: 10;
      width: 100%;
      height: 68px;
      pointer-events: none;
      transform: translateZ(0);
    }

    .mask-bar {
      position: absolute;
      left: 0;
      right: 0;
      top: 67px;
      margin: auto;
      width: 350px;
      height: 32px;
      background: rgba(116, 116, 128, 0.08);
      border-radius: 8px;
    }

    .mask-top {
      position: absolute;
      top: 0;
      background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }

    .mask-bottom {
      position: absolute;
      bottom: 1px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }
  }

  .wheel-wrapper {
    display: flex;
    padding: 0 18px;

    .wheel {
      flex: 1;
      width: 1%;
      height: 173px;
      overflow: hidden;
      font-size: 16px;
      position: relative;

      .wheel-scroll {
        padding: 0;
        margin-top: 68px;
        line-height: 32px;

        .wheel-item {
          height: 32px;
          overflow: hidden;
          white-space: nowrap;
          color: #5D5D5E;
          text-align: center;

          &.wheel-disabled-item {
            opacity: .2;
          }

          &.wheel-active-item {
            /* background: rgba(116, 116, 128, 0.08); */
            border-radius: 8px;
            font-size: 20px;
          }
        }
      }
    }
  }

  .picker-footer {
    height: 20px;
  }
}
</style>
