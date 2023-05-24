<template>
  <div class="promotion-detail">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" is-google-cloud />
      <CgButton @click="handleApply" :disabled="amount === 0" style="margin-bottom: 30px;" center width="300">NHẬN NGAY
      </CgButton>
      <app-image v-for="r in rules" :src="r" :key="r" is-google-cloud />
    </div>
  </div>
</template>

<script setup lang="ts" >
import { inject, computed, ref } from 'vue';
import { useDetail } from './useDetail'
import { CgButton } from '@/components/cg-template-2'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';
import APIs from '@/http/blue-apis';
import Toast from '@/components/cg-template-2/toast';

const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin } = storeToRefs(useAppStore())

const { banner, details, data } = useDetail(id, flag);
const rule1 = computed(() => details.value[0] || '')
const rules = computed(() => details.value.slice(1) || '')
const amountList = computed(() => data.value?.rules.reverse() || [])

const amount = ref(0)
if (isLogin.value) {
  APIs.getPromotionProfit().then((res) => {
    amount.value = amountList.value.find((item: any) => item.lose_amount <= Math.abs(+res))?.bonus_amount || 0
  });
}

// 申请
const handleApply = () => {
  APIs.getPromotionApply({ id, flag: 'rescue', amount: amount.value, bonus_type: 1 }).then((res) => {
    Toast('Nhận hoa hồng thành công')
  });
}
</script>

<style lang="scss" scoped>
.promotion-detail {
  width: 100%;
  padding-bottom: 81px;

  .banner {
    margin: 0 auto;
    max-width: 1920px;
    min-width: 1200px;
    height: 550px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
  }

  .details {
    width: 1200px;
    margin: 0 auto;

    img {
      display: block;
      margin-bottom: 30px;
    }
  }
}
</style>