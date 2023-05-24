<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
import { timeToVietnam } from '@/utils/time';
import CgTimeMaintain from './index.d';

interface Props extends CgTimeMaintain.Props {
  start: any;
  end: any;
}
defineProps<Props>();
</script>

<template>
  <div class="flex fdr-c ai-c maintain_time">
    <cg-icon class="icon" width="120" name="i_warn" />
    <p class="dec">
      SẢNH GAME SẼ TIẾN HÀNH BẢO TRÌ, QUÝ KHÁCH VUI LÒNG CHUYỂN TRƯỚC SỐ DƯ TRONG VÍ TIỀN SẢNH VÀO
      VÍ TIỀN CHÍNH!
    </p>
    <div class="time_t">Thời Gian Bảo Trì:</div>
    <div class="time">{{ timeToVietnam(start * 1000) }}~{{ timeToVietnam(end * 1000) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.maintain_time {
  .dec {
    font: var(--cg-font-text7);
    color: var(--cg-color-red1);
    text-align: center;
  }

  .time_t {
    margin: 20px 0 8px;
    color: var(--cg-color-black1);
    font: var(--cg-font-text10);
    line-height: 28px;
  }

  .time {
    color: var(--cg-color-blue1);
    white-space: nowrap;
    font: var(--cg-font-text10);
    line-height: 28px;
  }
}
</style>
