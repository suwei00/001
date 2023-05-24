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
    <cg-icon width="72" name="i_maintain" />
    <p class="dec">SẢNH GAME SẼ TIẾN HÀNH BẢO TRÌ, QUÝ KHÁCH VUI LÒNG CHUYỂN TRƯỚC SỐ DƯ TRONG VÍ TIỀN SẢNH VÀO VÍ TIỀN CHÍNH!</p>
    <p class="time_t">Thời Gian Bảo Trì:</p>
    <p class="time">{{ timeToVietnam(start * 1000).format('DD/MM/YYYY HH:mm:ss') }}~{{ timeToVietnam(end * 1000).format('DD/MM/YYYY HH:mm:ss') }}</p>
  </div>
</template>

<style lang="scss" scoped>
.dec {
  font: var(--cg-font-text2);
  color: var(--cg-color-red1);
  text-align: center;
}

.time_t {
  margin: 20px 0 12px;
  font: var(--cg-font-text1);
  color: var(--cg-color-grey1);
}

.time {
  font: var(--cg-font-text3);
  color: var(--cg-color-blue12);
}
</style>
