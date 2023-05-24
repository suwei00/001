<script setup lang='ts'>
import { computed } from 'vue'
import { CgIcon, CgAmount } from '@/components/cg-template-2';
import { timeToVietnam } from '@/utils/time';

interface Props {
  type: 'deposit' | 'withdraw'
  status: 'success' | 'faild'
  amount: string
  time: number | string
}
const props = defineProps<Props>()
const title = computed(() => {
  if (props.type === 'deposit') {
    if (props.status === 'success') return 'NẠP TIỀN THÀNH CÔNG'
    else return 'NẠP TIỀN KHÔNG THÀNH CÔNG'
  }
  else if (props.type === 'withdraw') {
    if (props.status === 'success') return 'RÚT TIỀN THÀNH CÔNG'
    else return 'RÚT TIỀN KHÔNG THÀNH CÔNG'
  }
})

const icon = computed(() => `i_${props.status === 'success' ? 'success' : 'faild'}`)
const statusClass = computed(() => props.status === 'success' ? 'success' : 'faild')
</script>
<template>
  <div class="finance-popup">
    <CgIcon width="100" :name="icon" />
    <span class="title" :class="statusClass">
      {{ title }}
    </span>
    <template v-if="status === 'success'">
      <CgAmount size="28" weight="700" color="red4" segmentation suffix="K" :amount="amount" />
      <div class="time">
        Thời Gian Hoàn Thành: {{ timeToVietnam(+ time * 1000) }}
      </div>
    </template>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'FinancePopup'
}
</script>

<style lang='scss' scoped>
.finance-popup {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font: var(--cg-font-text7);
    line-height: 2;
  }

  .success {
    color: var(--cg-color-green);
  }

  .faild {
    color: var(--cg-color-red2);
    margin-top: 8px;
    line-height: 2;
  }

  .time {
    color: var(--cg-color-black1);
    font: var(--cg-font-text4);
    margin-top: 20px;
  }
}
</style>