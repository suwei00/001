<script lang="ts" setup>
import dayjs from 'dayjs'
// 第三方ui
import 'vant/lib/popup/index.css'
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import bgImage from '~/components/bgImage.vue'
import BreadCrumbs from '~/components/breadCrumbs.vue'
import { memberListRequest } from '~/api/index'
// 背景图
import bgSrc1 from '~/assets/images/my/search.png?preset=full'
import bgSrc2 from '~/assets/images/noData/trade.png?preset=full'
const { userInfo } = storeToRefs(useUserInfoStore())
const titleList = ['会员账号', '直属上级', '下级人数', '登录状态']

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
const record: any = ref({
  username: '',
  zr: '0.0',
  qp: '0.0',
  ty: '0.0',
  dj: '0.0',
  dz: '0.0',
  by: '0.0',
  k3: '0.00',
  pk10: '0.00',
  ssc: '0.00',
  luck28: '0.00',
  ll5: '0.00',
  lhc: '0.00',
})
const loading = ref(false)
const params = ref({
  username: '',
  parent_name: userInfo.value.username,
})
const list: any = ref([])

const onlineFilter = (item: any) => {
  const obj = {
    text: '在线',
    color: '#16B18B',
  }
  if (item.is_online !== '1') {
    const timer = dayjs().valueOf()
    const day = dayjs(timer).diff(dayjs(item.last_login_at ? +item.last_login_at : 0), 'day')
    // 精确到小时
    const hour = dayjs(timer).diff(dayjs(item.last_login_at ? +item.last_login_at : 0), 'hour')
    if (day > 0)
      obj.text = `${day}天前`

    else if (hour > 0)
      obj.text = `${hour}小时前`

    else
      obj.text = '刚刚'

    obj.color = '#FA3C46'
  }
  return obj
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  memberListRequest({
    username: params.value.username,
    parent_name: params.value.parent_name,
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

const onTab = (val: any) => {
  if (loading.value)
    return

  params.value.username = ''
  params.value.parent_name = val
  customizePullDownUp.value.down()
}

const show = ref(false)
// 返水弹窗
const showReturn = ref(false)
// 点击list
const popAccount = (item: any) => {
  show.value = true
  record.value = { ...record.value, ...item }
}
const onUserName = (item: any) => {
  if (loading.value)
    return

  if (item)
    record.value = { ...record.value, ...item }

  breadCrumbsParam.value.list = [...breadCrumbsParam.value.list, { label: record.value.username, value: record.value.username }]
  onTab(record.value.username)
  show.value = false
}
const returnWater = () => {
  showReturn.value = true
  show.value = false
}
const cancelBut = () => {
  show.value = false
}
const cancelReturn = () => {
  showReturn.value = false
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header title="会员管理" />
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
    <BreadCrumbs v-model="breadCrumbsParam" @on-tab="onTab" />
    <ul class="dataTitleWarp">
      <li v-for="(item, index) in titleList" :key="index">
        {{ item }}
      </li>
    </ul>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true"
        :no-data-img="bgSrc2" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <div class="li">
                <p class="account" @click="onUserName(item)">
                  {{ item.username }}
                </p>

                <p @click="popAccount(item)">
                  {{ item.parent_name }}
                </p>
                <p @click="popAccount(item)">
                  {{ item.mem_count }}
                </p>
                <p :style="`color:${onlineFilter(item).color}`" @click="popAccount(item)">
                  {{ onlineFilter(item).text }}
                </p>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>

    <van-popup v-model:show="show" position="bottom">
      <div class="popContent">
        <ul>
          <li @click="onUserName(null)">
            {{ record.username }}
          </li>
          <li @click="returnWater">
            返水比例
          </li>
        </ul>
        <div class="cancelBut" @click="cancelBut">
          取消
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="showReturn" position="bottom">
      <div class="popContent">
        <div class="popTitle">
          <p>
            返水比例
          </p>
        </div>
        <div class="popCenter">
          <ul>
            <li class="flex jc-sb ret_list">
              <div>真人</div>
              <div>{{ record.zr }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>体育</div>
              <div>{{ record.ty }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>棋牌</div>
              <div>{{ record.qp }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>电子</div>
              <div>{{ record.dz }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>捕鱼</div>
              <div>{{ record.by }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>电竞</div>
              <div>{{ record.dj }}%</div>
            </li>
          </ul>
          <div class="bar" />
          <ul>
            <li class="flex jc-sb ret_list">
              <div>快3</div>
              <div>{{ record.k3 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>PK10</div>
              <div>{{ record.pk10 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>时时彩</div>
              <div>{{ record.ssc }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>六合彩</div>
              <div>{{ record.lhc }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>11选5</div>
              <div>{{ record.ll5 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>幸运28</div>
              <div>{{ record.luck28 }}</div>
            </li>
          </ul>
        </div>
        <div class="cancelBut" @click="cancelReturn">
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

  .popContent {
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;

    .popTitle {
      width: 100%;
      padding: 0 8px;

      p {
        width: 100%;
        min-height: 45px;
        line-height: 45px;
        font-weight: 400;
        color: #000000;
        line-height: 45px;
        border-bottom: 1px solid #F3F3F3;
      }
    }

    .popCenter {
      width: 100%;
      max-height: 410px;
      overflow-y: auto;
    }

    .bar {
      width: 100%;
      height: 10px;
      background: #F8F8F7;
    }

    ul {
      padding: 0 8px;

      li {
        height: 45px;
        line-height: 45px;
        font-weight: 400;
        color: #000000;
        line-height: 45px;
        border-bottom: 1px solid #F3F3F3;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .cancelBut {
      font-weight: 400;
      color: #000000;
      line-height: 50px;
      border-top: 5px solid #F8F8F7;
    }

    .ret_list {
      padding: 0 22px;
    }
  }

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
    padding:0px 18px;
    line-height: 41px;

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
      padding: 0 18px;
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
        div{
          width: 100%;
        min-height: 40px;
        display: flex;
        border-bottom: 1px solid #F1F1F1;
       justify-content: space-around;
        align-items: center;
        line-height: 15px;
        font-size: 11px;
        }
        p {
          width: 25%;
          text-align: center;
          color: #535353;
          font-size: 11px;

          &:first-child {
            color: #597EF6;
          }
        }
      }
    }
  }
}
</style>
