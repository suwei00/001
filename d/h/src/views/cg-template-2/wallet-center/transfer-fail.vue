<script setup lang='ts'>
import { formatNumToCurrency2Decimal } from '@/utils/format';

defineProps<{ errList: any }>()
</script>
<template>
  <div class='transfer-fail'>
    <div class="flex fdr-c ai-c">
      <div class="title">{{ $t('plat_list.fail') }}</div>
      <div class="plat-list">
        <p v-for="i in errList" :key="i.id">{{ i.name }}：{{ formatNumToCurrency2Decimal(i.amount) }}</p>
      </div>
      <p>{{ $t('plat_list.tip') }}</p>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'TransferFail'
}
</script>

<style lang='scss' scoped>
.transfer-fail {
  font: var(--cg-font-text4);
  color: var(--cg-color-black1);
  text-align: center;

  .title {
    font: var(--cg-font-text8);
    color: var(--cg-color-red);
    margin-bottom: 15px;
  }
}
</style>