<script lang="ts" setup>
import { onMounted, ref } from 'vue';
interface ItemProp {
  label: string
  value: any
  [key: string]: any
}
interface Props {
  list: ItemProp[]
  modelValue: any
  average?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  modelValue: null,
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
    const btn = tabsRef.value!.getElementsByClassName('nav_item')[idx] as HTMLButtonElement
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
  <div class="cg-tab" :style="average ? 'width:100%' : ''">
    <div ref="tabsRef" class="cg_nav" :style="average ? 'width:100%' : ''">
      <dl :style="average ? 'width:100%' : ''">
        <dt
          v-for="(item, index) in list" :key="index" class="nav_item" :style="average ? 'flex:1;' : ''"
          :class="modelValue === item.value ? 'active' : ''" :tab-label="item.label"
          @click="changeTabIndex(item, index)"
        >
          {{ item.label }}
        </dt>
        <dd
          v-show="activeBtnWidth !== 0 && modelValue !== null"
          :style="average ? { transform: `translateX(${btnTranslateX}%)`, width: `${activeBtnWidth}%` } : { transform: `translateX(${btnTranslateX}px)`, width: `${activeBtnWidth}px` }" class="active_bg"
        />
      </dl>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cg-tab {
  // display: inline-block;
  .cg_nav {
    border-radius:var(--cg-tab-radius);
    background: var(--cg-color-white5);
    padding: 6px;
    box-shadow: var(--cg-tab-shadow);
    dl {
      display: flex;
      position: relative;
      padding: 0;margin: 0;
      justify-content: space-around;
      
      dt {
        display: flex;
        align-items: center;
        justify-content: center;
        font:var(--cg-font-text9);
        color: var(--cg-color-black1);
        color: transparent;
        width: 338px;
        height:68px;
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
          font-size:var(--cg-font-28);
          color: var(--cg-color-black1);
          
        }

        &.active {
          &::before {
            font: var(--cg-font-text1);
            color: var(--cg-color-white);
          }
        }
      }

      .active_bg {
        position: absolute;
        bottom: 0;
        left: 0;
        // transition: all ease-in 0.2s;
        height: 100%;
        background: var(--cg-gradient-lightblue-blue);
        border-radius: var(--cg-border-radius);
        font: var(--cg-font-text1);
      }
    }
  }
}
</style>
