<script setup lang="ts">
defineProps<{
  onClose: () => void;
}>();
</script>

<template>
  <div class="transfer_wait">
    <div class="hourglass"></div>
    <p class="text">Trong Khi Thu Hồi Ví Tiền Trong Sảnh Game , Vui Lòng Không Rời Khỏi Trang</p>
    <button class="cg_but but_w" @click="onClose">XÁC NHẬN</button>
  </div>
</template>

<style lang="scss" scoped>
.transfer_wait {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 498px;
  background-color: #140909;
  padding: 30px 0 24px 0;

  .hourglass {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-image: url(link($base-img-dir + 'loading/hourglass.gif'));
    background-size: cover;
    margin-bottom: 10px;
  }
  .text {
    font-size: 12px;
    color: #f0f0f0;
    width: 280px;
    text-align: center;
    margin-bottom: 22px;
  }
  .but_w {
    width: 125px;
    height: 40px;
    border-radius: 40px;
  }
}
</style>
