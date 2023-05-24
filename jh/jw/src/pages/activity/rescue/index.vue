<script setup lang='ts' name="rescue">
import bg from '@images/activity/detail_bg.png?preset=full'
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const { isLogged } = storeToRefs(appStore)
const route = useRoute()
const { id, flag } = route.query

const { data } = useRequest(() => getPromotionDetail({ id: id?.toString(), flag: flag?.toString() }))

// 活动banner
const banner = computed(() => data.value?.static.title_web ?? '')
// 第一张
const content = computed(() => data.value?.config.web_content[0] ?? '')
// 活动规则
const rules = computed(() => data.value?.config.web_content.slice(1) ?? [])

// 救援金级别
const amountList = $computed(() => {
  if (data.value) {
    if ('reverse' in data.value.rules)
      return data.value.rules.reverse()
  }
  else {
    return []
  }
})
const { data: profitRes } = useRequest(getPromotionProfit, { ready: isLogged })
const amount = $computed(() => {
  if (Number(profitRes.value) >= 0)
    return 0

  if (amountList && amountList.length > 0)
    return amountList.find((item: any) => item.lose_amount <= Math.abs(Number(profitRes.value)))?.bonus_amount || 0

  else
    return 0
})

// 昨日输赢金额为0，按钮不可用
const disabledBtn = computed(() => amount === 0)
// 申请活动
const { run: runPromotionApply } = useRequest(() => promotionApply({
  id: id?.toString(),
  flag: 'rescue',
  amount,
  bonus_type: 1,
}), {
  manual: true,
  onSuccess() { ElMessage.success('申请成功!') },
})
</script>

<template>
  <section :style="getBackgroundImgObj(bg)">
    <jl-cloud-image :src="banner" class="banner" use-bg />
    <!-- 活动内容 -->
    <jl-cloud-image w="1300px" :src="content" />
    <!-- 申请按钮 -->
    <button class="apply-btn" :disabled="disabledBtn" :class="{ disabled: disabledBtn, scale12: !disabledBtn }" @click="runPromotionApply">
      立即申请
    </button>
    <!-- 活动规则 -->
    <jl-cloud-image v-for="(rule, i) in rules" :key="i" w="1300px" class="content" :src="rule" />
  </section>
</template>

<style lang='scss' scoped>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100%;
  background-repeat: repeat-y;

  .banner {
    max-width: 1920px;
    min-width: 1400px;
    width: 100%;
    height: 600px;
  }

  .content {
    width: 1300px;
    height: auto;
    margin-bottom: 30px;
  }
  .apply-btn{
    width: 203.5px;
    height: 51px;
    font-size: 24px;
    background: linear-gradient(0deg, #5C79FF, #89A5FB);
    border-radius: 51px;
    color: #fff;
    margin-bottom: 80px;
    margin-top: 80px;
  }
  .disabled{
    background: #8E8E8E;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
