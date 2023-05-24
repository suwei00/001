<script setup lang="ts">
const typeOptions: any = {
  success: exportImg.toast_success
}
interface CGToastProps {
  type: string
  message: string
}

withDefaults(defineProps<CGToastProps>(), {
  type: 'success'
})
</script>

<template>
  <div class="cg_toast">
    <img class="icon" :class="[type]" :src="getSupportImage(typeOptions[type])" alt="" />
    <div class="message font_32">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_toast {
  position: fixed;
  z-index: 2010;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 270px;
  height: 270px;
  border-radius: 30px;
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--cg-color-bg-9);

  .icon {
    width: 88px;
    margin-top: 60px;
    margin-bottom: 36px;
  }

  .message {
    color: var(--cg-color-text-white);
  }
}
</style>
