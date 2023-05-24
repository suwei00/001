<script lang="ts" setup>
import { FreeMode, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/app'
import useLaunchHooks from '~/hooks/launchHooks'
// 背景图
import bgSrc1 from '~/assets/images/venue/topBg.png?preset=full'
import bgSrc2 from '~/assets/images/venue/bottomBg.png?preset=full'
import bgSrc4 from '~/assets/images/venue/active-0.png?preset=full'
import bgSrc5 from '~/assets/images/venue/active-1.png?preset=full'
import bgSrc6 from '~/assets/images/venue/warn.png?preset=full'

const { venueList } = storeToRefs(useAppStore())
const bg1 = `url(${getSupportImage(bgSrc1)})`
const bg2 = `url(${getSupportImage(bgSrc2)})`
const bg4 = `url(${getSupportImage(bgSrc4)})`
const bg5 = `url(${getSupportImage(bgSrc5)})`
const bg6 = getSupportImage(bgSrc6)

const { launch, isLoading } = useLaunchHooks()

// swiper 逻辑开始
const customizeCode = `${(new Date()).valueOf()}${Math.floor(Math.random() * 1000000)}`
const modules = [FreeMode, Navigation, Thumbs]

const swiperNav = ref(null as any)
const swiperList = ref(null as any)
const swiperItem = reactive({} as any)
const venueActiveIndex = ref(0)
const swiperNavType: any = {
  direction: 'vertical',
  freeMode: {
    sticky: true,
  },
  slidesPerView: 'auto',
  watchSlidesProgress: true,
  breakpointsBase: 'container',
}
const swiperListType: any = {
  direction: 'vertical',
  watchSlidesProgress: true,
  breakpointsBase: 'container',
}
const swiperItemType: any = {
  direction: 'vertical',
  freeMode: {
    sticky: true,
  },
  slidesPerView: 'auto',
  watchSlidesProgress: true,
  breakpointsBase: 'container',
  nested: true,
}

const swiperNavInit = (val: any) => {
  swiperNav.value = val
}
const swiperListInit = (val: any) => {
  swiperList.value = val
}
const swiperItemInit = (val: any, idx: number) => {
  swiperItem[`${customizeCode}${idx}`] = val
}

const navSlideChange = (swiper: any) => {
  swiperList.value.slideTo(swiper.clickedIndex)
  venueActiveIndex.value = swiper.clickedIndex
  swiperItem[`${customizeCode}${swiper.clickedIndex}`].slideTo(0, 0)
}

const setTranslate = (swiper: any, translate: any) => {
  if (translate > 30) {
    // console.log('setTranslate', '===1111===', translate);
  }
  else {
    // console.log('setTranslate', '===2222===', translate);
  }
}

const listTransitionEnde = (swiper: any) => {
  const currentIndex = swiper.activeIndex ?? 0
  venueActiveIndex.value = currentIndex
  swiperNav.value.slideTo(currentIndex)
}

// swiper 逻辑结束
</script>

<template>
  <div class="venueSwiperWarp">
    
    <Loading :loading="isLoading" />
    <div class="venueSwiperMain">
      <div class="venueSwiperWarpLeft">
        <Swiper
          :modules="modules" v-bind="swiperNavType" class="venueSwiperLeft" @swiper="swiperNavInit"
          @tap="navSlideChange"
        >
          <SwiperSlide v-for="(item, index) in venueList" :key="index">
            <div class="venueSwiperLeftSlide">
              <div
                class="venueSwiperLeftSlideItem"
                :class="venueActiveIndex === index ? 'venueSwiperLeftSlideItemActive' : ''"
              >
                <img loading="lazy" :src="venueActiveIndex === index ? item.activeIcon : getSupportImage(item.icon)">
                <span>{{ item.name }}</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="venueSwiperWarpRight">
        <Swiper
          :modules="modules" v-bind="swiperListType" class="venueSwiperRight" @swiper="swiperListInit"
          @transition-end="listTransitionEnde" @set-translate="setTranslate"
        >
          <SwiperSlide v-for="(item1, index1) in venueList" :key="index1">
            <div class="venueSwiperRightSlide">
              <Swiper
                v-show="venueActiveIndex === index1" class="itemSlideWarp" :modules="modules"
                v-bind="swiperItemType" @swiper="swiper => swiperItemInit(swiper, index1)"
              >
                <SwiperSlide v-for="(item2, index2) in item1.l" :key="index2">
                  <div
                    class="itemSlide"
                    @click="() => { if (String(item2.maintained) !== '1') return;launch(item2.id, item2.category); }"
                  >
                    <div class="itemSlideContent">
                      <img loading="lazy" :src="getSupportImage(item2.icon)">
                      <div v-if="String(item2.maintained) !== '1'" class="itemSlideMask">
                        
                        <img loading="lazy" class="maskIcon" :src="bg6">
                        <div class="maskText">
                          场馆维护中⋯
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.venueSwiperWarp {
  flex: 1;
  width: 100%;
  height: 100%;
  background: v-bind(bg2);
  background-size: 100%;
  // padding-bottom: 20px;
  overflow: hidden;

  .venueSwiperMain {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    padding-top: 11px;
    background: v-bind(bg1);
    background-size: 100%;
    background-position: left top;
    background-repeat: no-repeat;

    .venueSwiperWarpLeft {
      width: 82px;
      height: 100%;
      margin-top: 5px;

      .venueSwiperLeft {
        width: 100%;
        height: 100%;
        padding: 0 7px 15px 15px;
        overflow: hidden;

        .venueSwiperLeftSlide {
          width: 100%;
          height: 60px;
          padding: 5px 0;

          .venueSwiperLeftSlideItem {
            width: 100%;
            height: 100%;
            box-shadow: 0 1px 4px 0 #AFBDE1;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            font-size: 11px;
            line-height: 11px;
            background: v-bind(bg4);
            background-size: 100%;
            background-position: left top;
            background-repeat: no-repeat;
            color: #464B55;

            img {
              display: block;
              width: 22px;
              height: 22px;
              margin-bottom: 2px;
            }

            &.venueSwiperLeftSlideItemActive {
              background-color: #AFBDE1;
              background: v-bind(bg5);
              background-size: 100%;
              background-position: left top;
              background-repeat: no-repeat;
              font-weight: 800;
              color: #FFFFFF;
            }
          }
        }
      }
    }

    .venueSwiperWarpRight {
      flex: 1;
      width: 100%;
      height: 100%;

      .venueSwiperRight {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .venueSwiperRightSlide {
          width: 100%;
          height: 100%;

          .itemSlideWarp {
            width: 100%;
            height: 100%;

            .itemSlide {
              width: 100%;
              padding: 8px 15px 8px 7px;

              .itemSlideContent {
                width: 100%;
                height: 142px;
                background-color: #fff;
                border-radius: 15px;
                box-shadow: 1px 2px 8px 0px rgba(175, 189, 225, 0.6);
                background-size: 100%;
                background-position: left top;
                background-repeat: no-repeat;
                position: relative;

                .itemSlideMask {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top: 0;
                  background: linear-gradient(180deg, rgba(98, 98, 98, 0.2) 0%, rgba(51, 51, 51, 0.4) 100%);
                  border-radius: 15px;
                  border: 1px solid #96AEFF;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;

                  .maskIcon {
                    display: block;
                    width: 66px;
                    height: 60px;
                  }

                  .maskText {
                    width: 80px;
                    height: 18px;
                    box-shadow: 0px 1.5px 3px 0px rgba(86, 122, 254, 0.6);
                    border-radius: 17px;
                    border: 1.5px solid #FFFFFF;
                    margin-top: 10px;
                    font-weight: 800;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

