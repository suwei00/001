<script lang="ts" setup>
import { Toast } from 'vant'
import useBackRouter from '~/hooks/routerBackHooks'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeInput from '~/components/customizeInput.vue'
// 背景图
import bgSrc1 from '~/assets/images/my/search.png?preset=full'
import bgSrc2 from '~/assets/images/my/pieceBg.png?preset=full'

const bg1 = `url(${getSupportImage(bgSrc2)})`

const { goTo } = useBackRouter()
const { venueList } = storeToRefs(useAppStore())

const customizePullDownUp: any = ref(null)
const loading = ref(false)
const params = ref({
  ty: '1',
  flags: '1',
  username: '',
})
const list: any = ref([
  {
    label: '投注人数',
    value: '0.00',
    isOn: true,
    flag: '1',
  },
  {
    label: '首充人数',
    value: '0.00',
    isOn: true,
    flag: '3',
  },
  {
    label: '注册人数',
    value: '0.00',
    isOn: true,
    flag: '2',
  },
  {
    label: '下级人数',
    value: '0.00',
    isOn: true,
    flag: '4',
  },
  {
    label: '团队盈利',
    value: '0.00',
    // isOn: true,
    // isPop: true,
    agency: '1',
  },
  {
    label: '投注金额',
    value: '0.00',
    isOn: true,
    isPop: true,
    agency: '2',
  },
  {
    label: '游戏输赢',
    value: '0.00',
    isOn: true,
    isPop: true,
    agency: '3',
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
    label: '中心钱包余额',
    value: '0.00',
  },
  {
    label: '场馆余额',
    value: '0.00',
    isOn: true,
    isPop: true,
    agency: '4',
  },
  {
    label: '数字货币充值',
    value: '0.00',
  },
  {
    label: '活动礼金',
    value: '0.00',
  },
  {
    label: '代理返点',
    value: '0.00',
  },
  {
    label: '代理返水',
    value: '0.00',
  },
  {
    label: '余额宝余额',
    value: '0.00',
  },
  {
    label: '转出余额宝',
    value: '0.00',
  },
  {
    label: '余额宝提现',
    value: '0.00',
  },

])
const visible = ref(false)
const profitList: any = ref([])
const agency = ref('1') // 1 团队盈利 2 投注金额 3 游戏输赢 4 场馆余额

const profitNameFilter = (id: string) => {
  const venueLists = venueList.value
  let la = ''
  for (let iii = 0; iii < venueLists.length; iii++) {
    const ls = venueLists[iii].l ?? []
    for (let jjj = 0; jjj < ls.length; jjj++) {
      if (ls[jjj].id === id) {
        la = ls[jjj].name
        break
      }
    }
  }

  return la
}

const profitListFilter = computed(() => {
  const oldArr = JSON.parse(JSON.stringify(profitList.value))
  oldArr.forEach((item: any) => {
    item.label = profitNameFilter(item.api_type)
  })
  const newArr = []
  // 4个放一组
  for (let i = 0; i < oldArr.length; i += 4)
    newArr.push(oldArr.slice(i, i + 4))

  return newArr
})

