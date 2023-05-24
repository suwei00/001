<script lang="ts" setup>
import dayjs from 'dayjs'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import bgImage from '~/components/bgImage.vue'
import CustomizeTopSelect from '~/components/customizeTopSelect.vue'

// 背景图
import bgSrc1 from '~/assets/images/noData/trade.png?preset=full'
import bgSrc2 from '~/assets/images/my/trade/recharge.png?preset=full'
import bgSrc3 from '~/assets/images/my/trade/withdraw.png?preset=full'
import bgSrc4 from '~/assets/images/my/trade/transfer.png?preset=full'
import bgSrc5 from '~/assets/images/my/trade/dividend.png?preset=full'
import bgSrc7 from '~/assets/images/my/trade/adjustment.png?preset=full'
import bgSrc8 from '~/assets/images/public/minGreyRight.png?preset=full'
import routerBackHook from '~/hooks/routerBackHooks'

const route = useRoute()

const { goTo } = routerBackHook()
const customizePullDownUp: any = ref(null)

const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const loading = ref(false)

const searshList: any = [
  {
    name: 'flag',
    list: [
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
    ],
  },
  {
    name: 'date_flag',
    isSelectTime: true,
  },
]

const params = ref({
  flag: route.query.flag ?? searshList[0].list[0].value,
  date_flag: Number(route.query.date_flag ?? 1),
})
const list: any = ref([])

const flagFilter = (flag: string) => {
  try {
    return searshList[0].list.find((item: any) => item.value === flag).label
  }
  catch (e) {
    return flag
  }
}
// 获取反水类型
const getRebateType = (item: any) => {
  // 656 香港六合彩返水 663 澳门六合彩返水
  switch (item.transfer_type) {
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
const iconFilter = (item: any) => {
  switch (String(item.flag)) {
    case '271':
      return bgSrc2
    case '272':
      return bgSrc3
    case '273':
      return bgSrc4
    case '274':
      return bgSrc5
    case '275':
      return bgSrc2
    case '278':
      return bgSrc7
    default:
      return bgSrc2
  }
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  getTradeRequestRequest({
    date_flag: String(params.value.date_flag),
    flag: params.value.flag,
    page: setParam.value.page,
    page_size: setParam.value.size,
  }).then((res: any) => {
    if (res.status) {
      const { d = [], t = 0 } = res.data
      let newList = list.value
      if (setParam.value.page === 1) {
        setParam.value.total = t ?? 0
        newList = d ?? []
      }
      else {
        newList = newList.concat(d ?? [])
      }
      newList.forEach((item: any, index: number) => {
        if (item.created_at) {
          const time = (dayjs(item.created_at ? +item.created_at : 0).format('MM-DD') ?? '').split('-')
          const showTime = `${time[0]}月${time[1]}日`
          const items = newList.filter((ii: any) => ii.showTime === showTime)
          if (!items.length) {
            // 插入时间
            newList.splice(index, 0, {
              showTime,
            })
          }
        }
      })
      list.value = newList

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

const onSearch = (resolve: any) => {
  customizePullDownUp.value.down(resolve)
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header title="交易记录" />
    <CustomizeTopSelect
      v-model="params"
      top-text="仅显示1个月的交易记录，如需更多信息，请联系客服获取"
      :searsh-list="searshList"
      @on-select="onSearch"
    />
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true" :no-data-img="bgSrc1"
        :is-btn="params.flag === '271' ? true : false" @init="init"
      >
        <template #bSContent>
          <dl class="dataContent">
            <template v-for="item in list" :key="item.id">
              <dt v-if="item.showTime">
                {{ item.showTime }}
              </dt>
              <dd v-else @click="goTo('/my/trade-detail', { record: JSON.stringify(params), created_at: item.created_at, amount: item.amount, flag: params.flag === '275' ? getRebateType(item) : flagFilter(String(item.flag)), channel: item.channel, status: statusFilter(item).text, bill_no: item.bill_no, remark: item.remark } as any)">
                <bgImage :image="iconFilter(item)" class="icon_left" />
                <ul>
                  <li>
                    <p>
                      {{ item.flag === 275 ? getRebateType(item) : flagFilter(String(item.flag)) }}
                    </p>
                    <p :style="`color:${statusFilter(item).color}`">
                      {{ statusFilter(item).text }}
                    </p>
                  </li>
                  <li>
                    <p class="time">
                      {{ dayjs(item.created_at ? +item.created_at : 0).format('HH:mm:ss') }}
                    </p>
                    <p class="amount">
                      {{ reserveDecimal(item.amount) }}
                    </p>
                  </li>
                </ul>
                <bgImage :image="bgSrc8" class="customize_icon" />
              </dd>
            </template>
          </dl>
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
  color: #000000;

  .dataContentWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .dataContent {
    width: 100%;

    dt {
      width: 100%;
      min-height: 41px;
      font-weight: 800;
      padding: 0 25px;
      display: flex;
      align-items: center;
    }

    dd {
      width: 100%;
      min-height: 60px;
      background-color: #fff;
      margin-bottom: 5px;
      font-size: 11px;
      padding: 0 25px;
      display: flex;
      align-items: center;

      .icon_left {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }

      ul {
        flex: 1;
        width: 100%;

        li {
          width: 100%;
          line-height: 15px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 3px;

          &:last-child {
            margin-bottom: 0;
          }

          .time {
            color: #A4A4A4;
          }

          .amount {
            font-weight: 800;
          }
        }
      }
      .customize_icon{
        height: 13px;
         width: 7px;
        margin-left: 10px;
      }
    }
  }
}
</style>
