<script lang="ts" setup>
import { areaList } from '@vant/area-data'

interface Props {
  modelValue: string
  title?: string
  delimiter?: string
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  title: '',
  delimiter: ',',
  placeholder: '',
})
const emit = defineEmits(['update:modelValue', 'onOpen', 'onCancel', 'onConfirm'])

const areaRef: any = ref(null)
const visible = ref(false)

const defaultCode = computed(() => {
  const { modelValue, delimiter } = props
  try {
    const objs: any = areaList.county_list
    const vals = modelValue.split(delimiter)[2]
    let codes = ''
    // 循环objs
    for (const key in objs) {
      if (objs[key] === vals)
        codes = key
    }
    return codes
  }
  catch (e) {
    return ''
  }
})

const onOpen = () => {
  areaRef.value?.reset(defaultCode.value)
  emit('onOpen', defaultCode.value)
  visible.value = true
}

const onCancel = () => {
  emit('onCancel', defaultCode.value)
  visible.value = false
}

const onConfirm = (item: any) => {
  const { delimiter } = props
  const values = `${item[0].name}${delimiter}${item[1].name}${delimiter}${item[2].name}`
  emit('update:modelValue', values)
  emit('onConfirm', values, item, defaultCode.value)
  visible.value = false
}
</script>

<template>
  <div class="customizeAreaSelectWarp">
    <div class="customizeSelectBtn" @click="onOpen()">
      <div class="customizeSelectBtnValue">
        <span v-if="modelValue">{{ modelValue }}</span>
        <span v-else class="placeholder">{{ placeholder }}</span>
      </div>
    </div>

    <van-popup
      v-model:show="visible"
      position="bottom"
      class="areaSelectPopBox"
    >
      <van-area ref="areaRef" item-height="33px" visible-item-count="8" class="areaSelectWarp" :area-list="areaList" :title="title" :value="defaultCode" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.customizeAreaSelectWarp{
    width: 100%;
    color:#000;
    .customizeSelectBtn {
      flex: 1;
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      .customizeSelectBtnValue{
        .placeholder{
          color: #6D839A;
        }
      }
    }

    :deep(.van-overlay){
      background: rgba(0,0,0,0.4);
    }
    .areaSelectPopBox{
      height: 289px;
    }
    .areaSelectWarp{
      :deep(.van-picker__toolbar){
        background: #F2F2F2;
        height: 42px;
        button{
          padding: 0 18px;
          color: #597EF7;
        }
      }
      :deep(.van-picker__columns){
        padding: 0 18px;
        .van-picker-column__item{
          .van-ellipsis{
            line-height: 22px;
            font-size: 16px;
            color: #5D5D5E;
          }
          &.van-picker-column__item--selected{
            .van-ellipsis{
              font-size: 22px;
            }
          }
        }
        .van-picker__frame{
          background: rgba(116,116,128,0.08);
          border-radius: 7px;
          &::after{
            display: none;
          }
        }
      }
    }
  }
</style>
