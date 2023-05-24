<script lang="ts" setup>
// component
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import bgImage from '~/components/bgImage.vue'
import BreadCrumbs from '~/components/breadCrumbs.vue'
import { downReportRequest } from '~/api/index'
// 背景图
import bgSrc1 from '~/assets/images/my/search.png?preset=full'
import bgSrc2 from '~/assets/images/noData/trade.png?preset=full'
const titleList = ['会员账号', '投注金额', '游戏输赢', '下级盈利']
const { userInfo } = storeToRefs(useUserInfoStore())
const { venueList } = storeToRefs(useAppStore())

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,

})
const breadCrumbsParam: any = ref({
  list: [
    { label: userInfo.value.username, value: userInfo.value.username },
  ],
  username: '',
})
const loading = ref(false)
const params = ref({
  ty: '1',
  player_name: '',
  parent_name: userInfo.value.username,
  is_online: '0',
})
const list: any = ref([])
const visible = ref(false)
const profitList: any = ref([])
const agency = ref('1') // 1 团队盈利 2 投注金额 3 游戏输赢
const agencyName = ref('')

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

const onTab = (val: any) => {
  params.value.ty = '1'
  params.value.player_name = ''
  params.value.parent_name = val
  customizePullDownUp.value.down()
}

const onUserName = (item: any) => {
  breadCrumbsParam.value.list = [...breadCrumbsParam.value.list, { label: item.username, value: item.username }]
  onTab(item.username)
}

const getuseRVenueReportAmount = () => {
  memberAgencyReportPlatformRequest({
    ty: params.value.ty,
    username: agencyName.value,
  }).then((res: any) => {
    if (res.status)
      profitList.value = res.data?.d ?? []
  })
}

const onChangeLi = (item: any) => {
  agency.value = item.agency
  agencyName.value = item.username
  visible.value = true
  getuseRVenueReportAmount()
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  downReportRequest({
    ty: params.value.ty,
    player_name: params.value.player_name,
    parent_name: params.value.parent_name,
    is_online: params.value.is_online,
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

const onSearch = () => {
  customizePullDownUp.value.down()
}

const companyNetAmountFilter = (val: any) => {
  const obj = {
    color: '#000000',
    text: reserveDecimal(val),
  }

  if (Number(val) < 0)
    obj.color = '#FF0000'
  else if (Number(val) > 0)
    obj.color = '#4F73F6'

  return obj
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.ty" title="下级报表" :show-select="true" @on-select="onSearch()" />
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
    <BreadCrumbs v-model="breadCrumbsParam" @on-tab="onTab" />
    <ul class="dataTitleWarp">
      <li v-for="(item, index) in titleList" :key="index">
        {{ item }}
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
              <div class="li">
                <p class="account" @click="onUserName(item)">
                  {{ item.username }}
                </p>
                <p :style="`color: ${companyNetAmountFilter(item.bet_amount).color}`" @click="onChangeLi({ ...item, agency: '2' })">
                  {{ reserveDecimal(item.bet_amount) }}
                </p>
                <p :style="`color: ${companyNetAmountFilter(item.company_net_amount).color}`" @click="onChangeLi({ ...item, agency: '3' })">
                  {{ companyNetAmountFilter(item.company_net_amount).text }}
                </p>
                <p>
                  {{ reserveDecimal(item.profit) }}
                </p>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>

    <van-popup v-model:show="visible" position="bottom">
      <div class="popWarp">
        <div class="popMain">
          <ol>
            <li v-for="(ls, idx) in profitListFilter" :key="idx">
              <div v-for="(item, index) in ls" :key="index" class="pliMainWarp">
                <div class="pliMain">
                  <label>{{ item.label }}</label>
                  <p v-show="agency === '1'">
                    {{ reserveDecimal(item.company_revenue) }}
                  </p>
                  <p v-show="agency === '2'">
                    {{ reserveDecimal(item.bet_amount) }}
                  </p>
                  <p v-show="agency === '3'">
                    {{ reserveDecimal(item.net_amount) }}
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

  .dataTitleWarp {
    width: 100%;
    height: 41px;
    border-top: 1px solid #E5E5E5;
    background: #fff;
    display: flex;
    color: #000000;
    justify-content: space-around;
    padding: 10px 12px 0 12px;

    li {
      width: 100%;
      text-align: center;
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
    padding-top: 10px;

    li {
      width: 100%;
      padding: 0 12px;
      background: #fff;

      .li {
        width: 100%;
        min-height: 40px;
        display: flex;
        border-bottom: 1px solid #F1F1F1;
        justify-content: space-between;
        align-items: center;
        line-height: 15px;
        font-size: 11px;

        p {
          width: 25%;
          text-align: center;
          color: #535353;
          font-size: 11px;
          color: #4F73F6;
          text-decoration: underline;

          &:first-child {
            text-decoration: none;

          }
          &:last-child {
            text-decoration: none;
            color: #000000;

          }
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
