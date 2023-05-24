<script setup lang='ts'>
import { computed } from 'vue'
import { CgIcon, CgAmount, CgTime } from '@/components/cg-template-2';

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
    <CgIcon width="50" :name="icon" />
    <span class="title" :class="statusClass">
      {{ title }}
    </span>
    <template v-if="status === 'success'">
      <CgAmount style="height: 31px;" size="20" weight="700" color="red3" segmentation suffix="K" :amount="amount" />
      <div class="time">
        Thời Gian Hoàn Thành:&nbsp;
        <cg-time :time="Number(time) * 1000" />
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
    font: var(--cg-font-text2);
    line-height: 2;
  }

  .success {
    color: var(--cg-color-green);
  }

  .faild {
    color: var(--cg-color-red);
    margin-top: 8px;
    line-height: 1;
  }

  .time {
    display: flex;
    color: var(--cg-color-grey1);
    font-size: var(--cg-font-15);
  }
}
</style>