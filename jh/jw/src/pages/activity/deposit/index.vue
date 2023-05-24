<script setup lang='ts' name="deposit">
import bg from '@images/activity/detail_bg.png?preset=full'
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const { isLogged } = storeToRefs(appStore)
const route = useRoute()
const { id, flag } = route.query

// tabs切换
let ty = $ref<'low' | 'high'>('low')
const tableRef = ref()
const switchTab = (type: 'low' | 'high') => {
  ty = type
  switch (type) {
    case 'low':
      tableRef.value.style.transform = `translateX(${0}px)`
      break
    case 'high':
      tableRef.value.style.transform = `translateX(${-1138}px)`
      break
    default:
      break
  }
}

// 活动详情
const { data } = useRequest(() => getPromotionDetail({ id: id?.toString(), flag: flag?.toString() }))
// 申请状态
const { data: applyStatus } = useRequest(
  () => getApplyStatus({ id: id?.toString(), flag: flag?.toString() }),
  {
    ready: isLogged,
    onSuccess(res) {
      if (res.high1)
        switchTab('high')
    },
  },
)
const isLow = $computed(() => applyStatus.value?.low1)
const isHigh = $computed(() => applyStatus.value?.high1)
const noApply = $computed(() => (!applyStatus.value?.low1 && !applyStatus.value?.high1))
const disabledBtn = $computed(() => {
  if (noApply)
    return false
  return ty === 'low' ? !isLow : !isHigh
})
const isComplete = computed(() => {
  const l = applyStatus.value?.low1 && applyStatus.value?.low2 && applyStatus.value?.low3
  const h = applyStatus.value?.high1 && applyStatus.value?.high2 && applyStatus.value?.high3

  return l || h
})

// 活动banner
const banner = computed(() => data.value?.static.title_web ?? '')
// 活动内容图
const content = computed(() => data.value?.config.web_content[0] ?? '')
// 迎新豪礼三重送
const ty_low = computed(() => data.value?.config.web_content[1] ?? '')
// 尊宠豪礼三重送
const ty_high = computed(() => data.value?.config.web_content[2] ?? '')
// 活动规则图
const rules = computed(() => data.value?.config.web_content.slice(4) ?? [])
// 活动申请图
const applyPic = computed(() => data.value?.config.web_content[3] ?? '')

// 申请活动
const { run: runPromotionApply } = useRequest(() => promotionApply({
  id: id?.toString(),
  flag: 'deposit',
  lv: 1,
  amount: 0,
  bonus_type: 1,
  ty,
}), {
  manual: true,
  onSuccess(res) {
    if (res)
      ElMessage.success('申请成功!')
  },
})
</script>

<template>
  <section :style="getBackgroundImgObj(bg)">
    <jl-cloud-image :src="banner" class="banner" use-bg />
    <div class="wrapper-out">
      <!-- 活动内容 -->
      <jl-cloud-image w="1138px" mb-50px :src="content" />
      <!-- tab -->
      <div class="tabs">
        <button :class="{ active: ty === 'low' }" @click="switchTab('low')">
          迎新豪礼三重送
        </button>
        <button :class="{ active: ty === 'high' }" @click="switchTab('high')">
          尊宠豪礼三重送
        </button>
      </div>
      <!-- 表格 -->
      <div class="boxs">
        <div ref="tableRef" mb-30px class="wrapper">
          <jl-cloud-image w="1138px" :src="ty_low" />
          <jl-cloud-image w="1138px" :src="ty_high" />
        </div>
      </div>

      <jl-cloud-image w="1138px" :src="applyPic" />
    </div>

    <!-- 申请按钮 -->
    <button
      class="apply-btn scale12"
      :class="{ disabled: isComplete || disabledBtn, scale12: !isComplete && !disabledBtn }"
      :disabled="isComplete || disabledBtn"
      @click="runPromotionApply"
    >
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

  .wrapper-out {
    border: 2px solid #DBE3FF;
    border-radius: 40px;
    padding: 55px 81px 37.5px;
    margin-bottom: 80px;
    box-sizing: border-box;
    width: 1300px;
  }

  .content {
    width: 1300px;
    height: auto;
    margin-bottom: 30px;
  }

  .tabs {
    width: 1138px;
    margin-bottom: 30px;

    button {
      width: 50%;
      height: 66.5px;
      border-radius: 12px 0 0 12px;
      font-size: 24px;
      color: #5D617DFF;
      border: 1px solid #dbe3ff;
      background: linear-gradient(to bottom,#ffffff,#e7edfd,#e7edfd 85%,#fff 99%);
    }
    button:nth-of-type(2){
      border-radius: 0 12px 12px 0;
    }

    .active {
      background: linear-gradient(0deg,#5c79ff,#89a5fb);
      border: 1px solid #597ef7;
      color: #fff;
    }
  }

  .tabs {
    button:not(.active):hover{
      background: transparent linear-gradient(180deg, #FFFFFF 0%, #E7EDFD 47%, #E7EDFD 75%, #FFFFFF 100%);
    }
  }

  .boxs {
    width: 1138px;
    overflow: hidden;

    .wrapper {
      width: 2430px;
      display: flex;
      transition: all 0.5s linear;
    }
  }

  .apply-btn {
    width: 203.5px;
    height: 51px;
    font-size: 24px;
    background: linear-gradient(0deg, #5C79FF, #89A5FB);
    border-radius: 51px;
    color: #fff;
    margin-bottom: 80px;
  }

}

.disabled {
  background: #8E8E8E !important;
  border-color: #8E8E8E !important;
  color: #fff !important;
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
