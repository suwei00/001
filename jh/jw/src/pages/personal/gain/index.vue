<script setup lang='ts' name="gain">
import type { DateFlag } from '~/api/type'
const ty: DateFlag = $ref('1')
onMounted(() => animeFadeInDelay())
const { data: agencyInfo, run, loading } = $(useRequest(() => getMyProfit({ flags: '2', ty }), { refreshDeps: $$([ty]), debounceInterval: 300, loadingKeep: 1000 }))
const cardList = $computed(() => {
  return [{
    label: '盈利金额 ',
    value: agencyInfo?.profit,
  }, {
    label: '投注金额 ',
    value: agencyInfo?.bet_amount,
  }, {
    label: '游戏输赢 ',
    value: agencyInfo?.net_amount,
  }, {
    label: '活动礼金 ',
    value: agencyInfo?.dividend_amount,
  }, {
    label: '返点金额 ',
    value: agencyInfo?.cg_rebate,
  }, {
    label: '返水金额 ',
    value: agencyInfo?.rebate,
  }, {
    label: '充值金额 ',
    value: agencyInfo?.deposit,
  }, {
    label: '提现金额 ',
    value: agencyInfo?.withdraw,
  }, {
    label: '转账金额 ',
    value: agencyInfo?.trans_amount,
  }, {
    label: '收款金额 ',
    value: 0,
  }, {
    label: '发送红包 ',
    value: 0,
  }, {
    label: '领取红包 ',
    value: 0,
  }]
})
</script>

<template>
  <div class="gain">
    <personal-title title="我的盈利" />
    <div class="operate-box">
      <jl-switch v-model="ty" :list="dateList" />
      <jl-button :loading="loading" w-100px lh-42px h-42px @click="run">
        查询
      </jl-button>
    </div>
    <div class="card-list">
      <ul>
        <li v-for="item in cardList" :key="item.label" v-card class="anime-item" shadow-card>
          <span class="title">{{ item.label }}</span>
          <span class="rmb">
            <jl-count :decimals="2" :value="item.value ?? 0" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.gain {
  @include pageCard;

  .operate-box {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-left: -20px;

      li {
        padding-top: 24px;
        padding-bottom: 20px;
        margin: 20px 0 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: $card-border-color;
        border-radius: 8px;
        width: 150px;
        height: 100px;
        border: 1px solid $card-border-color;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all .3s;

        &:hover {
          transform: scale(1.05);
        }

        &:first-child {
          width: 320px;
          padding: 0 22px;
          flex-direction: row;
          justify-content: center;
          justify-content: space-between;
          align-items: center;

          .title {
            font-family: $jl-font;
            font-size: 24px;
          }

          .rmb {
            font-size: 24px;
            color: $color-primary-second;
          }
        }

        .title {
          color: $color-black-primary;
          font-size: 15px;
          line-height: 20px;
        }

        .rmb {
          line-height: 20px;
          color: $color-black-primary;
          font-family: $jl-font;
          font-weight: bold;
        }
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
