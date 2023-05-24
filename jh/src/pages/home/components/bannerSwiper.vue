<script setup lang="ts">
import useRouterBack from '~/hooks/routerBackHooks'
import useLaunchHooks from '~/hooks/launchHooks'

const imgBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`
const { goTo } = useRouterBack()
const { launch } = useLaunchHooks()

const bannerList: any = ref([])
const promotionList: any = ref([])

const getBanner = () => {
  memberBannerRequest({
    flags: 1,
    page: 1,
    page_size: 50,
  }).then((res: any) => {
    if (res.status)
      bannerList.value = res.data?.banner ?? []
  })
}
getBanner()

const getPromotion = () => {
  // deposit=存款活动
  // rescue=救援金活动
  // stpage=静态页活动

  promoListRequest({
    page: 1,
    page_size: 50,

  }).then((res: any) => {
    if (res.status)
      promotionList.value = res.data ?? []
  })
}
getPromotion()

const bannerFilter = (item: any) => {
  const activityPathMap: any = {
    rescue: '/promotion-detail/rescue',
    deposit: '/promotion-detail/deposit',
    static: '/promotion-detail/stpage',
  }
  const pathKey = item?.url?.split('/')[1] ?? ''
  let id = ''
  promotionList.value.forEach((iii: any) => {
    if (iii.flag !== 'static' && !id)
      id = iii.id
    else
      id = item?.url?.split('/')[2] ?? ''
  })

  goTo(`${activityPathMap[pathKey]}`, { id, flag: pathKey })
}
// 跳站内，/不跳
const goToOther = (url: string) => {
  if (url !== '/')
    goTo(url)
}
const onBanner = (item: any) => {
  switch (item.flags) {
    case '1': // 站内跳转"
      goToOther(item.url)
      break
    case '2': // 站外跳转测试
      window.location.href = item.url
      break
    case '3': // 场馆跳转
      // const { venId, venItem } = venueIdFilter(item.url)
      launch(item.url)
      break
    case '4': // 活动跳转
      bannerFilter(item)
      break
    default:
      break
  }

  // goTo(`/promotion-detail${item.url}`, { id: item.id, title: item.title, flag: 'deposit' })
  console.log('onBanner>>>>', item)
}
</script>

<template>
  <div class="bannerWarp">
    <van-swipe class="bannerSwipe" :autoplay="10000">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="onBanner(item)">
        <img loading="lazy" :src="`${imgBase}${item.img}${canUseAvif() ? '.avif' : '.webp'}`" alt="正在努力加载中">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
  .bannerWarp {
    width: 100%;
    height: 165px;

    .bannerSwipe {
      width: 100%;
      height: 100%;

     img{
        display: block;
        width: 100%;
        height: 100%;
        background-size: 100% ;
        background-position: center;
        background-repeat: no-repeat;
      }

      &:deep(.van-swipe__indicator) {
        width: 7px;
        height: 7px;
        background: linear-gradient(180deg, #F0F5FD 0%, #C5D3EE 100%);
        opacity: 1;
      }

      &:deep(.van-swipe__indicator--active) {
          background: #6485FD !important;
          border: 1px solid white;
          box-shadow:0 0 0 1px #6485FD;
      }
    }
  }
</style>
