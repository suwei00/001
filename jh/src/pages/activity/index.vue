<script lang="ts" setup>
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
// hooks
import routerBackHook from '~/hooks/routerBackHooks'
const { goTo } = routerBackHook()

const urlBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`

const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
})
const list: any = ref([])
// deposit=存款活动
// rescue=救援金活动
// stpage=静态页活动
const init = (resolve: any = undefined, type: any = undefined) => {
  promoListRequest({
    page: setParam.value.page,
    page_size: setParam.value.size,

  }).then((res: any) => {
    if (res.status) {
      const { d = [], t = 0 } = res.data
      if (setParam.value.page === 1) {
        list.value = res.data ?? []
        setParam.value.total = t ?? 0
      }
      else { list.value = list.value.concat(d ?? []) }
      // list根据sort升序
      list.value.sort((a: any, b: any) => {
        return a.sort - b.sort
      })
      resolve && resolve({ noPass: false })
    }
    else {
      resolve && resolve({ noPass: true })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true })
  })
}
//
const activeityItemClick = (i: any) => {
  const { id = '', flag = '' } = i
  // console.log('i===>', i);
  switch (flag) {
    case 'rescue':
      // 时来运转
      goTo(`/promotion-detail/${flag}`, { id, flag })
      break

    case 'deposit':
      // 存款活动
      goTo(`/promotion-detail/${flag}`, { id, flag })
      break

    case 'static':
      // 静态页活动
      goTo('/promotion-detail/stpage', { id, flag })
      break

    case 'platform':
      // 关于我们
      goTo(`/promotion-detail/${flag}`, { id })
      break

    case 'cgcpbet':
      // 彩票投注活动
      goTo(`/promotion-detail/${flag}`, { id, flag })
      break

    default:
      break
  }
}
</script>

<template>
  <div class="activityWarp">
    <div class="activityHead">
      优惠活动
    </div>
    <div class="activityMain">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :first-down-load="true" no-data-tip="还没有新的优惠活动" :list="list"
        @init="init"
      >
        <template #bSContent>
          <ol>
            <li v-for="i in list" :key="i.id" class="promo" @click="activeityItemClick(i)">
              <img loading="lazy" :src="`${urlBase}${i.static.list_h5}${canUseAvif() ? '.avif' : '.webp'}`">
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activityWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  .activityHead {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #5D75A2;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-weight: 800;
  }

  .activityMain {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #F5F5F9;

    ol {
      width: 100%;
      padding: 10px 18px;

      li {
        width: 100%;
        height: 136px;
        background: #FFFFFF;
        box-shadow: 0 2px 2px 0 rgba(221, 229, 255, 0.44);
        border-radius: 8px;
        border: 1px solid #FEFFFF;
        margin-bottom: 10px;
        overflow: hidden;

        &:last-child {
          margin-bottom: 0;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
}
</style>
