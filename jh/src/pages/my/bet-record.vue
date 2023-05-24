<script lang="ts" setup>
// component
import dayjs from 'dayjs'
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeTopSelect from '~/components/customizeTopSelect.vue'
import bgSrc1 from '~/assets/images/noData/trade.png?preset=full'
import amountHooks from '~/hooks/amountHooks'

// 背景图
import bgSrc2 from '~/assets/images/noData/trade.png?preset=full'

const { venueGameList } = amountHooks()

const customizePullDownUp: any = ref(null)
// loading 引入
const { openLoading, closeLoading } = useLoading()
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})

const loading = ref(false)

const platformList = computed(() => {
  let list = JSON.parse(JSON.stringify(venueGameList.value)) ?? []
  list = list.filter((item: any) => item.id !== '8840968486572375835') // 祛除CG彩票
  list.forEach((item: any) => {
    item.label = item.name
    item.value = item.id
  })

  return list
})
const searshList = [
  {
    name: 'platform_id',
    list: [{
      label: '全部',
      value: -1,
    }, ...platformList.value],
  },
  {
    name: 'date_flag',
    isSelectTime: true,
  },
  {
    name: 'flag',
    list: [
      {
        label: '全部',
        value: -1,
      },
      {
        label: '已结算',
        value: 1,
      },
      {
        label: '未结算',
        value: 0,
      },
      {
        label: '无效',
        value: 3,
      },
      {
        label: '用户撤单',
        value: 2,
      },

    ],
  },
]
const params = ref({
  platform_id: -1,
  date_flag: 1,
  flag: -1,
})
const record: any = ref({
  total: '0',
  valid_bet_amount: '0.00',
  net_amount: '0.00',
})
const list: any = ref([])

const netAmountFilter = (item: any) => { // 0未结算1已结算2用户撤单3无效
  const obj = {
    text: '',
    color: '#000000',
  }
  switch (item.flag) {
    case 0:
      obj.text = '未结算'
      break
    case 1:
      obj.text = item.net_amount
      if (Number(item.net_amount) > 0)
        obj.color = '#597EF7'
      else if (Number(item.net_amount) < 0)
        obj.color = '#FA3C46'
      break
    case 2:
      obj.text = '用户撤单'
      break
    case 3:
      obj.text = '无效'
      break
    default:
      obj.text = item.net_amount
      break
  }
  return obj
}

