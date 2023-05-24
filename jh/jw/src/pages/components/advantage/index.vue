<script setup lang='ts' name='advantage'>
import icon1 from '@images/home/advantage/icon-1.png?preset=full'
import icon2 from '@images/home/advantage/icon-2.png?preset=full'
import icon3 from '@images/home/advantage/icon-3.png?preset=full'
import icon4 from '@images/home/advantage/icon-4.png?preset=full'
// 这一批gif转webp体积增大，所以不进行转换
import animate1 from '@images/home/advantage/animate1.gif'
import animate2 from '@images/home/advantage/animate2.gif'
import animate3 from '@images/home/advantage/animate3.gif'
import animate4 from '@images/home/advantage/animate4.gif'
import advantageItemBg from '@images/home/advantage/advantage-item.png?preset=full'

// 提前加载彩票loading
import loadingAvi from '@images/cglottery/loading.jpg.avif'
import loadingWebp from '@images/cglottery/loading.jpg.webp'
import loadingJpg from '@images/cglottery/loading.jpg'

const target = ref()
let visible = $ref(false)
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      visible = true
      stop()
    }
  },
  { rootMargin: '0px 0px -250px 0px' },
)

const list = [{
  name: '平均充值时间',
  time: 60,
  img: icon1,
  animate: animate1,
  title: '更快速',
  desc: ' 采用最新技术自主研发的财务处理系统，真正做到极速充值、提现。独家网络技术，为您提供一流的极致游戏体验，畅快投注不延迟！',
}, {
  name: '平均提现时间',
  time: 90,
  img: icon2,
  animate: animate2,
  title: '更安全',
  desc: ' 独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最全面的安全保障，让您尽情娱乐，无后顾之忧！',
}, {
  name: '合作支付平台',
  time: 80,
  img: icon3,
  animate: animate4,
  title: '更专业',
  desc: ' 丰富多元的游戏种类，有彩票、真人、体育、棋牌、电子、捕鱼、电竞等多种娱乐方式供您选择，让您拥有绝佳游戏体验！',
}, {
  name: '合作游戏平台',
  time: 20,
  img: icon4,
  animate: animate3,
  title: '更便捷',
  desc: ' 引领市场的卓越技术，自主研发全套终端应用，让您畅享Web、H5，更有iOS、Android APP，为您提供最精致的娱乐投注体验！',
}]
</script>

<template>
  <div ref="target" class="advantage" mt-600px>
    <div class="title-wrapper">
      <card-title title="服务优势" sub-title="久赢全心全力为您提供最优质的服务" />
    </div>
    <transition appear name="slide-up">
      <div v-if="visible" class="card-list">
        <div v-for="item in list" :key="item.title" class="item">
          <div class="progress">
            <div class="svg-wrapper">
              <jl-image :src="item.animate" w-100px h-100px :lazy="false" />
            </div>
            <div class="title">
              {{ item.name }}
            </div>
          </div>
          <div :style="getBackgroundImgObj(advantageItemBg)" class="card">
            <img v-src="item.img" loading="lazy" class="icon">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <picture>
      <source :srcset="loadingAvi" type="image/avif">
      <source :srcset="loadingWebp" type="image/webp">
      <img :src="loadingJpg" alt="list" style="width:0;height:0">
    </picture>
  </div>
</template>

<style lang="scss" scoped>
.advantage {

  padding-top: 55px;
  padding-bottom: 100px;
  width: 1300px;
  margin: 0 auto;

  .title-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 26px;
  }

  .card-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {

      .progress {
        display: flex;
        flex-direction: column;
        align-items: center;

        .svg-wrapper {
          svg {
            width: 113px;
            height: 113px;
          }
        }

        .title {
          color: $text-primary;
          font-family: $jl-font;
          font-weight: bold;
          font-size: 18px;
          line-height: 25px;
          padding-top: 14px;
          padding-bottom: 30px;
        }
      }

      .card {
        width: 310px;
        height: 338px;
        background-size: contain;
        background-repeat: no-repeat;
        padding: 40px 40px 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $text-primary;
        box-shadow: 0px 3px 12px 1px rgba(86, 122, 254, 0.3);
        border-radius: 20px;
        transition: all 0.5s ease;
        &:hover{
          transform: translateY(-10px);
        }

        .icon {
          background-repeat: no-repeat;
          width: 100px;
          height: 100px;
          background-size: contain;
        }

        .title {
          font-family: $jl-font;
          font-size: 24px;
          padding: 22px 0 16px;
          font-weight: bold;
        }

        .desc {
          font-size: 13px;
          line-height: 20px;
          text-align: left;
        }
      }
    }

  }

  @include transition-slide-up($distance: 100%)
}
</style>
