<script setup lang='ts' name="dialog-tip">
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
        请您仔细核对填写信息内容！为了您的隐私安全，
        个人资料在提交后无法修改
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
    text-align: center;
    margin: 0 auto 50px;
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
