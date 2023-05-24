<script lang="ts" setup>
// component
import dayjs from 'dayjs'
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
// 背景图
import bgSrc1 from '~/assets/images/noData/trade.png?preset=full'

const route = useRoute()
const { ty, flag, username } = route.query

const title = computed(() => {
  switch (flag) {
    case '1':
      return '投注人数'
    case '2':
      return '注册人数'
    case '3':
      return '首充人数'
    case '4':
      return '下级人数'
    default:
      return ''
  }
})
const typeList = computed(() => {
  switch (flag) {
    case '1':
      return ['会员账号', '投注次数', '投注金额']
    case '2':
      return ['会员账号', '邀请人账号', '注册时间']
    case '3':
      return ['会员账号', '首充金额', '首充时间']
    case '4':
      return ['会员账号', '所属上级', '下级人数']
    default:
      return []
  }
})

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const loading = ref(false)
const params = ref({
  ty: Number(ty),
  flag,
  username,
})

const list: any = ref([])

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true
  // 代理报表下级明细
  memberAgencyReportSubRequest({
    ty: String(params.value.ty),
    flag: params.value.flag as string,
    username: params.value.username as string,
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
  })
}

const onSearch = () => {
  customizePullDownUp.value.down()
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header v-model="params.ty" :title="title" :show-select="true" @on-select="onSearch()" />
    <ul class="searchTypeWarp">
      <li v-for="(item, index) in typeList" :key="index">
        {{ item }}
      </li>
    </ul>
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true"
        :no-data-img="bgSrc1" no-data-tip="还没有新的注册会员" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <div v-if="flag === '1'" class="li">
                <p>{{ item.username }}</p>
                <p>{{ item.bet_count }}</p>
                <p>{{ reserveDecimal(item.bet_amount) }}</p>
              </div>
              <div v-else-if="flag === '2'" class="li">
                <p>{{ item.username }}</p>
                <p>{{ item.parent_name }}</p>
                <p>{{ dayjs(item.created_at * 1000 ? +item.created_at * 1000 : 0).format('YYYY-MM-DD HH:mm:ss') }}</p>
              </div>
              <div v-else-if="flag === '3'" class="li">
                <p>{{ item.username }}</p>
                <p>{{ reserveDecimal(item.first_deposit_amount) }}</p>
                <p>{{ dayjs(item.first_deposit_at * 1000 ? +item.first_deposit_at * 1000 : 0).format('YYYY-MM-DD HH:mm:ss') }}</p>
              </div>
              <div v-else-if="flag === '4'" class="li">
                <p>{{ item.username }}</p>
                <p>{{ item.parent_name }}</p>
                <p>{{ item.mem_count }}</p>
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

  .searchTypeWarp {
    width: 100%;
    height: 55px;
    background: #fff;
    display: flex;
    align-items: center;
    color: #000000;
    border-bottom: 10px solid #F8F8F8;
    padding: 0 18px;
    li{
      flex:1;
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

    li {
      width: 100%;
      padding: 0 18px;
      background-color: #fff;

      .li {
        width: 100%;
        min-height: 40px;
        border-bottom: 1px solid #F1F1F1;
        display: flex;
        align-items: center;
        p{
          flex: 1;
          width: 100%;
          text-align: center;
        }
      }

      &:last-child {
        .li {
          border-bottom: none;
        }
      }
    }
  }
}
</style>

