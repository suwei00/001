<script setup lang='ts' name="deposit">
import zfbImg from '@images/personal/deposit/zfb.png?preset=full'
import wxImg from '@images/personal/deposit/wx.png?preset=full'
import qqImg from '@images/personal/deposit/qq.png?preset=full'
import ysfImg from '@images/personal/deposit/ysf.png?preset=full'
import ylImg from '@images/personal/deposit/yl.png?preset=full'
import yhzzImg from '@images/personal/deposit/yhzz.png?preset=full'
import szhbImg from '@images/personal/deposit/szhb.png?preset=full'

// pre load
import bankTransferImg from '@images/personal/deposit/tutorial/bank-transfer.jpg?preset=full'
import usdtImg from '@images/personal/deposit/tutorial/usdt.png?preset=full'
import okpayImg from '@images/personal/deposit/tutorial/okpay.jpg?preset=full'
import gopayImg from '@images/personal/deposit/tutorial/gopay.jpg?preset=full'
import alipayImg from '@images/personal/deposit/tutorial/alipay-bank.jpg?preset=full'
import wechatImg from '@images/personal/deposit/tutorial/wechat-bank.jpg?preset=full'
import topayImg from '@images/personal/deposit/tutorial/topay.png?preset=full'

import tutorialImg from '@icons/common/help.png?preset=full'
import type { GlobalComponents } from 'vue'
import type { TransitionDirection } from 'type'
// 支付方式图片配置
const payListConfig = [{
  value: '2', // 支付宝
  img: zfbImg,
}, {
  value: '1',
  img: wxImg, // 微信
}, {
  value: '45',
  img: yhzzImg, // 银行转账
}, {
  value: '25',
  img: szhbImg, // 数字货币
}, {
  value: '3', // 云闪付
  img: ysfImg,
}, {
  value: '8', // QQ
  img: qqImg,
}, {
  value: '51', // 银联
  img: ylImg,
}]

let direction = $ref<TransitionDirection>('ltr')
// 当前选中支付方式index
const payTypeIndex = $ref(0)
const handleChange: InstanceType<GlobalComponents['PersonalTabs']>['onChange'] = (index) => {
  direction = payTypeIndex < index ? 'rtl' : 'ltr'
}

const { data: payTypes } = $(useRequest(getPayTypes))
// 支付方式列表
const payList = $computed(() => {
  if (!payTypes)
    return []
  return payTypes.map(([value, label]) => {
    const o = find(payListConfig, { value })!
    return {
      ...o,
      label,
      value,
    }
  })
})
// 当前支付方式id
const id = $computed(() => get(payList, [payTypeIndex, 'value'], undefined))

// 充值教程
const tutorial = ref()
const openTutorial = () => {
  tutorial.value.open(id)
}
</script>

<template>
  <div class="deposit">
    <personal-title title="充值">
      <template #right>
        <span class="tutorial" @click="openTutorial">
          充值教程
          <jl-image :src="tutorialImg" w-18px h-18px ml-8px />
        </span>
      </template>
    </personal-title>
    <transition appear>
      <div v-if="payList.length" class="deposit-inner">
        <transition>
          <template v-if="payList?.length">
            <div class="list-wrapper">
              <div personal-subtitle>
                支付方式
              </div>
              <personal-tabs v-model="payTypeIndex" :list="payList" @change="handleChange">
                <template #tab="{ item }">
                  <div class="pay-item" w-147px h-72px>
                    <jl-image :src="item.img" w-32px h-32px />
                    <span>{{ item.label }}</span>
                  </div>
                </template>
              </personal-tabs>
            </div>
          </template>
        </transition>
        <transition mode="out-in" :name="direction === 'ltr' ? 'slide-right' : 'slide-left'">
          <!-- 数字货币 -->
          <digital-currency v-if="id === '25'" id="25" key="25" />
          <!-- 银行转账 -->
          <bank-transfer v-else-if="id === '45'" id="45" key="45" />
          <!-- 三方支付 支部宝 微信 银联 云闪付 QQ -->
          <third-deposit v-else :id="id!" :key="id" />
        </transition>
      </div>
    </transition>
    <!-- 充值教程 -->
    <deposit-tutorial ref="tutorial" :pay-list="payList" />
    <div class="pre-load">
      <img :src="getSupportImage(bankTransferImg)" alt="">
      <img :src="getSupportImage(usdtImg)" alt="">
      <img :src="getSupportImage(okpayImg)" alt="">
      <img :src="getSupportImage(gopayImg)" alt="">
      <img :src="getSupportImage(alipayImg)" alt="">
      <img :src="getSupportImage(wechatImg)" alt="">
      <img :src="getSupportImage(topayImg)" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;
@include fade;
@include transition-slide-left;
@include transition-slide-right;

.deposit {
  @include pageCard;
  overflow: hidden;

  .deposit-inner {
    .list-wrapper {

      .pay-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

      }
    }

  }

  .tutorial {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #000;
    cursor: pointer;
  }
  .pre-load{
    width: 0;
    height: 0;
    overflow: hidden;
  }

}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
