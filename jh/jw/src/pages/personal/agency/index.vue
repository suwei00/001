<script setup lang='ts' name="agency">
import type { ArrElement, DateFlag } from '~/api/type'

const ty: DateFlag = $ref('1')
const username = $ref('')
const { data: agencyInfo, run, loading } = $(useRequest(() => getMyProfit(({ ty, username, flags: '1' })), { refreshDeps: $$([ty]), debounceInterval: 300, loadingKeep: 1000 }))

const cardList = $computed(() => [{
  label: '投注人数 ',
  key: 'bet_mem_count',
  value: agencyInfo?.bet_mem_count,
  clickable: true,
  decimals: 0,
  flags: 1,
}, {
  label: '首充人数 ',
  key: 'first_deposit_count',
  value: agencyInfo?.first_deposit_count,
  clickable: true,
  decimals: 0,
  flags: 3,
}, {
  label: '注册人数 ',
  key: 'regist_count',
  value: agencyInfo?.regist_count,
  clickable: true,
  decimals: 0,
  flags: 2,
}, {
  label: '下级人数 ',
  key: 'mem_count',
  value: agencyInfo?.mem_count,
  clickable: true,
  decimals: 0,
  flags: 4,
}, {
  label: '团队盈利 ',
  value: agencyInfo?.profit,
  clickable: false,
  key: 'profit',
  decimals: 2,
  modalField: 'company_revenue',
  modalType: 'amount',
}, {
  label: '投注金额 ',
  key: 'bet_amount',
  value: agencyInfo?.bet_amount,
  clickable: true,
  decimals: 2,
  modalField: 'bet_amount',
  modalType: 'amount',
}, {
  label: '游戏输赢 ',
  key: 'net_amount',
  value: agencyInfo?.net_amount,
  clickable: true,
  decimals: 2,
  modalField: 'net_amount',
  modalType: 'amount',
}, {
  label: '充值金额 ',
  key: 'deposit',
  value: agencyInfo?.deposit,
  decimals: 2,
}, {
  label: '提现金额 ',
  key: 'withdraw',
  value: agencyInfo?.withdraw,
  decimals: 2,
}, {
  label: '中心钱包余额 ',
  value: agencyInfo?.balance_total,
  decimals: 2,
  key: 'balance_total',
}, {
  label: '场馆余额 ',
  clickable: true,
  value: agencyInfo?.balance_platform,
  decimals: 2,
  key: 'balance_platform',
  modalField: 'plat_balance',
  modalType: 'amount',
}, {
  label: '数字货币充值 ',
  value: agencyInfo?.virtual_deposit,
  decimals: 2,
  key: 'virtual_deposit',
}, {
  label: '活动礼金 ',
  key: 'dividend_amount',
  decimals: 2,
  value: agencyInfo?.dividend_amount,
}, {
  label: '代理返点 ',
  decimals: 2,
  key: 'cg_rebate',
  value: agencyInfo?.cg_rebate,
}, {
  label: '代理返水 ',
  key: 'rebate',
  decimals: 2,
  value: agencyInfo?.rebate,
}])
// onMounted(() => {
//   animeFadeInDelay()
// })
// 人数弹窗
let personsVisible = $ref(false)
// 金额弹窗
let amountModalVisible = $ref(false)
let modalTitle = $ref('')
let modalField = $ref('')
let flags = $ref<1 | 2 | 3 | 4>(1)

const handleClick = (item: ArrElement<typeof cardList>) => {
  if (!item.clickable)
    return
  modalTitle = item.label
  if (item.modalType === 'amount') {
    modalField = item.modalField!
    amountModalVisible = true
  }
  else {
    flags = item.flags as typeof flags
    personsVisible = true
  }
}
// 传递到弹窗子组件的参数
provide('ty', $$(ty))
provide('username', $$(username))
</script>

<template>
  <div class="agency">
    <personal-title title="代理报表" />
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <el-input v-model="username" clearable style="width:398px" placeholder="请输入您要查询的下级账号" />
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <jl-switch v-model="ty" :list="dateList" />
        </div>
        <div class="search-box">
          <jl-button :loading="loading" w-100px lh-42px h-42px @click="run">
            查询
          </jl-button>
        </div>
      </div>
    </div>
    <div class="card-list">
      <ul>
        <li
          v-for="item in cardList" :key="item.label" v-card class="anime-item"
          :class="[item.clickable ? 'clickable' : '']" shadow-card @click="handleClick(item)"
        >
          <span class="title">{{ item.label
          }}</span>
          <jl-count :decimals="item.decimals" class="rmb" :value="+(item.value ?? 0)" />
        </li>
      </ul>
    </div>
    <!-- 人数弹窗 -->
    <persons-modal v-if="personsVisible" v-model="personsVisible" :flags="flags" :title="modalTitle" />
    <!-- 金额弹窗 -->
    <amount-modal v-if="amountModalVisible" v-model="amountModalVisible" :field="modalField" :title="modalTitle" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.agency {
  @include pageCard;

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

        .title {
          color: $color-black-primary;
          font-size: 15px;
          line-height: 20px;
        }

        &.clickable {
          cursor: pointer;

          .title {
            color: $color-primary-second;

          }
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
