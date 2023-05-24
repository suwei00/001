<script setup lang='ts'>
import { CgContainer, CgContainerHead, CgIcon, CgButton } from '@/components/cg-template-2'

defineProps<{ amount: string, close: () => void }>()
</script>
<template>
  <CgContainer type="popup" width="800" radius="12">
    <template #content>
      <CgContainerHead height="48">
        <template #center>
          <span class="title">Lưu Ý</span>
        </template>
        <template #right>
          <CgIcon width="20" class="pointer" name="i_grey_close" @click="close" />
        </template>
      </CgContainerHead>
      <div class="body">
        <div class="text">Xin Chúc Mừng!<br />
          Bạn Đã Nhận Được<br /> {{ amount }} Tiền Thưởng.</div>
      </div>
      <CgButton style="margin-bottom: 49px;" width="300" center @click="close">Xác Nhận</CgButton>
    </template>
  </CgContainer>
</template>
<script lang='ts'>
export default {
  name: 'CGCpBetDialog'
}
</script>

<style lang='scss' scoped>
.title {
  font: var(--cg-font-text2);
  text-transform: uppercase;
}

.body {
  width: 100%;
  height: 542.63px;
  @include webp($base-img-dir + 'promotion/cgcpbet_dialog.png');
  background-size: 100% 100%;
  padding-top: 400px;
  padding-left: 279px;

  .text {
    font-size: var(--cg-font-22);
    font-weight: 700;
    color: var(--cg-color-white);
    width: 240px;
    text-align: center;
    line-height: 28px;
  }
}
</style>