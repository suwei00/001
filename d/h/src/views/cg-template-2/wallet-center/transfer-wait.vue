<script setup lang='ts'>
// 123
</script>
<template>
  <div class='transfer-wait'>
    <app-image class="hourglass" src="/hourglass.webp" />
    <p>Trong Khi Thu Hồi Ví Tiền Trong Sảnh Game,Vui Lòng Không Rời Khỏi Trang</p>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'TransferWait'
}
</script>

<style lang='scss' scoped>
.transfer-wait {
  font: var(--cg-font-text4);
  color: var(--cg-color-black1);
  text-align: center;

  .hourglass {
    width: 100px;
    margin-bottom: 20px;
  }
}
</style>