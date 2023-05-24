<script lang="ts" setup>
import { useSessionStorage } from '@vueuse/core'
import type { Swipe } from 'vant'
import PcBannerRl from '@image/home/pc_banner_rl.png?preset=full'

const noticeBanner = ref<typeof Swipe | null>(null)
const autoPlayTime = ref<number | undefined>(5000)

// 鼠标移入停止轮播
const mouseEnter = () => {
  autoPlayTime.value = undefined
}
// 鼠标移出开始轮播
const mouseLeave = () => {
  autoPlayTime.value = 5000
}

// 是否显示公告弹窗
const vState = useSessionStorage('__isShowDialog', true)
const noticeList: any = ref([])
const getNoticeList = () => {
  getNoticeListRequest().then((res: any) => {
    if (res) {
      if (res.banner && res.banner.length !== 0)
        noticeList.value = res.banner ?? []
      noticeList.value.sort((a: any, b: any) => {
        return a.sort - b.sort
      })
    }
  })
}
getNoticeList()
const noticeItemClick = (item: any) => {
}
const showNotice = computed(() => {
  return vState.value && noticeList.value.length !== 0
})

const bannerClick = (direction: 'left' | 'right') => {
  if (direction === 'left')
    noticeBanner.value?.prev()

  else
    noticeBanner.value?.next()
}
</script>

<template>
  <div>
    <van-popup v-model:show="showNotice" round :close-on-click-overlay="false">
      <div class="bannerWarp">
        <div class="left" @click="bannerClick('left')">
          <img w1 :src="getSupportImage(PcBannerRl)">
        </div>
        <div class="bannerContent">
          <van-swipe ref="noticeBanner" class="bannerSwipe" :autoplay="autoPlayTime" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
            <van-swipe-item v-for="(item, index) in noticeList" :key="index" class="van_item" @click="noticeItemClick(item)">
              <div style="padding-bottom: 25px">
                <van-notice-bar v-if="item.title.length >= 10" :key="item.title" class="tit_marque" :text="item.title" :scrollable="true" />
                <span v-else class="tit_marque">{{ item.title }}</span>
                <div class="text_content" v-html="item.show_content" />
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="right" @click="bannerClick('right')">
          <img w1 :src="getSupportImage(PcBannerRl)">
        </div>
      </div>

      <div class="flex_btn flex jc-c ai-c">
        <div class="addmore_btn" @click="vState = false">
          关闭
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/banner_swiper.scss';

.flex_btn {
  background: #FFFFFF;
  margin-top: -2px;
}
.tit_marque{
  // width: 100%;
  text-align: center;
  line-height: 60px;
  height: 60px;
  color: $color-gray-7;
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 49%, #ffffff 100%);
  font-size: $size18;
  font-weight: 600;
}
.no_token{
  padding-top: 10px;
  height: 240px;
  width: 280px;
  text-align: center;
  background: #FFFFFF;
}
.bannerWarp {
  width: 306px;
  text-align: center;
  background-color: #fff;
  display: flex;
  align-items: center;
  .left,.right {
    width: 25px;
    height: 24px;
    &.left > img {
      transform: rotate(180deg);
    }
    img {
      width: 13px;
      height: 100%;
      vertical-align: top;
    }
  }
  .bannerContent {
    width: 255px;
    margin: 0 auto;
  }

  .bannerSwipe {
    &:deep(.van-swipe__indicators) {
      bottom: 0px;
    }
    .van_item {
    padding: 0;
    background: #fff;
  }
    .text_content {
      width: 97%;
      padding: 0 15px 0 10px;
      height: 215px;
      background:#ffffff;
      text-align: justify;
    }
  }
}
:deep(.van-popup){
    background: transparent !important;
}
.addmore_btn {
    width: 100px;
    height: $size36;
    border-radius: $size4;
    color: $color-white-1;
    line-height: $size36;
    color: $color-blue-1;
    border: 1px solid $color-blue-1;
}
</style>
