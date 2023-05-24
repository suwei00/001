<script lang="ts" setup>
import closeImg from '~/assets/images/home/popclose.png?preset=full'
import useRouterBack from '~/hooks/routerBackHooks'
import useLaunchHooks from '~/hooks/launchHooks'
import { Local } from '~/utils/help'
const { token } = storeToRefs(useUserInfoStore())
const { goTo } = useRouterBack()
const { launch } = useLaunchHooks()

const imgBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`
// 活动弹,
const showPopActivity = ref(true)
const bannerList: any = ref([])
const promotionList: any = ref([])
const popstatus: any = ref('')
const getBanner = () => {
  if (!token.value)
    return

  memberBannerRequest({
    flags: 2,
    page: 1,
    page_size: 50,
  }).then((res: any) => {
    if (res.status) {
      if (res.data && res.data.length !== 0) {
        bannerList.value = res.data?.banner ?? []
        popstatus.value = Local.setItem('popStatus', true)
      }
    }
  })
  const popvalue = Local.getItem('popStatus')
  if (popvalue)
    showPopActivity.value = false
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
// close
const closePop = (item: any) => {
  Local.setItem('popStatus', true)
  showPopActivity.value = false
}

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
const goToActivityDetail = (item: any) => {
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
}
</script>

<template>
  <div class="pop_activity">
    <div class="pop_content">
      <van-popup v-if="bannerList.length" v-model:show="showPopActivity" round>
        <div class="close_icon">
          <bgImage :image="closeImg" class="close_img" @click.stop="closePop" />
        </div>
        <div class="bannerWarp">
          <van-swipe class="bannerSwipe" :autoplay="10000">
            <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="goToActivityDetail(item)">
              
              <img loading="lazy" class="maskIcon" :src="`${imgBase}${item.img}${canUseAvif() ? '.avif' : '.webp'}`">
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//banner-swiper
@import '~/styles/banner_swiper.scss';

.pop_activity {
  .pop_content {
    img {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    :deep(.van-popup){
    background-color: transparent !important;
  }
    .bannerWarp {
      width: 261px;
      height: 332px;
      text-align: center;
      background: rgba(0, 0, 0, 0.7);

    }

    .close_img {
      position: absolute;
      width: 12px;
      height: 12px;
      right: 15px;
      top: 15px;
      z-index: 99;

    }
  }
}
</style>

