<script setup lang='ts' name='balance-baby'>
import icon1 from '@images/personal/yuebao/icon1.png?preset=full'
import icon2 from '@images/personal/yuebao/icon2.png?preset=full'
import icon3 from '@images/personal/yuebao/icon3.png?preset=full'
import icon4 from '@images/personal/yuebao/icon4.png?preset=full'
import icon5 from '@images/personal/yuebao/icon5.png?preset=full'
import type { TransitionDirection } from 'type'
import transferIn from './components/transfer-in/index.vue'
import transferOut from './components/transfer-out/index.vue'
import transferRecord from './components/transfer-record/index.vue'

const userStore = useUserStore()
const { balanceLoading, balance } = storeToRefs(userStore)

const type = $ref(0)
const tabList = [
  { label: '转入余额宝', value: 0 },
  { label: '转出余额宝', value: 1 },
  { label: '余额宝记录', value: 2 },
]
const handleBeforeChange = () => true
let direction = $ref<TransitionDirection>('ltr')
const handleChange = (index: number) => {
  direction = type < index ? 'rtl' : 'ltr'
}
</script>

<template>
  <div class="balance-baby">
    <personal-title hider-border title="余额宝" />
    <section class="balance-bar">
      <div class="left">
        <div class="balance">
          总金额
          <p>
            ¥ <jl-count :value="+(balance ?? 0)" />
          </p>
          <i
            class="i-common-refresh" :class="{ 'refresh-loading': balanceLoading }" w-16px h-16px
            @click="userStore.runGetUserBalance"
          />
        </div>
        <div class="amounts">
          <div v-card class="item" mb-13px>
            <div class="w-[31.24px]" flex justify-center ml-21px>
              <img v-src="icon1" style="width:20.34px;" alt="">
            </div>
            <ul w-229px flex flex-col items-center>
              <li>计息金额</li>
              <li>¥ <jl-count :value="98999" /></li>
            </ul>
          </div>
          <div v-card class="item" mb-13px>
            <div class="w-[31.24px]" flex justify-center ml-21px>
              <img v-src="icon2" style="width:29.92px;" alt="">
            </div>
            <ul w-229px flex flex-col items-center>
              <li>待计息金额</li>
              <li>¥ <jl-count :value="100" /></li>
            </ul>
          </div>
          <div v-card class="item">
            <div class="w-[31.24px]" flex justify-center ml-21px>
              <img v-src="icon3" style="width:31.24px;" alt="">
            </div>
            <ul w-229px flex flex-col items-center>
              <li>今日收益</li>
              <li>¥ <jl-count :value="199" /></li>
            </ul>
          </div>
          <div v-card class="item">
            <div class="w-[31.24px]" flex justify-center ml-21px>
              <img v-src="icon4" style="width:24.87px;" alt="">
            </div>
            <ul w-229px flex flex-col items-center>
              <li>7日收益</li>
              <li>¥ <jl-count :value="99999" /></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <ul>
          <li>余额宝</li>
          <li>29.99</li>
          <li>年化率（%）</li>
        </ul>
        <img v-src="icon5" w-112px alt="">
      </div>
    </section>
    <transition>
      <jl-tabs v-model="type" my-29px :list="tabList as any" :before-change="handleBeforeChange" @change="handleChange" />
    </transition>
    <transition mode="out-in" :name="direction === 'ltr' ? 'slide-right' : 'slide-left'">
      <transfer-in v-if="type === 0" />
      <transfer-out v-else-if="type === 1" />
      <transfer-record v-else-if="type === 2" />
    </transition>
  </div>
</template>

<style lang='scss' scoped>
@use '~/pages/personal/index.scss' as *;
@include transition-slide-left;
@include transition-slide-right;

.balance-baby {
  @include pageCard;
  color: #333;
  font-size: 15px;
}

.balance-bar {
  width: 1000px;
  height: 228px;
  border-radius: 6px;
  border: 1px solid #E6E9F9;
  display: flex;
  padding: 14px 0 20px 21px;

  .left {
    border-right: 1px solid #EBEBEB;

    .balance {
      display: flex;
      align-items: center;
      margin-bottom: 3px;

      p {
        margin-left: 12px;
        margin-right: 16px;
        font-size: 24px;
        font-weight: 600;
        color: #597EF7;
      }

    }
    .amounts{
      width: 606px;
      display: flex;
      flex-wrap: wrap;

      .item{
        width: 283px;
        height: 70px;
        border-radius: 8px;
        margin-right: 20px;
        border: 1px solid #DFEAF6;
        box-shadow: 0px 10px 10px 1px hsla(208, 22%, 85%, 0.22);
        display: flex;
        align-items: center;
        ul{
          li:first-of-type{
            font-size: 13px;
          }
          li:last-of-type{
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .right{
    width: 373px;
    display: flex;
    align-items: center;
    justify-content: center;
    ul{
      margin-right:37px;
      li:nth-of-type(2){
        color:#E00A16 ;
        font-size: 32px;
        font-weight: 600;
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
  </route>
