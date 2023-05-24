<script lang="ts" setup name="cg-dialog">
interface CGDialogProps {
  title: string
  content: string
  content2?: string
  cancelText?: string
  confirmText?: string
  isCancel?: boolean
  onOk: () => void
}
const props = withDefaults(defineProps<CGDialogProps>(), {
  title: '',
  content: '',
  cancelText: '取消',
  confirmText: '确定',
  isCancel: true,
  onOk: () => {},
})

const popupRef = ref()
const close = () => {
  popupRef.value.remove()
}
const onConfirm = () => {
  props.onOk()
  close()
}
</script>

<template>
  <div ref="popupRef">
    <van-overlay :show="true" class="dialogWarp flex-middle">
      <div class="wrapper flex ">
        <div class="content">
          <div class="head">
            {{ title }}
          </div>
          <div class="body">
            <p>{{ content }}</p>
            <p class="content2">
              {{ content2 }}
            </p>
          </div>
        </div>
        <div class="foot flex ai-c jc-c">
          <button v-if="isCancel" class="cancel" @click="close">
            {{ cancelText }}
          </button>
          <button class="confirm" @click="onConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="scss" scoped>
.dialogWarp {
  background-color: rgba(0, 0, 0, 0.4);

  .wrapper {
    width: 280px;
    background: $color-white-1;
    box-shadow: 0px 5px 15px 1px rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    flex-direction: column;
    padding: 20px 10px 25px 10px;
    .content {
      flex: 1;
      width: 100%;
      height: 100%;

      .head {
        width: 100%;
        height: 25px;
        font-size: $size18;
        font-weight: 600;
        color: #333333;
        text-align: center;
        margin-bottom: 20px;
      }

      .body {
        width: 100%;
        min-height: 21px;
        line-height: 21px;
        font-size: $size13;
        padding-bottom: 25px;
        text-align: center;
        .content2{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }
    }

    .foot {
      width: 100%;
      overflow: hidden;
      background: $color-white-1;

      button {
        width: 100px;
        font-size: $size13;
        color: $color-blue-1;
        background: $color-white-1;
        border: 1px solid $color-blue-1;
        height: 35px;

        &.confirm {
          background:$color-blue-1;
          color: $color-white-1;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