const init = (resolve: any = undefined, type: any = undefined) => {
  // loading.value = true
  openLoading()
  getRecordRequest({
    platform_id: params.value.platform_id ?? 0,
    date_flag: String(params.value.date_flag ?? 1),
    flag: params.value.flag,
    page: setParam.value.page,
    page_size: setParam.value.size,
  }).then((res: any) => {
    if (res.status) {
      const { agg = {}, d = [], t = 0 } = res.data
      let newList = list.value
      if (setParam.value.page === 1) {
        newList = d ?? []
        setParam.value.total = t ?? 0
        record.value.total = t ?? 0
        record.value.valid_bet_amount = agg.valid_bet_amount ?? '0.00'
        record.value.net_amount = agg.net_amount ?? '0.00'
      }
      else {
        newList = newList.concat(d ?? [])
      }
      newList.forEach((item: any, index: number) => {
        if (item.bet_time) {
          const time = (dayjs(item.bet_time ? +item.bet_time : 0).format('MM-DD') ?? '').split('-')
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
    closeLoading()
  })
}
const onSearch = (resolve: any) => {
  customizePullDownUp.value.down(resolve)
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header title="投注记录" />
    <CustomizeTopSelect v-model="params" :searsh-list="searshList" :no-data-img="bgSrc1" @on-select="onSearch" />
    <div class="countWarp">
      <div class="countMain">
        <ul>
          <li>
            <p>笔数</p>
            <p>{{ record.total }}</p>
          </li>
          <li>
            <p>流水(RMB)</p>
            <p>{{ reserveDecimal(record.valid_bet_amount) }}</p>
          </li>
          <li>
            <p>输赢(RMB)</p>
            <p :class="{ customizeColorBlue: Number(record.net_amount) > 0, customizeColorRed: Number(record.net_amount) < 0 }">
              {{ reserveDecimal(record.net_amount) }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true"
        :no-data-img="bgSrc2" @init="init"
      >
        <template #bSContent>
          <dl class="dataContent">
            <template v-for="(item, index) in list" :key="index">
              <dt v-if="item.showTime">
                {{ item.showTime }}
              </dt><dd v-else>
                <div class="ddHead">
                  {{ item.api_name }}
                </div>
                <div class="ddMain">
                  <div class="ddContent">
                    <p class="ddTitle">
                      {{ item.game_name }}
                    </p>
                    <ol>
                      <li v-if="item.game_type === '6'">
                        <p>
                          盘口：{{ item.play_type }}
                          <span class="ait">@{{ item.odds }}</span>
                        </p>
                        <p>
                          类型：{{ item.handicap_type }}
                        </p>
                      </li>

                      <li v-if="item.game_type === '8' ">
                        <p>
                          赔率：{{ item.play_type }}
                          <span class="ait">@{{ item.odds }}</span>
                        </p>
                        <p>
                          类型：{{ item.handicap_type }}
                        </p>
                      </li>
                      <li>
                        <p>
                          流水(RMB)：{{ reserveDecimal(item.valid_bet_amount) }}
                        </p>
                        <p>
                          输/赢 (RMB)：<span :style="`color:${netAmountFilter(item).color}`">{{ reserveDecimal(netAmountFilter(item).text) ?? "0" }}</span>
                        </p>
                      </li>
                    </ol>
                  </div>
                  <div class="ddFoot">
                    投注时间：{{ dayjs(item.bet_time ? +item.bet_time : 0).format('HH:mm:ss') }}
                  </div>
                </div>
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

  .countWarp {
    width: 100%;
    padding-top: 9px;

    .countMain {
      width: 100%;
      height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      ul {
        display: flex;

        li {
          min-width: 111px;
          height: 43px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 2px solid #F8F8F8;
          border-radius: 1px;

          &:last-child {
            border-right: none;
          }

          p {
            color: #7F8CB3;
            min-height: 12px;

            &:last-child {
              padding-top: 3px;
              color: #000000;
            }
          }
        }
      }
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
    padding: 10px 18px;

    dt {
      width: 100%;
      line-height: 16px;
      min-height: 16px;
      font-weight: 800;
      padding: 0 12px 10px 12px;
    }

    dd {
      width: 100%;
      // min-height: 150px;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 6px;
      font-size: 11px;

      .ddHead {
        width: 100%;
        height: 30px;
        padding: 0 15px;
        border-bottom: 1px solid #F3F3F3;
        display: flex;
        align-items: center;
        font-weight: 800;

      }

      .ddMain {
        width: 100%;
        padding: 0 15px;

        .ddContent {
          width: 100%;
          border-bottom: 1px solid #F3F3F3;
          // min-height: 84px;

          .ddTitle {
            width: 100%;
            height: 33px;
            line-height: 33px;
            padding-left: 5px;
            margin-left: -5px;
            // display: flex;
            align-items: center;
            font-weight: 800;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
              &::before {
                  content: '';
                  width: 2px;
                  height: 12px;
                  background: #597EF7;
                  border-radius: 1px;
                  position: absolute;
                  left:0;
                  top:10px;
                }
          }

          ol {
            width: 100%;
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            // align-items: center;
            // height: 40px;
            li {
              width: 100%;
              min-height: 15px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;

              .ait {
                color: $colorBlue;
              }
            }
          }
        }

        .ddFoot {
          width: 100%;
          min-height: 34px;
          font-size: 10px;
          color: #A4A4A4;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
