<script lang="ts" setup>
import dayjs from 'dayjs'
// component
import { Toast } from 'vant'
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
    label: '全部',
    value: '0',
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
    label: '待开奖',
    value: '3',
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
  player_name: '',
  date_flag: 1,
  flag: searchTypeList[0].value,
})
const list: any = ref([])

const flagFilter = (item: any) => {
  try {
    return searchTypeList.filter(it => it.value === String(item.flag))[0].label
  }
  catch (e) {
    return ''
  }
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  getSubordinateBetRequest({
    page: setParam.value.page,
    page_size: setParam.value.size,
    date_flag: String(params.value.date_flag ?? 1),
    flag: params.value.flag,
    player_name: params.value.player_name,
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

const onSearch = () => {
  customizePullDownUp.value.down()
}

const onType = (item: any) => {
  params.value.flag = item.value
  onSearch()
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.date_flag" title="投注明细" :show-select="true" @on-select="onSearch()" />
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
              <dl class="li" @click="goTo('/my/bet-fine/bet-fine-datails', { record: JSON.stringify(params), bet_flag: flagFilter(item), ...item })">
                <dt>
                  <span class="account">{{ item.player_name }}</span>
                  <span class="time">
                    {{ dayjs(item.bet_time ? +item.bet_time : 0).format('YYYY-MM-DD HH:mm:ss') }}
                  </span>
                </dt>
                <dd class="flex jc-c ai-c">
                  <div class="fl_ri">
                    <span
                      class="amount"
                      :class="{ customizeColorBlue: Number(item.net_amount) > 0, customizeColorRed: Number(item.net_amount) < 0 }"
                    >
                      {{ reserveDecimal(item.net_amount) }}
                    </span>
                    <span class="type">{{ flagFilter(item) }}</span>
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
            min-height: 12px;
          }

          .time {
            padding-top: 5px;
            color: #A4A4A4;
            min-height: 17px;
          }
        }
        dd{
          .fl_ri {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .amount {
            min-height: 12px;
          }
          .type {
            padding-top: 5px;
            color: #535353;
            min-height: 17px;
          }
        }
        }
      }
    }
  }
}
</style>

