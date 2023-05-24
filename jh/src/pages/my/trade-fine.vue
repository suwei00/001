<script lang="ts" setup>
// component
import { Toast } from 'vant'
import dayjs from 'dayjs'
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import bgImage from '~/components/bgImage.vue'
// 背景图
import bgSrc1 from '~/assets/images/my/search.png?preset=full'
import bgSrc2 from '~/assets/images/noData/trade.png?preset=full'
import bgSrc8 from '~/assets/images/public/minGreyRight.png?preset=full'
import routerBackHook from '~/hooks/routerBackHooks'
const { goTo } = routerBackHook()
const searchTypeList = [
  {
    label: '所有类型',
    value: '0',
  },
  {
    label: '提现记录',
    value: '272',
  },
  {
    label: '充值记录',
    value: '271',
  },
]

const typeLits = [
  {
    label: '充值',
    value: '271',
  },
  {
    label: '提现',
    value: '272',
  },
  {
    label: '转账',
    value: '273',
  },
  {
    label: '红利',
    value: '274',
  },
  {
    label: '返水',
    value: '275',
  },
  {
    label: '返点',
    value: '276',
  },
  {
    label: '调整',
    value: '278',
  },
]
// 获取反水类型
const getRebateType = (item: any) => {
  switch (item.ty) {
    case 642:
      return '真人返水'
    case 643:
    case 656:
    case 663:
      return '彩票返水'
    case 644:
      return '体育返水'
    case 645:
      return '棋牌返水'
    case 646:
      return '电竞返水'
    case 647:
      return '斗鸡返水'
    case 648:
      return '捕鱼返水'
    case 649:
      return '电游返水'
    case 170:
      return '下级返水'
  }
}
const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const loading = ref(false)
const params = ref({
  flag: searchTypeList[0].value,
  date_flag: 1,
  player_name: '',
})

const list: any = ref([])

const flagFilter = (item: any) => {
  try {
    return typeLits.filter((v: any) => v.value === String(item.flag))[0].label
  }
  catch (e) {
    return item.flag
  }
}

const amountFilter = (item: any) => {
  const amountObj: any = {
    text: '',
    color: '#000000',
  }

  try {
    if (Number(item.amount) > 0) {
      amountObj.text = reserveDecimal(item.amount)
      amountObj.color = '#597EF7'
    }
    else if (Number(item.amount) < 0) {
      amountObj.text = reserveDecimal(item.amount)
      amountObj.color = '#FF0000'
    }
    else {
      amountObj.text = reserveDecimal(item.amount)
    }

    return amountObj
  }
  catch (e) {
    return amountObj
  }
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true
  // 代理报表下级明细
  subListRequest({
    flag: params.value.flag,
    date_flag: String(params.value.date_flag),
    player_name: params.value.player_name,
    page: setParam.value.page,
    page_size: setParam.value.size,
  }).then((res: any) => {
    if (res.status) {
      const { d = [], t = 0 } = res.data
      if (setParam.value.page === 1) {
        setParam.value.total = t ?? 0
        list.value = d ?? []
      }
      else {
        list.value = list.value.concat(d ?? [])
      }

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
const statusFilter = (item: any) => {
  const obj = {
    text: '待确认',
    color: '#000000',
  }
  switch (item.status) {
    case 1:
      obj.text = '成功'
      obj.color = '#597EF7'
      break
    case 2:
      obj.text = '失败'
      obj.color = '#FC646C'
      break
    case 3:
      obj.text = '处理中'
      break
    default:
      obj.text = '待确认'
      break
  }
  return obj
}
const onType = (item: any) => {
  params.value.flag = item.value
  init()
}

const onSearch = () => {
  customizePullDownUp.value.down()
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.date_flag" title="交易明细" :show-select="true" @on-select="onSearch()" />
    <div class="searchBarWarp">
      <div class="searchInput">
        <bgImage :image="bgSrc1" class="searchInputIcon" />
        <CustomizeInput
          v-model="params.player_name" placeholder-color="#818186" color="#394652" input-type="account"
          placeholder="请输入您要查询的下级账号"
        />
      </div>
      <van-button class="customizeSubmit searchBtn" :loading="loading" @click="onSearch()">
        查询
      </van-button>
    </div>
    <ul class="searchTypeWarp">
      <li
        v-for="(item, index) in searchTypeList" :key="index" :class="params.flag === item.value ? 'activeType' : ''"
        @click="onType(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :no-data-img="bgSrc2" :first-down-load="true"
        @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <dl class="li" @click="goTo('/my/trade-detail', { record: JSON.stringify(params), username: item.username, created_at: item.created_at, amount: item.amount, flag: item.flag === 275 ? getRebateType(item) : flagFilter(item), channel: item.channel, status: statusFilter(item).text, bill_no: item.bill_no } as any)">
                <dt>
                  <span class="account">{{ item.username }}</span>
                  <span class="time">{{ dayjs(item.created_at ? +item.created_at : 0).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </dt>
                <dd class="flex jc-c ai-c">
                  <div class="fl_ri">
                    <span class="amount" :style="`color:${amountFilter(item).color}`">{{ amountFilter(item).text }}</span>
                    <span class="type">

                      {{ item.flag === 275 ? getRebateType(item) : flagFilter(item) }}
                    </span>
                  </div>
                  <bgImage :image="bgSrc8" class="customize_icon" />
                </dd>
              </dl>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
 .customize_icon{
          height: 13px;
          width: 7px;
          margin-left: 10px;
        }
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
    border-top: 1px solid #E5E5E5;
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

  .searchTypeWarp {
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    color: #000000;
    justify-content: space-between;
    padding: 0 30px 0 40px;

      li{
        padding: 0 10px;
        line-height: 40px;
        border-bottom: 2px solid  #FFFFFF;

      }
    .activeType {
      color: #4080FF;
      font-weight: 800;
      border-bottom: 2px solid  #597EF7;
      line-height: 40px;
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

    li {
      width: 100%;
      padding-top: 5px;

      .li {
        width: 100%;
        min-height: 60px;
        padding: 0 40px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 15px;
        font-size: 11px;

        dt {
          display: flex;
          flex-direction: column;

          .account {
            color: #000000;
          }

          .time {
            padding-top: 5px;
            color: #A4A4A4;
          }
        }

        dd {
          .fl_ri{
            display: flex;
          flex-direction: column;
          align-items: flex-end;
          }

          span{
            display: block;
          }
          .type {
            padding-top: 5px;
            color: #535353;
          }
        }
      }
    }
  }
}
</style>
