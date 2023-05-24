<script setup lang="ts" name="home">
import bgImg from '@images/home/main-bg.png?preset=full'

const appStore = useAppStore()
const { isLogged } = storeToRefs(appStore)

// 紧急站内信 优先级1 活动弹窗 优先级2
let hasLetters = $ref(false)
const letterRef = ref()
const bannerRef = ref()
const isClose = $computed(() => localStorage.getItem('closeActivityPopup'))
// 活动弹窗
const { data: activityBanners, run: runGetBannerList } = useRequest(() => getBannerList(2), {
  manual: true,
  onSuccess(res) {
    if (res?.banner?.length > 0) {
      if (!hasLetters && !isClose)
        bannerRef.value.open()
    }
  },
})
const openBanner = () => {
  if (activityBanners.value && activityBanners.value?.banner.length > 0)
    bannerRef.value.open()
}

// 紧急站内信
const { data: emergencyLetters } = useRequest(getEmergency, {
  ready: isLogged,
  onSuccess(res) {
    if (res && res.length > 0) {
      hasLetters = true
      letterRef.value.open()
      if (!isClose)
        runGetBannerList()
    }
    else {
      if (!isClose)
        runGetBannerList()
    }
  },
})

// 滚动公告
const { data: noticeList } = $(useRequest(getNotice))
const list = $computed(() => sortBy(map((noticeList?.d ?? []), (item) => {
  return {
    ...item,
    title: decodeURI(item.title),
    content: decodeURI(item.content),
  }
}), 'seq'))
// 公告弹窗
const marqueeRef = ref()
const openMarquPopup = (i: number) => {
  if (!isLogged.value) {
    loginPopup()
    return
  }
  marqueeRef.value.open(i)
}
</script>

<template>
  <div :style="getBackgroundImgObj(bgImg)" class="home">
    <carousel />
    <marquee :list="list" @check-marquee="openMarquPopup" />
    <hot-lottery />
    <games />
    <advantage />

    <!-- 紧急站内信 -->
    <emergency ref="letterRef" :emergency-letters="emergencyLetters" @on-close="openBanner" />
    <!-- 活动弹窗 -->
    <activity-popup ref="bannerRef" :activity-banners="activityBanners?.banner" />
    <!-- 滚动公告弹窗 -->
    <marquee-popup ref="marqueeRef" :list="list" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-size: cover;
  background-repeat: repeat-y;
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
