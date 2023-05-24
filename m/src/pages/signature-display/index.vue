<script setup lang="ts">
const inputVal = ref('')
const submitRemark = () => {
  // if (inputVal.value) {
  Dialog({
    message: 'Bạn có muốn lưu thay đổi này không?',
    confirmButtonText: 'Lưu',
    cancelButtonText: 'Không Lưu trữ',
    onClose: () => { },
    onOk: () => {
      return true
    }
  })
  // }
}
</script>
<template>
  <cg-nav-header fixed left-arrow title="Chữ ký cá nhân" placeholder />
  <div class="signature">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxa'a'a'a'a'a'a'a'a'a'a'a'a'a'a'a'a'a'a</div>
</template>
<style lang="scss" scoped>
.signature {
  background-color: var(--cg-color-bg-white);
  padding: 36px 32px;
  font: var(--cg-font-6);
  color: var(--cg-color-text-3);
  word-wrap: break-word;
  line-height: 37px;
}
</style>