const init = (resolve: any = undefined, type: any = undefined) => {
  myProfitRequest(params.value).then((res: any) => {
    if (res.status) {
      list.value[0].value = `${res.data.bet_mem_count}人`// 投注人数
      list.value[1].value = `${res.data.first_deposit_count}人`// 首充人数
      list.value[2].value = `${res.data.regist_count}人`// 注册人数
      list.value[3].value = `${res.data.mem_count}人`// 下级人数
      list.value[4].value = reserveDecimal(res.data.profit ?? '0')// 团队盈利
      list.value[5].value = reserveDecimal(res.data.bet_amount ?? '0')// 投注金额
      list.value[6].value = reserveDecimal(res.data.net_amount ?? '0')// 游戏输赢
      list.value[7].value = reserveDecimal(res.data.deposit ?? '0')// 充值金额
      list.value[8].value = reserveDecimal(res.data.withdraw ?? '0')// 提现金额
      list.value[9].value = reserveDecimal(res.data.balance_total ?? '0')// 中心钱包余额
      list.value[10].value = reserveDecimal(res.data.balance_platform ?? '0')// 场馆余额
      list.value[11].value = reserveDecimal(res.data.virtual_deposit ?? '0')// 数字货币充值
      list.value[12].value = reserveDecimal(res.data.dividend_amount ?? '0')// 活动礼金
      list.value[13].value = reserveDecimal(res.data.cg_rebate ?? '0')// 代理返点
      list.value[14].value = reserveDecimal(res.data.rebate ?? '0')// 代理返水

      resolve && resolve({ noPass: false })
    }
    else {
      Toast('您查询的账号不存在')
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

const getuseRVenueReportAmount = () => {
  memberAgencyReportPlatformRequest({
    ty: params.value.ty,
    username: params.value.username,
  }).then((res: any) => {
    if (res.status) {
      if (res.data && res.data.length !== 0)
        profitList.value = res.data?.d ?? []
      visible.value = true
    }
  })
}

const onChangeLi = (item: any) => {
  if (item.flag) {
    goTo('/my/proxy-report/minutiae', {
      ty: params.value.ty,
      flag: item.flag,
      username: params.value.username,
    })
  }
  else if (item.isPop) {
    agency.value = item.agency
    getuseRVenueReportAmount()
  }
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.ty" title="代理报表" :show-select="true" @on-select="onSearch()" />
    <div class="searchBarWarp">
      <div class="searchInput">
        <bgImage :image="bgSrc1" class="searchInputIcon" />
        <CustomizeInput
          v-model="params.username" placeholder-color="#818186" color="#394652" input-type="account"
          placeholder="请输入您要查询的下级账号"
        />
      </div>
      <van-button class="customizeSubmit searchBtn" :loading="loading" @click="onSearch()">
        查询
      </van-button>
    </div>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" :pull-up="false" :list="list" :first-down-load="true"
        no-data-tip="还没有新的代理" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <div class="liMain" @click="onChangeLi(item)">
                <p class="title" :class="{ titleBlue: item.isOn }">
                  {{ item.label }}
                </p>
                <p class="amount">
                  {{ item.value }}
                </p>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>

    <van-popup v-if="profitList.length" v-model:show="visible" position="bottom">
      <div class="popWarp">
        <div class="popMain">
          <ol>
            <li v-for="(ls, idx) in profitListFilter" :key="idx">
              <div v-for="(item, index) in ls" :key="index" class="pliMainWarp">
                <div class="pliMain">
                  <label>{{ item.label }}</label>
                  <p v-show="agency === '1'">
                    {{ reserveDecimal(item.company_revenue ?? '0') }}
                  </p>
                  <p v-show="agency === '2'">
                    {{ reserveDecimal(item.bet_amount ?? '0') }}
                  </p>
                  <p v-show="agency === '3'">
                    {{ reserveDecimal(item.net_amount ?? '0') }}
                  </p>
                  <p v-show="agency === '4'">
                    {{ reserveDecimal(item.plat_balance ?? '0') }}
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
        <div class="close" @click="visible = false">
          取消
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.tradeFineWarp {
  width: 100%;
  height: 100%;
  background: #F5F5F9;
  display: flex;
  flex-direction: column;

  .searchBarWarp {
    width: 100%;
    height: 65px;
    background: #fff;
    padding: 0 10px 0 15px;
    display: flex;
    align-items: center;

    .searchInput {
      flex: 1;
      width: 100%;
      height: 35px;
      background: #F4F4F4;
      border-radius: 15px;
      margin-right: 11px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      // search icon
      .searchInputIcon {
        width: 14px;
        height: 16px;
        margin-right: 6px;
      }

    }

    .searchBtn {
      width: 58px;
      height: 35px;
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
    padding: 25px 7px;
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
          line-height: 16px;

          &.titleBlue {
            color: #597EF6;
          }
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

.popWarp {
  width: 100%;
  background-color: #fff;

  .popMain {
    width: 100%;
    min-height: 66px;

    ol {
      li {
        width: 100%;
        height: 66px;
        border-bottom: 1px solid #EFEFEF;
        display: flex;
        &:last-child {
          border-bottom: none;
        }

        .pliMainWarp {
          width: 25%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;

          &::after {
            content: '';
            width: 0.5px;
            height: 25px;
            background-color: #EFEFEF;
            position: absolute;
            right: 0;
            top: auto;
          }

          &:nth-child(4)::after {
              display: none;
          }

          .pliMain {
            width: 100%;
            text-align: center;

            label {
              width: 100%;
              min-height: 15px;
              font-size: 11px;
              color: #000000;
              line-height: 15px;
              padding-bottom: 3px;
            }

            p {
              width: 100%;
              min-height: 14px;
              font-size: 10px;
              color: #454545;
              line-height: 14px;
            }
          }
        }
      }
    }
  }

  .close {
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 5px solid #F8F8F7;
  }
}
</style>

