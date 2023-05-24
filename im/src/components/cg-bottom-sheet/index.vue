<script setup lang="ts">
import { useVModel } from '@vueuse/core'
interface CGBottomSheetProps {
  modelValue: boolean;
  clickOverlayClose?: boolean;
  isBoldSeledtText?: boolean; // 中间标题是否加粗
  selectLeftText?: string;
  selectText?: string;
  selectRightText?: string;
  bottomCancelBtn?: string;
  radius?: number | string;
  isTitleBorder?: boolean;// 是否显示标题下边框
}
const props = withDefaults(defineProps<CGBottomSheetProps>(), {
  modelValue: false,
  clickOverlayClose: true,
  isBoldSeledtText: false,
  selectLeftText: '',
  selectText: '',
  selectRightText: '',
  bottomCancelBtn: '',
  radius: 30,
  isTitleBorder: true
})
const emit = defineEmits(['update:modelValue', 'onOk']);

const _modelValue = useVModel(props, 'modelValue', emit);
const onOk = () => {
  _modelValue.value = false;
  emit('onOk');
};
</script>

<template>
  <van-action-sheet v-model:show="_modelValue" :close-on-click-overlay="props.clickOverlayClose"
    :style="`border-radius: var(--cg-px-${props.radius}) var(--cg-px-${props.radius}) 0 0 !important;`">
    <div class="cg_bottom_sheet">
      <div :class="['cg_bottom_sheet_head', props.isTitleBorder ? 'title_border' : '']"
        v-if="props.selectLeftText || props.selectText || props.selectRightText">
        <div class="cancel" v-if="props.selectLeftText" @click="_modelValue = false">
          {{ props.selectLeftText }}
        </div>
        <div :class="['title', props.isBoldSeledtText ? 'bold-title' : 'light-title']" v-if="props.selectText">{{
          props.selectText
        }}
        </div>
        <div class="ok" @click="onOk" v-if="props.selectRightText">{{ props.selectRightText }}</div>
      </div>
      <slot name="content" />
      <div class="bottom_cancel" v-if="props.bottomCancelBtn">
        <div class="bottom_cancel_btn" @click="_modelValue = false">{{ props.bottomCancelBtn }}</div>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.cg_bottom_sheet {
  padding-bottom: 28px;
  background-color: var(--cg-color-bg-white);
  display: flex;
  flex-direction: column;

  :deep(.van-action-sheet__content) {
    overflow: hidden;
  }

  &_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    padding: 0 32px;
    position: relative;

    .title {
      flex: 1;
      text-align: center;
      color: var(--cg-color-text-3);
      padding: 0 12px;
    }

    .light-title {

      font: var(--cg-font-6);
    }

    .bold-title {
      font: var(--cg-font-5);
    }

    .cancel {
      position: absolute;
      left: 32px;
      min-width: 140px;
      color: var(--cg-color-text-4);
      font: var(--cg-font-5);
      white-space: nowrap;
    }

    .ok {
      right: 32px;
      position: absolute;
      text-align: right;
      min-width: 140px;
      white-space: nowrap;
      color: var(--cg-color-text-1);
      font: var(--cg-font-5);
      white-space: nowrap;
    }


  }

  .title_border {
    border-bottom: 2px solid var(--cg-color-border-1);
  }
}

.bottom_cancel {
  padding-top: 20px;
  background-color: var(--cg-color-bg-8);

  &_btn {
    height: 109px;
    line-height: 109px !important;
    text-align: center;
    color: var(--cg-color-text-4);
    font: var(--cg-font-5);
    background-color: var(--cg-color-bg-white);
  }
}
</style>
