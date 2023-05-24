<script setup lang="ts">
import { CgAmount, CgIcon } from '@/components/cg-template-2';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import CgUseAmount from './index.d';

const userInfoStore = userInfoStateStore();
const { userInfo, refreshLoading } = storeToRefs(userInfoStore);
const doRefresh = () => {
  userInfoStore.getUserInfo();
  userInfoStore.RefreshBalance();
}

interface Props extends CgUseAmount.Props {
  prefix?: string;
  suffix?: string;
  prefixSize?: string | number;
  suffixSize?: string | number;
  amountSize?: string | number;
  amountColor?: string;
  amountWeight?: string | number;
  amountPadding?: string | number;
  amountPrefix?: string;
  segmentation?: boolean;
  shadow?: boolean
}
withDefaults(defineProps<Props>(), {
  prefix: 'i_amount',
  suffix: 'i_refresh',
  prefixSize: 52,
  suffixSize: 44,
  amountSize: '32',
  amountColor: 'orange',
  amountWeight: 700,
  amountPadding: 0,
  amountPrefix: 'K',
  segmentation: true,
});
</script>

<template>
  <div class="use_amount">
    <cg-icon class="pointer" :width="prefixSize" :name="prefix" :shadow="shadow" />
    <cg-amount class="amount" :segmentation="segmentation" :size="amountSize" :color="amountColor"
      :weight="amountWeight" :amount="userInfo.balance" :suffix="amountPrefix" :padding="amountPadding" />
    <cg-icon class="pointer" :class="{ refresh: refreshLoading }" :width="suffixSize" :name="suffix"
      @click="doRefresh" />
  </div>
</template>

<style lang="scss" scoped>
.use_amount {
  display: flex;
  align-items: center;

  .refresh {
    animation: myfirst 1s linear infinite;
  }

  .amount {
    margin: 0 6px;

    :deep(span) {
      background: linear-gradient(to bottom, var(--cg-color-orange), var(--cg-color-red2));
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  @keyframes myfirst {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
