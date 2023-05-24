<script lang="ts" setup>
import CustomizeCountdown from '~/components/customizeCountdown/index.vue'
import useBackRouter from '~/hooks/routerBackHooks'

interface Props {
  modelValue: boolean
  title?: string
  content?: string
  jumpText?: string // 需要跳转的页面文案
  jumpPath?: string // 需要跳转的页面
  time?: number // 倒计时时间
  cancelText?: string
  confirmText?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  content: '',
  jumpText: '',
  jumpPath: '',
  time: 3000,
  cancelText: '取消',
  confirmText: '确定',
})
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])
const { goTo } = useBackRouter()

const visible = ref(false)

watch(() =>
  props.modelValue,
() => {
  visible.value = props.modelValue
})

const onCancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const onConfirm = () => {
  emit('update:modelValue', false)
  emit('confirm')

  const { jumpPath } = props
  if (jumpPath)
    goTo(jumpPath)
}
</script>

<template>
  <van-overlay :show="visible" class="dialogWarp">
    <div class="wrapper">
      <div class="content">
        <div class="head">
          {{ title }}
        </div>
        <div class="body">
          {{ content }}
          <p v-if="jumpText" class="jumpTip">
            <span><CustomizeCountdown v-if="visible" :time="time" :start="visible" @on-finish="onConfirm()" />s</span>
            自动跳转{{ jumpText }}
          </p>
        </div>
      </div>
      <div class="foot">
        <button class="cancel" @click="onCancel()">
          {{ cancelText }}
        </button>
        <button class="confirm" @click="onConfirm()">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </van-overlay>
</template>

<style lang="scss" scoped>
.dialogWarp {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);

  .wrapper {
    width: 260px;
    min-height: 135px;
    background: rgba(242, 242, 242, 1);
    border-radius: 14px;
    backdrop-filter: blur(19px);
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
      width: 100%;
      height: 100%;
      padding: 10px;

      .head {
        width: 100%;
        font-size: 13px;
        color: #0A7AFF;
        line-height: 17px;
        min-height: 17px;
        text-align: center;
        padding-bottom: 6px;
      }

      .body {
        width: 100%;
        min-height: 21px;
        line-height: 21px;
        font-size: 13px;
        padding-bottom: 6px;
        text-align: center;
        .jumpTip{
          width: 100%;
          padding-top: 3px;
          font-size: 11px;
          color: #383838;
          line-height: 17px;
          min-height: 17px;
          span{
            color:#0A7AFF;
          }
        }
      }
    }

    .foot {
      width: 100%;
      height: 42px;
      border-top: 1px solid rgba(60, 60, 67, 0.36);
      display: flex;
      overflow: hidden;

      button {
        width: 50%;
        border-right: 1px solid #A4A4A7;
        font-size: 15px;
        color: #858585;

        &:last-child {
          border-right: none;
        }

        &.confirm {
          color: #597EF7;
        }
      }
    }
  }
}
</style>
