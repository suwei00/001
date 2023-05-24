<script lang="ts" setup name="cgDialog">
import closeImg from '~/assets/images/home/closeMes.png?preset=full'
const props = withDefaults(defineProps<CGDialogProps>(), {
  modelValue: false,
  title: '',
  content: '',
  cancelText: '取消',
  confirmText: '确定',
  isCancel: false,
  isConfirm: false,
  onOk: () => { },
})

const emit = defineEmits(['update:modelValue'])

interface CGDialogProps {
  modelValue: boolean
  title: string
  content?: string
  cancelText?: string
  confirmText?: string
  isCancel?: boolean
  isConfirm?: boolean
  onOk: () => void
}
const close = () => {
  emit('update:modelValue', false)
}
const onConfirm = () => {
  props.onOk()
  close()
}
</script>

<template>
  <van-overlay :show="modelValue" class="dialogWarp flex-middle">
    <div class="wrapper ">
      <div class="close_icon">
        <bgImage :image="closeImg" class="close_img" @click="close" />
      </div>
      <div class="pop_title flex ai-c jc-c">
        {{ title }}
      </div>
      <div class="cg_contents">
        <div class="body">
          <p>{{ content }}</p>
          <slot name="bgBody" />
        </div>
        <div class="foot flex ai-c jc-c">
          <button v-if="isCancel" class="cancel" @click="close">
            {{ cancelText }}
          </button>
          <button v-if="isConfirm" class="confirm" @click="onConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<style lang="scss" scoped>
.dialogWarp {
  background-color: rgba(0, 0, 0, 0.4);

  .wrapper {
    width: 260px;
    background: #ffffff;
    box-shadow: 0px 5px 15px 1px rgba(0, 0, 0, 0.16);
    flex-direction: column;
    border-radius: 13px;
    position: relative;

    .pop_title {
      text-align: center;
      line-height: 30px;
      width: 260px;
      height: 30px;
      color: #fff;
      background: linear-gradient(90deg, #95AEFF 0%, #7695FB 49%, #597EF8 100%);
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      border-radius: 13px 13px 0 0;
    }

    .close_icon {
      width: 28px;
      height: 28px;
      padding: 7px;
      position: absolute;
      right: 4px;
      top: 3px;

      .close_img {
        width: 12px;
        height: 12px;
      }
    }

    .cg_contents {
      border-radius: 13px;
    }

    .body {
      width: 100%;
      min-height: 21px;
      line-height: 21px;
      font-size: 13px;
      text-align: center;
    }

    .foot {
      width: 100%;
      overflow: hidden;

      button {
        width: 114px;
        height: 32px;
        border-radius: 5px;
        border: 1px solid #597EF7;
        font-size: 14px;
        background: #ffffff;
        color: #597EF7;

        &.confirm {
          width: 114px;
          height: 32px;
          background: #597EF7;
          border-radius: 5px;
          color: #ffffff;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
