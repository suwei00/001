<script lang="ts" setup>
import useLaunchHooks from '~/hooks/launchHooks'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import BgImage from '~/components/bgImage.vue'
import CustomizeInput from '~/components/customizeInput.vue'

// 背景图
import bgSrc1 from '~/assets/images/my/search2.png?preset=full'
import bgSrc2 from '~/assets/images/public/greyInputClear.png?preset=full'

const route = useRoute()
const { id = '', title = '' }: any = route.query
const { launch } = useLaunchHooks()

const imgBase = import.meta.env.VITE_GAME_VIDEO_URL // 图片基础路径

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const list: any = ref([])
const searchVisible: any = ref(false)
const searchValue = ref('')
const searchList = computed(() => {
  return list.value.filter((item: any) => {
    return item.name.includes(searchValue.value)
  })
})

const init = (resolve: any = undefined, type: any = undefined) => {
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

      resolve && resolve({ noPass: false })
    }
    else {
      resolve && resolve({ noPass: true })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true })
  })
}

const onClose = () => {
  searchValue.value = ''
  searchVisible.value = false
}
</script>

<template>
  <div class="gamesWarp">
    <div class="gameHeadWarp">
      <Header v-if="!searchVisible" :title="title">
        <template #headRight>
          <BgImage class="headRightSearch" :image="bgSrc1" @click="searchVisible = true" />
        </template>
      </Header>
      <div v-else class="gameHead">
        <div class="searchInput">
          <BgImage :image="bgSrc1" class="searchInputIcon" />
          <CustomizeInput v-model="searchValue" placeholder-color="#CBCED8" color="#818186" placeholder="输入关键字">
            <template #clear>
              <BgImage :image="bgSrc2" />
            </template>
          </CustomizeInput>
        </div>
        <div class="searchClose" @click="onClose()">
          取消
        </div>
      </div>
    </div>
    <div class="gamesMainWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="searchList" :first-down-load="true"
        no-data-tip="还没有游戏列表" @init="init"
      >
        <template #bSContent>
          <div class="dataContent">
            <p v-show="searchVisible && searchValue.length" class="tips">
              共搜索到{{ searchList.length }}条关于“{{ searchValue }}”的结果。
            </p>
            <ol grid grid-cols-2 gap-x-15px gap-y-10px>
              <li v-for="(item, index) in searchList" :key="index" @click="launch(id, '', item.game_id)">
                
                <img loading="lazy" :src=" `${imgBase}${item.img_phone}` " alt="" class="gameImg">
                <div class="gameName">
                  {{ item.name }}
                </div>
              </li>
            </ol>
          </div>
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
  background-color: #F5F5F9;

  .headRightSearch {
    width: 14px;
    height: 16px;
  }

  .gameHeadWarp {
    width: 100%;
    height: 43px;
    background-color: #FFFFFF;
    overflow: hidden;

    .gameHead {
      width: 100%;
      height: 43px;
      padding: 0 18px;
      display: flex;
      align-items: center;

      .searchInput {
        flex: 1;
        width: 100%;
        height: 35px;
        background: #F4F4F4;
        border-radius: 15px;
        margin-right: 24px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        // search icon
        .searchInputIcon {
          width: 14px;
          height: 16px;
          margin-right: 6px;
        }
        .searchClose {
          height: 22px;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
        }
      }
    }
  }

  .gamesMainWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .dataContent {
      width: 100%;
      padding: 10px 18px;

      .tips {
        width: 100%;
        padding-bottom: 20px;
        min-height: 14px;
        font-size: 10px;
        color: #949494;
        line-height: 14px;
      }

      ol {
        width: 100%;

        li {
          width: 100%;
          min-height: 138px;
          background: #FFFFFF;
          border-radius: 5px;

          .gameImg {
            width: 100%;
            height: 108px;
            border-radius: 5px 5px 0 0;
            overflow: hidden;
            background-size: 100%;
            background-position: top;
            background-repeat: no-repeat;
          }

          .gameName {
            width: 100%;
            min-height: 30px;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            padding: 0 5px;
            word-break: break-all;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>

