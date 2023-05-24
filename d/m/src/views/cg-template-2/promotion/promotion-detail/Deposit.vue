<template>
  <div class="promotion-detail">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <div v-for="item, index in rulesImg" :key="item">
        <app-image :src="item" is-google-cloud />
        <CgButton :disabled="!(obj && obj.activeIndex === Number(index + 1))" @click="handleApply(Number(index + 1))"
          style="margin-bottom: 30px;" center width="300">NHẬN NGAY
        </CgButton>
      </div>
      <app-image v-for="r in restRulesImg" :src="r" :key="r" is-google-cloud />
    </div>
  </div>
</template>

<script setup lang="ts" >
import { inject, computed, ref } from 'vue';
import { useDetail } from './useDetail'
import { CgButton } from '@/components/cg-template-2'
import APIs from '@/http/blue-apis';
import Toast from '@/components/cg-template-2/toast';
import _ from 'lodash';
import { useRequest } from 'vue-request'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';

const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin } = storeToRefs(useAppStore())

const { banner, details, data } = useDetail(id, flag);
const rulesImg = computed(() => details.value.slice(0, 3) || [])
const restRulesImg = computed(() => details.value.slice(3) || [])
const rules = computed(() => data.value?.rules)

// 查看申请状态
const { data: applyStatusData, refresh: refreshStatus } = useRequest(() => APIs.getFirAppDetail({ id, flag }), {
  ready: isLogin,
});
// 获取上一次成功提款后的存款详情
const { data: deposit } = useRequest(APIs.getPromoDepDetail, { ready: isLogin });

// 1=首存 2=二存 3=三存
const lv = ref(1);
const mergedInfo = computed(() => {
  if (!applyStatusData.value || !deposit.value || !rules.value) return null;
  return _.zip(Object.values(applyStatusData.value), Object.values(deposit.value), Object.values(rules.value)).map((item: any, index: any) => {
    return [...item, index + 1];
  });
});
const obj: any = computed(() => {
  if (!mergedInfo.value) return null;
  // 找到第一个false(没有申请过的)
  const activeIndex = mergedInfo.value.findIndex((item: any) => item[0] === false);
  if (activeIndex === -1) return null;
  // 判断第一个没有申请过的是否符合条件
  const item = mergedInfo.value[activeIndex];
  const [, deposit, rules] = item;
  const sortedRules = _.orderBy(rules as any, ['deposit_amount'], ['desc']);
  const index = sortedRules.findIndex((item: any) => {
    return BigInt(item.deposit_amount) <= BigInt((deposit as any) ?? 0);
  });
  const data = sortedRules[index];
  return activeIndex !== -1 && index !== -1 ? { data, activeIndex: activeIndex + 1 } : null;
});
// 申请活动
const applyData = computed(() => {
  if (!obj?.value?.data) {
    return null;
  }
  const { bonus_type, bonus_amount: amount, bonus_rate: rate } = obj.value.data as any;
  return bonus_type === 1 ? { id, flag, lv: lv.value, bonus_type, amount } : { id, flag, lv: lv.value, bonus_type, rate };
});

// 申请活动
const handleApply = (val: number) => {
  lv.value = val;
  APIs.getPromotionApply(applyData.value).then((res) => {
    Toast('LĨNH THƯỞNG THÀNH CÔNG')
    refreshStatus();
  })
    .catch(() => { Toast('LĨNH THƯỞNG THẤT BẠI') })
};
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