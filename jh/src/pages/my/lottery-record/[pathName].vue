<script lang="ts" setup>
import dayjs from 'dayjs'
import useBackRouter from '~/hooks/routerBackHooks'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeNav from '~/components/customizeNav.vue'
// import bgImage from '~/components/bgImage.vue'

// 背景图
import bgSrc2 from '~/assets/images/public/minGreyRight.png?preset=full'
import bgSrc1 from '~/assets/images/noData/trade.png?preset=full'

const { goTo } = useBackRouter()

const route = useRoute()
const router = useRouter()
// loading 引入
const { openLoading, closeLoading } = useLoading()
const pathName = route.params.pathName ?? ''

const pageTypeList = [
  { label: '彩票详情', value: 1 },
  { label: '追号详情', value: 2 },
]

const searchTypeList1 = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '已中奖',
    value: '1',
  },
  {
    label: '未中奖',
    value: '2',
  },
  {
    label: '等待开奖',
    value: '0',
  },
]

const searchTypeList2 = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '进行中',
    value: '6',
  },
  {
    label: '已结束',
    value: '7',
  },
]

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const loading = ref(false)
const params = ref({
  pageType: Number(pathName ?? pageTypeList[0].value),
  username: '',
  day: '0',
  state: searchTypeList1[0].value,
})
const searchTypeList: any = computed(() => {
  if (params.value.pageType === 1)
    return searchTypeList1

  else
    return searchTypeList2
})
const list: any = ref([])

const flagsFilter1 = (item: any) => {
  const obj = {
    text: '未结算',
    amount: '',
    color: '#000',
  }
  switch (String(item.state)) {
    case '0':
      obj.text = '等待开奖'
      break
    case '1':
      obj.text = '已中奖'
      obj.amount = reserveDecimal(item.bonus)
      obj.color = '#4080FF'
      break
    case '2':
      obj.text = '未中奖'
      break
    case '3':
      obj.text = '和'
      break
    case '4':
      obj.text = '已撤单'
      break
    case '5':
      obj.text = '中奖撤单'
      break
    case '6':
      obj.text = '进行中'
      break
  }
  return obj
}

const flagsFilter2 = (item: any) => {
  const obj = {
    text: '已结束',
  }
  if (item.state === '7') {
    if (item.done_issue !== item.total_issue || item.done_issue === item.total_issue)
      obj.text = `已结束(${item.done_issue}/${item.total_issue})`
  }

  if (item.state === '6')
    obj.text = '进行中'
  return obj
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true
  openLoading()
  if (params.value.pageType === 1) {
    getLotteryBetListRequest({
      id: 0,
      ty: 1,
      day: String(params.value.day ?? '0'),
      state: params.value.state,
      username: params.value.username,
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
        resolve && resolve({ noPass: true })
      }
    }).catch(() => {
      resolve && resolve({ noPass: true })
    }).finally(() => {
      loading.value = false
      closeLoading()
    })
  }
  else {
    getFutureBetListRequest({
      id: 0,
      ty: 1,
      day: String(params.value.day ?? '0'),
      state: params.value.state === '0' ? null : params.value.state,
      username: params.value.username,
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
        resolve && resolve({ noPass: true })
      }
    }).catch(() => {
      resolve && resolve({ noPass: true })
    }).finally(() => {
      loading.value = false
      closeLoading()
    })
  }
}

const onSearch = () => {
  router.replace({
    path: `/my/lottery-record/${params.value.pageType}`,
    query: {
      ...route.query,
    },
  })

  customizePullDownUp.value.down()
}

const onType = (item: any) => {
  params.value.state = item.value
  onSearch()
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header
      v-model="params.day"
      :show-select="true"
      :is-time-select="false"
      :select-list="[
        { label: '今天', value: '0' },
        { label: '昨日', value: '1' },
        { label: '3天', value: '3' },
        { label: '7天', value: '7' },
        { label: '本月', value: '30' },
        { label: '上月', value: '60' },
      ]"
      @on-select="onSearch()"
    >
      <template #headTitle>
        <CustomizeNav v-model="params.pageType" type-value="btn" :list="pageTypeList" @on-tab="onSearch()" />
      </template>
    </Header>
    <!-- <div class="searchBarWarp">
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
    </div> -->
    <ul class="searchTypeWarp">
      <li
        v-for="(item, index) in searchTypeList" :key="index" :class="params.state === item.value ? 'activeType' : ''"
        @click="onType(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :no-data-img="bgSrc1" :first-down-load="true"
        @init="init"
      >
        <template #bSContent>
          <dl class="dataContent">
            <template v-for="(item, index) in list" :key="index">
              <dd>
                <div
                  class="ddMain"
                  @click="goTo('/my/lottery-fine/lottery-fine-details', { pageType: String(params.pageType), createdTa: String(item.created_at), myAmount: flagsFilter1(item).text, ...item })"
                >
                  <div class="ddContent">
                    <div class="ddContentL">
                      <!-- <p class="ddTitle">
                        <span>{{ item.username }}</span>
                      </p> 33 -->
                      <p class="ddName">
                        {{ item.lott_id }}
                      </p>
                    </div>
                    <div class="ddContentR">
                      <div v-if="params.pageType === 1" class="status">
                        <img loading="lazy" :src="getSupportImage(bgSrc2)">
                        <span class="type">{{ flagsFilter1(item).text }}</span>
                        <span v-if="flagsFilter1(item).amount" class="amount" :style="`color:${flagsFilter1(item).color}`">{{ flagsFilter1(item).amount }}</span>
                      </div>
                      <div v-else class="status">
                        <img loading="lazy" :src="getSupportImage(bgSrc2)">
                        <span class="type">{{ flagsFilter2(item).text }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ddFoot">
                    {{ dayjs(item.created_at ? +item.created_at : 0).format('YYYY-MM-DD HH:mm:ss') }}
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

  .searchBarWarp {
    width: 100%;
    height: 65px;
    background: #fff;
    border-top: 10px solid #F8F8F8;
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
    border-top: 1px solid #E5E5E5;
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
    padding: 10px 18px;

    dd {
      width: 100%;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 6px;
      font-size: 11px;

      .ddMain {
        width: 100%;
        padding: 0 15px;

        .ddContent {
          width: 100%;
          padding: 10px 0;
          border-bottom: 1px solid #F3F3F3;
          display: flex;
          justify-content: space-between;

          .ddContentL {

            .ddTitle {
              height: 15px;
              display: flex;
              align-items: center;
              font-weight: 800;
            }

            .ddName {
              display: flex;
              font-size: 14px;
              align-items: center;
              color: #000000;
              line-height: 20px;
            }
          }

          .ddContentR {
            display: flex;
            align-items: flex-end;

            .status {
              line-height: 20px;
              font-size: 14px;
              padding-right: 8px;
              display: flex;
              align-items: center;
              position: relative;

             img{
                width: 5px;
                height: 10px;
                display: block;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: -5px;
                top: 0;
                bottom: 0;
                margin: auto;
              }

              .type {
                color: #000000;
              }

              .amount {
                margin-left: 5px;
                color: #4080FF;
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

