<script setup lang='ts'>
import PromotionHeader from './components/promotion-header.vue'
import { inject, computed, ref } from 'vue';
import { useDetail } from './useDetail'
import { CgButton } from '@/components/cg-template-2'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';
import APIs from '@/http/blue-apis';
import { Toast } from 'vant';

const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin } = storeToRefs(useAppStore())

const { banner, details, title, data } = useDetail(id, flag);
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
<template>
  <div class='static-page'>
    <PromotionHeader :title="title" />
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" :key="rule1" is-google-cloud />
      <CgButton v-show="rule1" @click="handleApply" :disabled="amount === 0"
        style="margin-top:var(--cg-px-32);margin-bottom:var(--cg-px-32);" center width="498">NHẬN NGAY
      </CgButton>
      <app-image v-for="item in rules" :src="item" :key="item" is-google-cloud />
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Rescue'
}
</script>

<style lang='scss' scoped>
.static-page {
  .banner {
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;
  }

  .details {
    width: 686px;
    margin: 0 auto;

    img {
      width: 100%;
      display: block;
      margin-bottom: 24px;
    }
  }
}
</style>