<script lang="ts" setup>
import { Popup, Swipe, SwipeItem } from 'vant'
import popImg from '~/assets/images/home/popj.png?preset=full'
import bgImage from '~/components/bgImage.vue'
import useBackRouter from '~/hooks/routerBackHooks'
import closeImg from '~/assets/images/home/closeMes.png?preset=full'

const { goTo } = useBackRouter()
const { token } = storeToRefs(useUserInfoStore())
const showEmergency = ref(true)
const messageList = ref<any>([])

const onRead = (index: number) => {
  memberMsgReadRequest({
    ts: messageList.value[index].ts,
  }).then((res: any) => {
    if (res.status)
      console.log('已读成功-------——————————')
  })
}

const getEmergency = () => {
  if (!token.value)
    return

  getEmergencyRequest().then((res: any) => {
    if (res.status) {
      if (res.data && res.data.length !== 0) {
        messageList.value = res.data ?? []
        onRead(0)
      }
    }
  })
}
const changeIndex = (index: number) => {
  onRead(index)
}
getEmergency()
// close
const closePop = (item: any) => {
  showEmergency.value = false
}
// gotoDetail
const goToDetail = () => {
  goTo('/my/letter')
}
// 站内信-紧急站内信
</script>

<template>
  <div v-if="messageList.length" class="pop_activity">
    <div class="pop_content">
      <van-popup v-model:show="showEmergency" class="emergency_pop" round>
        <div class="close_icon">
          <bgImage :image="closeImg" class="close_img" @click="closePop" />
        </div>
        <div class="pop_title flex ai-c jc-c">
          <bgImage :image="popImg" class="emergency_img" />
          紧急通知
        </div>
        <div class="bannerWarp">
          
          <van-swipe class="bannerSwipe" :autoplay="10000" @change="changeIndex">
            <van-swipe-item v-for="(item, index) in messageList" :key="index" class="van_item">
              <div class="text_content" v-html="item.content" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="flex_btn flex jc-sb ai-c">
          <div class="know_btn" @click="closePop">
            我知道了
          </div>
          <div class="addmore_btn" @click="goToDetail">
            查看更多
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//banner-swiper
@import '~/styles/banner_swiper.scss';
.flex_btn {
  background: #FFFFFF;
  margin-top: -2px;
}
.text_content {
    height:215px;
  }
.pop_content {
  .van-popup {
    width: 260px;
    height: 342px;
    padding: 0 10px 10px 10px;
  }
  ::v-deep(.van-popup){
    // background: #000 !important;
    background-color: transparent !important;

  }
  .van_item {
    padding:10px 0 10px  10px ;
  }
  .close_img {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 12px;
    height: 12px;
  }

  .emergency_img {
    width: 15px;
    height: 13px;
    text-align: center;
    margin-right: 7px;
  }

  .bannerWarp {
    width: 260px;
    height: 250px;
    background:#ffffff;

    .bannerSwipe {
      &:deep(.van-swipe__indicators) {
        bottom: 4.5px
      }

    }

  }

}
</style>

