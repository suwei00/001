<script setup lang='ts' name=''>
import { CgContainer, CgContainerHead, CgButton } from '@/components/cg-template-2'

defineProps<{ amount: string, close: () => void }>()
</script>
<template>
  <CgContainer border="0" width="540" :isShadow="false">
    <CgContainerHead height="80">
      <template #center>
        <span class="title">LƯU Ý</span>
      </template>
    </CgContainerHead>
    <div class="body">
      <div class="main">
        <div class="text">Xin Chúc Mừng!<br />
          Bạn Đã Nhận Được<br /> {{ amount }} Tiền Thưởng.</div>
      </div>
      <CgButton center small @click="close">XÁC NHẬN</CgButton>
    </div>
  </CgContainer>
</template>
<script lang='ts'>
export default {
  name: 'CgcpbetDialog'
}
</script>

<style lang='scss' scoped>
.title {
  font: var(--cg-font-h4);
}

.body {
  padding-bottom: 40px;

  .main {
    width: 100%;
    height: 424px;
    @include webp($base-img-dir + '/promotion/cgcpbet.png');
    background-size: 100% 100%;
    margin-bottom: 20px;
    position: relative;

    .text {
      width: 234px;
      position: absolute;
      top: 332px;
      left: 50%;
      transform: translateX(-50%);
      font: var(--cg-font-text10);
      color: var(--cg-color-white);
      text-align: center;
    }
  }
}
</style>