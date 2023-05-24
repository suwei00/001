<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'

// 背景图
import bgSrc1 from '~/assets/images/my/pieceBg.png?preset=full'
import bgSrc2 from '~/assets/images/my/profitHeadBg.png?preset=full'

const bg1 = `url(${getSupportImage(bgSrc1)})`
const bg2 = `url(${getSupportImage(bgSrc2)})`

const customizePullDownUp: any = ref(null)

const myAllProfit = ref<string>('')
const loading = ref(false)
const params = ref({
  ty: '1',
  flags: '2',
})
const list: any = ref([
  {
    label: '投注金额',
    value: '0.00',
  },
  {
    label: '游戏输赢',
    value: '0.00',
  },
  {
    label: '活动礼金',
    value: '0.00',
  },
  {
    label: '返点金额',
    value: '0.00',
  },
  {
    label: '返水金额',
    value: '0.00',
  },
  {
    label: '充值金额',
    value: '0.00',
  },
  {
    label: '提现金额',
    value: '0.00',
  },
  {
    label: '转账金额',
    value: '0.00',
  },
  {
    label: '收款金额',
    value: '0.00',
  },
  {
    label: '发送红包',
    value: '0.00',
  },
  {
    label: '领取红包',
    value: '0.00',
  },
])

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true
  myProfitRequest(params.value).then((res: any) => {
    if (res.status) {
      list.value[0].value = res.data.bet_amount
      list.value[1].value = res.data.net_amount
      list.value[2].value = res.data.dividend_amount
      list.value[3].value = res.data.cg_rebate
      list.value[4].value = res.data.rebate
      list.value[5].value = res.data.deposit
      list.value[6].value = res.data.withdraw
      list.value[7].value = res.data.transfer_money
      list.value[8].value = res.data.trans_amount
      list.value[9].value = res.data.send_money
      list.value[10].value = res.data.receive_money
      myAllProfit.value = res.data.profit

      resolve && resolve({ noPass: false })
    }
    else {
      resolve && resolve({ noPass: true })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true })
  }).finally(() => {
    loading.value = false
  })
}

const onSearch = () => {
  customizePullDownUp.value.down()
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.ty" title="我的盈利" :show-select="true" @on-select="onSearch()" />
    <div class="myBannerWarp">
      <div class="amountWarp">
        <p class="title">
          我的盈利
        </p>
        <p class="amount">
          {{ reserveDecimal(myAllProfit) }}
        </p>
      </div>
    </div>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" :pull-up="false" :list="list" :first-down-load="true"
        no-data-tip="还没有新的我的盈利" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <div class="liMain">
                <p class="title">
                  {{ item.label }}
                </p>
                <p class="amount">
                  {{ reserveDecimal(item.value ?? '0') }}
                </p>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tradeFineWarp {
  width: 100%;
  height: 100%;
  background: #F5F5F9;
  display: flex;
  flex-direction: column;

  .myBannerWarp {
    width: 100%;
    height: 166px;
    background-image: v-bind(bg2);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .amountWarp {
      color: #FFFFFF;
      font-weight: 800;
      text-align: center;
      .title {
        height: 21px;
        min-width: 1px;
        font-size: 15px;
        line-height: 21px;
        margin-bottom: 5px;
      }

      .amount {
        height: 42px;
        min-width: 1px;
        font-size: 30px;
        line-height: 42px;
      }
    }

    .amount {
      font-size: 24px;
      line-height: 24px;
    }
  }

  .dataContentWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .dataContent {
    width: 100%;
    padding: 15px 7px 0 7px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 33.33%;
      padding-bottom: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .liMain {
        width: 100px;
        height: 91px;
        background-image: v-bind(bg1);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;

        .title {
          width: 100%;
          padding-top: 28px;
          text-align: center;
          font-weight: 800;
          color: #597EF6;
          line-height: 16px;
        }

        .amount {
          width: 100%;
          padding-top: 11px;
          text-align: center;
          font-weight: 800;
          color: #000000;
        }
      }
    }
  }
}
</style>
