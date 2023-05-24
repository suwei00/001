<script lang="ts" setup>
// component
import { storeToRefs } from 'pinia'
import BgImage from '~/components/bgImage.vue'
// utils
import { getBrowser } from '~/utils/helpers'

import imgSrc1 from '~/assets/images/my/search.png?preset=full'

interface Props {
  modelValue: any
  list?: any
  viewsPlaceholder?: string
  inputPlaceholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  list: storeToRefs(useAppStore()).bankList.value ?? [], // [{ label: '', value: '', icon: '' }]
  viewsPlaceholder: '',
  inputPlaceholder: '',
})
const emit = defineEmits(['update:modelValue', 'opne', 'close', 'confirm'])
const originalHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 原始高度

const searchValue = ref('')
const inCount = ref(0) // 内部数量 解决第一次进入加载会闪现动画的问题 千万不能动
const visibit = ref(false)
const isFocus = ref(false) // 输入框是否选中状态，若选中则不显示下滑。

const names = computed(() => {
  const { modelValue, list } = props
  try {
    return list.filter((item: any) => item.value === modelValue)[0]?.label
  }
  catch (e) {
    return ''
  }
})

const listFilter = computed(() => {
  const { list = [] }: any = props
  try {
    return list.filter((item: any) => item.label.includes(searchValue.value))
  }
  catch (err) {
    return []
  }
})

const opne = () => {
  inCount.value++

  emit('opne')
  visibit.value = true
}

const close = () => {
  searchValue.value = ''
  emit('close')
  visibit.value = false
}

const confirm = (item: any) => {
  inCount.value++

  emit('update:modelValue', item.value)
  emit('confirm', item)
  close()
}

const onFocus = (el: any) => {
  el && el.target.focus()
  isFocus.value = true
}

const keyupEnter = (el: any) => {
  // 回车失焦收起键盘
  el.target.blur()
}

const keyboardClosed = () => {
  const { isIos } = getBrowser()
  if (isIos) {
    document.body.addEventListener('focusin', () => {
      isFocus.value = true
      // 软键盘弹出的事件处理
    })
    document.body.addEventListener('focusout', () => {
      isFocus.value = false
      // 软键盘收起的事件处理
    })
  }
  else {
    // 获取原窗口的高度
    window.onresize = function () {
      // 键盘弹起与隐藏都会引起窗口的高度发生变化
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (resizeHeight < originalHeight)
        isFocus.value = true
      // 当软键盘弹起，在此处操作
      else
        isFocus.value = false
      // 当软键盘收起，在此处操作
    }
  }
}

const viewIcon = (list: Array<any>) => {
  if (canUseAvif())
    return list[0].srcset
  if (canUseWebp())
    return list[1].srcset
  else
    return list[2].srcset
}

onMounted(() => {
  document.body.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  keyboardClosed()
})
</script>

<template>
  <div class="search-pull-select-warps">
    <div class="pull-select" @click="opne()">
      <div class="pull-select-text">
        <span>{{ names }}</span>
        <span
          v-show="names === null || names === undefined || names === ''"
          class="pull-select-text-placeholder"
        >{{ viewsPlaceholder }}</span>
      </div>
      <div class="pull-select-icon" />
    </div>

    <teleport to="body">
      <div class="customize-pickers">
        <div v-show="visibit" class="customize-pickers-mask" @click.stop="close()" />
        <div
          class="select-content-warp" :class="{ 'select-content-warp-show': visibit }"
        >
          <div class="select-content">
            <div class="select-content-head">
              <div class="select-content-search">
                <BgImage class="select-content-search-icon" :image="imgSrc1" />
                <input
                  v-model="searchValue" type="text" :placeholder="inputPlaceholder"
                  @focus="onFocus" @keyup.enter="keyupEnter"
                >
              </div>
            </div>
            <div class="select-content-body">
              <ol>
                <li v-for="(item, idx) in listFilter" :key="idx" @click="confirm(item)">
                  <img loading="lazy" class="select-li-logo" :src="viewIcon(item.icon)">
                  <span>{{ item.label }}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.search-pull-select-warps {
  width: 100%;
  font-size: 12px;
  color: #000;
  .bank-logo{
    width: 40px;
    height: 33px;
  }

  .pull-select {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pull-select-text {
          flex: 1;
          font-size: 12px;

          .pull-select-text-placeholder {
              color:#6D839A;
          }
      }

      .pull-select-icon {
          width: 5px;
          height: 10px;
      }
  }
}

.customize-pickers {
  width: 100%;

  .customize-pickers-mask {
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
  }

  .select-content-warp {
      position: fixed;
      z-index: 101;
      left: 0;
      width: 100%;
      max-height: calc(100% - 120px); // 最重要的，决定输入框聚焦会不会被遮住，千万不要动。

      transition: bottom 0.3s ease;
      bottom: -500px;

      &.select-content-warp-show {
        bottom:0;
      }

      .select-content {
          width: 100%;
          background-color: #fff;

          .select-content-head {
              width: 100%;
              height: 65px;
              display: flex;
              align-items: center;
              padding: 0 18px;

              .select-content-search {
                  width: 100%;
                  height: 35px;
                  background-color: #F4F4F4;
                  border-radius: 15px;
                  display: flex;
                  align-items: center;
                  border-radius: 100px;
                  padding: 0 8px;

                  .select-content-search-icon {
                      width: 14px;
                      height: 16px;
                      margin-right: 6px;
                  }

                  input {
                      width: 100%;
                      background: transparent;
                      color: #000;
                      font-size: 13px;
                      padding: 16px;

                      &::placeholder {
                        color: #818186;
                      }
                  }
              }

              .select-content-search-close {
                  width: 30px;
                  height: 30px;
                  margin-left: 18px;
                  background-color: #fcefd5;
              }
          }

          .select-content-body {
              width: 100%;
              height: 333px;
              overflow: hidden;

              ol {
                  width: 100%;
                  height: 100%;
                  overflow-y: auto;
                  padding: 0 18px;

                  font-size: 15px;
                  line-height: 15px;

                  /* // 修改 scroll 样式
                  &::-webkit-scrollbar {
                      width: 8px;
                      margin-right: 20px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: #F5E8C4;
                      height: 70px;
                      border-radius: 20px;
                  }

                  &::-webkit-scrollbar-button {
                      height: 25px;
                  }

                  &::-webkit-scrollbar-track-piece {
                      background-color: #72716F;
                      border-radius: 20px;
                  } */

                  li{
                    width: 100%;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    border-top: 1px solid  rgba(60,60,67,0.36);
                    .select-li-logo{
                      display: block;
                      width: 33px;
                      height: 33px;
                      margin-right: 18px;
                      background-position: center;
                      background-size: 100%;
                      background-repeat: no-repeat;
                    }
                    &:last-child{
                      border-bottom: 1px solid  rgba(60,60,67,0.36);
                    }
                  }
              }
          }
      }
  }
}
</style>
