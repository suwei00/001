<script lang="ts" setup>
interface itemProp {
  label: string
  value: any
  [key: string]: any
}
interface Props {
  list: itemProp[]
  modelValue: any
  typeValue?: string
  average?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  modelValue: null,
  typeValue: 'nav', // nav btn
  average: false, // 是否平分tags宽度
})
const emit = defineEmits(['update:modelValue', 'onTab'])

const tabsRef = ref<HTMLElement | null>(null)
const activeBtnWidth = ref<null | number>(null)
const btnTranslateX = ref(-50)

const init = (val: any) => {
  const { list, average } = props
  if (val === null)
    return null
  let btnLeft: any = ''
  let btnWidth: any = ''
  let idx = 0

  list.forEach((item, index) => {
    if (val === item.value)
      idx = index
  })

  if (average) {
    const len = list.length ?? 0
    if (len) {
      btnLeft = 100 * idx
      btnWidth = 100 / len
    }
  }
  else {
    const btn = tabsRef.value!.getElementsByClassName('customizeTabsBtn')[idx] as HTMLButtonElement
    btnLeft = btn.offsetLeft
    btnWidth = btn.offsetWidth
  }
  activeBtnWidth.value = btnWidth
  btnTranslateX.value = btnLeft
}

const changeTabIndex = (item: any, idx: any) => {
  if (item.value === props.modelValue)
    return
  emit('update:modelValue', item.value)
  emit('onTab', item, idx)
  init(item.value)
}

onMounted(() => {
  init(props.modelValue)
})
</script>

<template>
  <div class="customizeSlideWarp" :style="average ? 'width:100%' : ''">
    <div v-if="typeValue === 'nav'" ref="tabsRef" class="customizeTabsWarp" :style="average ? 'width:100%' : ''">
      <ol :style="average ? 'width:100%' : ''">
        <li
          v-for="(item, index) in list" :key="index" class="customizeTabsBtn" :style="average ? 'flex:1;' : ''"
          :class="modelValue === item.value ? 'active' : ''" @click="changeTabIndex(item, index)"
        >
          {{ item.label }}
        </li>
      </ol>
      <div
        v-show="activeBtnWidth !== 0 && modelValue !== null"
        :style="average ? { transform: `translateX(${btnTranslateX}%)`, width: `${activeBtnWidth}%` } : { transform: `translateX(${btnTranslateX}px)`, width: `${activeBtnWidth}px` }" class="activeBtnBg"
      />
    </div>
    <div v-else-if="typeValue === 'btn'" ref="tabsRef" class="customizeNavWarp" :style="average ? 'width:100%' : ''">
      <dl :style="average ? 'width:100%' : ''">
        <dt
          v-for="(item, index) in list" :key="index" class="customizeTabsBtn" :style="average ? 'flex:1;' : ''"
          :class="modelValue === item.value ? 'active' : ''" :tab-label="item.label"
          @click="changeTabIndex(item, index)"
        >
          {{ item.label }}
        </dt>
        <dd
          v-show="activeBtnWidth !== 0 && modelValue !== null"
          :style="average ? { transform: `translateX(${btnTranslateX}%)`, width: `${activeBtnWidth}%` } : { transform: `translateX(${btnTranslateX}px)`, width: `${activeBtnWidth}px` }" class="activeBtnBg"
        />
      </dl>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customizeSlideWarp {
  display: inline-block;

  .customizeTabsWarp {
    overflow: hidden;
    position: relative;

    ol {
      display: flex;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 27px;
        min-height: 30px;
        line-height: 27px;
        text-align: center;
        color: #FFFFFF;
        text-transform: uppercase;
        font-family: Myriad Pro, Regular;
        border-bottom: 1px solid #8e8b8b;
        padding: 0 5px;

        &.active {
          color: #f5e8c4;
        }
      }
    }

    .activeBtnBg {
      position: absolute;
      bottom: 0;
      left: 0;
      transition: all ease-in 0.1s;
      height: 6px;
      background: #f5e8c4;
    }
  }

  .customizeNavWarp {
    border-radius: 200px;
    background-color: rgba(242,242,242,0.8);
    backdrop-filter: blur(19px);
    padding: 2px;

    dl {
      display: flex;
      position: relative;

      dt {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #818186;
        line-height: 13px;
        color: transparent;
        width: 106px;
        height: 26px;
        position: relative;

        &::before {
          position: absolute;
          width: 100%;
          height: 100%;
          content: attr(tab-label);
          left: 0;
          top: 0;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #818186;
          line-height: 13px;
          width: 106px;
          height: 26px;
        }

        &.active {

          &::before {
            color: #000000;
            font-size: 14px;
          }
        }
      }

      .activeBtnBg {
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all ease-in 0.2s;
        height: 100%;
        background-color:#fff;
        border-radius: 200px;
      }
    }
  }
}
</style>
