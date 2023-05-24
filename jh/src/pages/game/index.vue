<script lang="ts" setup>
// import useRouterBack from '~/hooks/routerBackHooks'
import useLaunchHooks from '~/hooks/launchHooks'
import amountHooks from '~/hooks/amountHooks'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import BgImage from '~/components/bgImage.vue'

// 背景图
import bgSrc1 from '~/assets/images/public/money.png?preset=full'
import bgSrc2 from '~/assets/images/my/backRefresh.png?preset=full'

const route = useRoute()
const { id = '', title = '' }: any = route.query
const { launch } = useLaunchHooks()
const { totalAmount } = amountHooks()

// const { goTo } = useRouterBack()

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 100,
})
const loading = ref(false)
const list: any = ref([])

const onSearch = () => {
  customizePullDownUp.value.down()
}

const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  getGameListRequest({
    pid: id,
    flag: 0,
    page: setParam.value.page,
    page_size: setParam.value.size,
  }).then((res: any) => {
    if (res.status) {
      const { d = [], t = 0 } = res.data
      if (setParam.value.page === 1) {
        setParam.value.total = t
        list.value = d ?? []
      }
      else {
        list.value = list.value.concat(d ?? [])
      }

      resolve && resolve({ noPass: false, list: list.value })
    }
    else {
      resolve && resolve({ noPass: true, list: list.value })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true, list: list.value })
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="gamesWarp">
    <Header :title="title">
      <template #headLeft>
        <BgImage
          class="headLeftRefresh" :class="{ headLeftRefreshActive: loading }" :image="bgSrc2"
          @click="onSearch()"
        />
      </template>
      <template #headRight>
        <div class="headRightAmount">
          <BgImage :image="bgSrc1" />
          <span>
            {{ totalAmount }}
          </span>
        </div>
      </template>
    </Header>
    <div class="gamesMainWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true"
        no-data-tip="还没有游戏列表" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index" @click="launch(id, '', item.game_id)">
              {{ item.name }}
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gamesWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .headLeftRefresh {
    width: 22px;
    height: 22px;
    margin-left: 8px;

    &.headLeftRefreshActive {
      animation: rotate 1s linear infinite;
    }
  }

  .headRightAmount {
    height: 27px;
    background: #F3F6FF;
    border-radius: 27px;
    padding: 2px 6px 2px 2px;
    display: flex;
    align-items: center;
    justify-content: center;

   img{
      width: 24px;
      height: 24px;
    }

    span {
      margin-left: 2px;
      color: #333333;
    }
  }

  .gamesMainWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .dataContent {
      width: 100%;

      li {
        width: 100%;
        height: 30px;
        background-color: aqua;
        margin: 10px 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

