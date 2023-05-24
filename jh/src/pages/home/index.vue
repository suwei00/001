<script lang="ts" setup>
import { Toast } from 'vant'

import BannerSwiper from '~/pages/home/components/bannerSwiper.vue' // banner轮播
import NoticeBars from '~/pages/home/components/NoticeBars.vue' // 轮播通知
import FastEntry from '~/pages/home/components/fastEntry.vue' // 快捷栏
import VenueSwiper from '~/pages/home/components/venueSwiper.vue' // 场馆轮播
import showPopActivity from '~/pages/home/components/popActivity.vue'// 活动弹窗
import showEmergency from '~/pages/home/components/emergencyMessage.vue'// 紧急站内信弹窗

// 背景图
import bgSrc1 from '~/assets/images/home/downloadBars.gif'
const { sadfasfNum, token } = storeToRefs(useUserInfoStore())
const { oneClickTrunLoadingClose, oneClickTrunLoadingOpen } = useUserInfoStore()
const router = useRouter()
const dragState = dragStateStore()

const visible = ref(Session.getItem('downloadBarVisible') ?? true)

const { downloadUrl } = $(storeToRefs(useAppStore()))
const onDownload = () => {
  console.log(downloadUrl)
  location.href = downloadUrl || ''
  // Session.setItem('downloadBarVisible', false)
}

const onClose = () => {
  visible.value = false
  Session.setItem('downloadBarVisible', false)
}

// 路由 router 离开
router.beforeEach((to, from, next) => {
  console.log(to.path, '========', from.path)
  if ((to.path === '/home' && from.path === '/my/withdraw') || (to.path === '/home' && from.path === '/my/transfers')) {
    oneClickTrunLoadingOpen()
    if (sadfasfNum.value)
      Toast('部分钱包回收失败，请稍后重试')
  }
  else if ((to.path === '/my/withdraw' && from.path === '/home') || (to.path === '/my/transfers' && from.path === '/home')) {
    oneClickTrunLoadingClose()
  }

  next()
})

onMounted(() => {
  if (token.value) {
    getTutorialState().then((re: any) => {
      if (re.status)
        dragState.setGuideVisible(!re.data)
    })
  }
})
</script>

<template>
  <div class="homeWarp">
    <div v-show="visible" class="downloadBarWarp">
      <div class="downloadClose" @click="onClose()" />
      <img loading="lazy" class="downloadBarImg" :src="bgSrc1" @click="onDownload()">
    </div>
    <BannerSwiper />
    <NoticeBars />
    <FastEntry />
    <VenueSwiper />
    <showPopActivity />
    <showEmergency />
  </div>
</template>

<style lang="scss" scoped>
.homeWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  background-color: #fff;

  .downloadBarWarp {
    width: 100%;
    // height: 56px;
    position: relative;
    .downloadClose{
      width: 20px;
      height: 20px;
      position: absolute;
      left: 5px;
      top: 18px;
    }
    .downloadBarImg {
      width: 100%;
    }
  }
}
</style>

