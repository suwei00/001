<script setup lang='ts' name="dialog-add-bank">
const emit = defineEmits(['confirm'])
const { isOpen, open, close } = usePersonalDialog()

const onConfirm = () => {
  emit('confirm')
  close()
}
// 暴露
defineExpose({
  open,
})
</script>

<template>
  <personal-dialog v-if="isOpen" title="温馨提示">
    <template #right>
      <div class="right" @click="close">
        <img src="@icons/personal/finance/close-icon.svg" alt="">
      </div>
    </template>
    <template #body>
      <p w-330px>
        您还未设置安全密码，为了您的账户安全，请先去设置安全密码！
      </p>
      <button @click="onConfirm">
        确认
      </button>
    </template>
  </personal-dialog>
</template>

    <style lang='scss' scoped>
    .right {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding: 5px;

        img {
            width: 14px;
            height: 14px;
        }
    }

    p {
        width:100%;
        margin-bottom:50px;
        text-align: center;
        font-size: 15px;
        font-family: $jl-font;
        font-weight: 400;
        color: #333333;
    }
    button {
      width: 450px;
      height: 50px;
      background: #597EF7;
      color: #fff;
      border-radius: 6px;
      font-size: 18px;
    }
    </style>

