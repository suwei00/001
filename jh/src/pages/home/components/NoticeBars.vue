<script lang="ts" setup>
import trumpet1Bg from '~/assets/images/public/trumpet1.png'
import useRouterBack from '~/hooks/routerBackHooks'
const { token } = storeToRefs(useUserInfoStore())
const { goTo } = useRouterBack()
const promotionList: any = ref([])
const marqueeList = ref([])
const list: any = ref([])
const strs: any = []
const init = () => {
  noticesRequest({
    page: 1,
    page_size: 200,
  }).then((res: any) => {
    if (res.status)
      list.value = res.data.d || []
    list.value.sort((a: any, b: any) => {
      return a.seq - b.seq
    })
    list.value.forEach((item: any) => {
      strs.push(`${decodeURI(item.title)}：${decodeURI(item.content)}`)
    })
    marqueeList.value = strs.join(' ')
  })
}
init()
// 公告popup
const showNoticeDetail = ref(false)
// close
const closePop = (item: any) => {
  showNoticeDetail.value = false
}
const popDetail = () => {
  if (!token.value)
    goTo('/entry/login')

  else
    showNoticeDetail.value = true
}
// 跳转
// const getPromotion = () => {
//   // deposit=存款活动
//   // rescue=救援金活动
//   // stpage=静态页活动

//   promoListRequest({
//     page: 1,
//     page_size: 50,

//   }).then((res: any) => {
//     if (res.status)
//       promotionList.value = res.data ?? []
//   })
// }
// getPromotion()
const bannerFilter = (item: any) => {
  const activityPathMap: any = {
    rescue: '/promotion-detail/rescue',
    deposit: '/promotion-detail/deposit',
    static: '/promotion-detail/stpage',
  }
  const pathKey = item?.redirect_url?.split('/')[1] ?? ''
  let id = ''
  // promotionList.value.forEach((iii: any) => {
  //   if (iii.flag !== 'static' && !id) {
  //     id = iii.id
  //     console.error('iii', iii.id)
  //   }

  //   else {
  //     id = item?.redirect_url?.split('/')[2] ?? ''
  //     console.error('ididiidid', iii.id)
  //   }
  // })

  id = item?.redirect_url?.split('/')[2] ?? ''
  // console.error('ididiidid', id)
  goTo(`${activityPathMap[pathKey]}`, { id, flag: pathKey })
}
// 跳站内，/不跳
const goToOther = (url: string) => {
  if (url !== '/')
    goTo(url)
}
const noticeItemClick = (item: any) => {
  switch (item.redirect) {
    case 1: // 站内跳转
      goToOther(item.redirect_url)
      console.log('fsdfsfs', item)
      break
    case 2: // 站外跳
      if (item.redirect_url !== '')
        window.location.href = item.redirect_url
      break
    case 4:
      bannerFilter(item)
      break
    default:
      break
  }
}
</script>

<template>
  <div class="noticeBarWarp">
    <div class="noticeBarMain">
      <img loading="lazy" class="downloadBarImg" :src="trumpet1Bg">
      <van-notice-bar class="noticeBar" @click="popDetail">
        <template #default>
          {{ marqueeList }}
        </template>
      </van-notice-bar>
    </div>
  </div>
  
  <div class="notice_detail">
    <van-popup v-model:show="showNoticeDetail" class="emergency_pop" round>
      <!-- <div v-if="!token">
        <div class="pop_title flex ai-c jc-c">
          公告详情
        </div>
        <div class=" no_token">
          请先登录账号，才能了解更多
        </div>
      </div> -->
      <div class="bannerWarp">
        <van-swipe class="bannerSwipe" :autoplay="10000">
          <van-swipe-item v-for="(item, index) in list" :key="index" class="van_item" @click="noticeItemClick(item)">
            <div v-if="decodeURI(item.title).length < 17" class="pop_title flex ai-c jc-c" v-html="decodeURI(item.title)" />
            <van-notice-bar v-else class="tit_marque">
              <template #default>
                {{ decodeURI(item.title) }}
              </template>
            </van-notice-bar>
            <div class="text_content" v-html="decodeURI(item.content)" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="flex_btn flex jc-c ai-c">
        <!-- <div v-if="!token" class="addmore_btn" @click="goTo('/entry/login')">
          确定
        </div> -->
        <div class="addmore_btn" @click="closePop">
          我知道了
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/banner_swiper.scss';

.flex_btn {
  background: #FFFFFF;
  margin-top: -2px;
}
.tit_marque{
  width: 100%;
  text-align: center;
  line-height: 30px;
  height: 30px;
  color: #ffffff;
  background: linear-gradient(90deg, #95AEFF 0%, #7695FB 49%, #597EF8 100%);
  font-size: 12px;
  // padding: 0 ;
}
.no_token{
  padding-top: 10px;
  height: 240px;
  width: 260px;
  text-align: center;
  background: #FFFFFF;
}
.bannerWarp {
  width: 258px;
  height:270px;
  text-align: center;

  .bannerSwipe {
    &:deep(.van-swipe__indicators) {
      bottom: 4.5px
    }
    .van_item {
    padding: 0 ;
    background: #fff;
  }
    .text_content {
      width: 99%;
      padding: 10px 10px 10px 10px;
      height: 220px;
      background:#ffffff;
    }
  }
}
.noticeBarWarp {
  width: 100%;
  min-height: 25px;
  padding: 3px 12.5px;
  background-color: #fff;

  .noticeBarMain {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 2.5px 5px;
    background: linear-gradient(180deg, #FFFFFF 0%, #E2E6FB 50%, #FFFFFF 100%);
    box-shadow: 0px 1px 3px 0px rgba(189,200,241,0.82);
    border-radius: 8px;

    img {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 6px;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }

    .noticeBar {
      width: 100%;
      height: 100%;
      padding: 0;
      background-color: transparent;

      :deep(.van-notice-bar__content) {
        line-height: 15px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #696969;
      }
    }
  }
}
  :deep(.van-popup){
    background: transparent !important;
  }
</style>
