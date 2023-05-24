<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { storeToRefs } from 'pinia'
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
import { useUserInfoStore } from '~/store/userInfo'
// 背景图
import b0 from '~/assets/images/activity/b0.png?preset=full'
import b1 from '~/assets/images/activity/b1.png?preset=full'
import a0 from '~/assets/images/activity/a0.png?preset=full'
import a1 from '~/assets/images/activity/a1.png?preset=full'
import useRouterBack from '~/hooks/routerBackHooks'

const btnGrayOne = `url(${getSupportImage(b0)})`
const btnGrayTwo = `url(${getSupportImage(b1)})`
const btnActiveOne = `url(${getSupportImage(a0)})`
const btnActiveTwo = `url(${getSupportImage(a1)})`
const { isShowHeader } = showHeader()
const route = useRoute()
const { token } = storeToRefs(useUserInfoStore())
const { id } = route.query
const titleImg = ref('')
const h5_content = ref([])// 表格后面的
const title = ref<string>('')// 标题
const tab = ref(['迎新豪礼三重送', '尊宠豪礼三重送'])
const currentIndex = ref<number>(0)
const applyState = ref<any>({})// 活动状态

const urlBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`

console.log(route.query)
// 查看活动申请状态
const getApplyState = () => {
  if (id && token.value) {
    promoApplyStatusRequest({
      id: Number(id),
      flag: 'deposit',
    }).then((res: any) => {
      if (res.status)
        applyState.value = res.data
    })
  }
}
getApplyState()
// 获取详情
const getDetail = () => {
  if (id) {
    promoDetailRequest({
      id: id.toString(),
      flag: 'deposit',
    }).then((res: any) => {
      if (res.status)
        titleImg.value = res.data.static.title_h5
      title.value = res.data.config.title
      h5_content.value = res.data.config.h5_content ?? []// 表格后面的
      console.log(`****title*${title.value}`)
    })
  }
}
getDetail()

const changeIndex = (index: number) => {
  currentIndex.value = index
  console.log(currentIndex.value)
}
// 立即申请
const getNow = () => {
  if (id) {
    promoApplyRequest({
      id: id.toString(),
      flag: 'deposit',
      lv: 1,
      ty: currentIndex.value === 0 ? 'low' : 'high',
      amount: 0,
      bonus_type: '1',
    }).then((res: any) => {
      if (res.status)
        Toast('申请成功')
    })
  }
}
</script>

<template>
  <div class="contentContainer">
    <Header v-if="isShowHeader" :key="title" :title="title" styles="color: #5D75A2;font-size: 17px;font-weight: 600;" />
    <div>
      <div class="titleImg">
        <img loading="lazy" :src="`${urlBase}${titleImg}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
      </div>
      <div class="content">
        <div class="tables">
          <div class="imgbox">
            <img loading="lazy" :src="`${urlBase}${h5_content[0]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
          </div>
          <div class="changeIndex">
            <div v-for="(item, index) in tab" :key="index" :class="currentIndex === index ? 'activeIndex' : ''" @click="changeIndex(index)">
              {{ item }}
            </div>
          </div>
          <div class="bottomImg">
            <div v-if="currentIndex === 0">
              <div class="imgbox">
                <img loading="lazy" :src="`${urlBase}${h5_content[1]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
              </div>
            </div>
            <div v-if="currentIndex === 1">
              <div class="imgbox">
                <img loading="lazy" :src="`${urlBase}${h5_content[2]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
              </div>
            </div>
          </div>
          <div class="imgbox">
            <img loading="lazy" :src="`${urlBase}${h5_content[3]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
          </div>

          <van-button
            v-if="currentIndex === 0"
            class="apply"
            :disabled="(applyState.high1 || applyState.high2 || applyState.high3) || (applyState.low1 && applyState.low2 && applyState.low3) || (token === '')"
            @click="getNow()"
          >
            立即申请
          </van-button>

          <van-button
            v-if="currentIndex === 1"
            class="apply"
            :disabled="(applyState.low1 || applyState.low2 || applyState.low3) || (applyState.high1 && applyState.high2 && applyState.high3) || (token === '')"
            @click="getNow()"
          >
            立即申请
          </van-button>
        </div>
        <div class="imgbox">
          <img loading="lazy" :src="`${urlBase}${h5_content[4]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .contentContainer{
        height: 100%;
        padding-bottom: 20px;
        overflow-y: scroll;
    }
.content{
    padding: 7px 15px ;

    .changeIndex{
        display: flex;
        margin-top: 20px;
        >div{
            flex:1;
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            color: #5D617D;
            font-weight: 500;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
        }
        >div:nth-of-type(1){
            background-image: v-bind(btnGrayOne);
        }
        >div:nth-of-type(2){
          background-image: v-bind(btnGrayTwo);
        }
        >div:nth-of-type(1).activeIndex{
          color: white;
          background-image: v-bind(btnActiveOne) !important;
        }
        >div:nth-of-type(2).activeIndex{
          color: white;
          background-image: v-bind(btnActiveTwo) !important;
        }
    }
  .tables{
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid #DBE3FF;
    padding: 0 13px;
    margin-top: 8px;
    padding-bottom: 80px;
    border-radius: 8px;
    background-color: white;
    background-image: linear-gradient(rgba(224, 232, 254, 0.1), rgba(246, 248, 255, 0.1));

    .apply{
        position: absolute;
        height: 35px;
        width: 145px;
        border-radius: 16px;
        bottom: 22px;
        left: 50%;
        margin-left: -75px;
        font-size: 13px;
        font-weight: 500;
        color: white;
        border-radius: 18px;
        background: linear-gradient(0deg, #5C79FF, #89A5FB);
    }
  }
 .imgbox{
  margin-top: 20px;
    text-align: center;
    img{
        width: 100%;
    }
 }
 .titleImg{
  width: 100%;
 }

}
</style>

