<script setup lang="ts">
</script>

<template>
  <div class="transfer_wait">
    <div class="hourglass"></div>
    <p>Trong Khi Thu Hồi Ví Tiền Trong Sảnh Game,
      Vui Lòng Không Rời Khỏi Trang</p>
  </div>
</template>

<style lang="scss" scoped>
.transfer_wait {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .hourglass {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-image: url(link($base-img-dir + 'loading/hourglass.webp'));
    background-size: cover;
    margin-bottom: 10px;
  }

  p {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
    width: 310px;
    text-align: center;
  }
}
</style>
