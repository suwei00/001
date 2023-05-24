<script setup lang="ts" name="hot">
import maintainImg from '@images/common/maintain.png?preset=full'
import lotteryImg from '@images/hot/hot-lottery.png?preset=full'
import liveImg from '@images/hot/hot-live.png?preset=full'
import sportImg from '@images/hot/hot-sport.png?preset=full'
import chessImg from '@images/hot/hot-chess.png?preset=full'
import egameImg from '@images/hot/hot-egame.png?preset=full'
import fishImg from '@images/hot/hot-fish.png?preset=full'
import lotteryThumb from '@images/hot/hot-lottery.png?preset=thumbnail&src'
import liveThumb from '@images/hot/hot-live.png?preset=thumbnail&src'
import sportThumb from '@images/hot/hot-sport.png?preset=thumbnail&src'
import chessThumb from '@images/hot/hot-chess.png?preset=thumbnail&src'
import egameThumb from '@images/hot/hot-egame.png?preset=thumbnail&src'
import fishThumb from '@images/hot/hot-fish.png?preset=thumbnail&src'

const LOGIN_VIDEO_URL = 'https://jy-prod.obs.cn-south-1.myhuaweicloud.com/jy/m3u8/hot.m3u8'
const { videoRef } = useM3u8(LOGIN_VIDEO_URL)
const appStore = useAppStore()
const list = [{
  id: '8840968486572375835',
  src: lotteryImg,
  thumb: lotteryThumb,
}, {
  id: '2658175169982643138',
  src: liveImg,
  thumb: liveThumb,

}, {
  id: '16564048178345',
  src: sportImg,
  thumb: sportThumb,
}, {
  id: '16622699564720',
  src: chessImg,
  thumb: chessThumb,
}, {
  id: '6861705028422769039',
  src: egameImg,
  thumb: egameThumb,
}, {
  id: '44196810703047',
  src: fishImg,
  thumb: fishThumb,
}]
// 生成维护中的游戏列表
const maintenanceList = $computed(() => {
  return list.map((item) => {
    const game = appStore.getGameById(item.id)
    console.log('🚀 ~ file: index.vue ~ line 49 ~ returnlist.map ~ game', game)
    return {
      ...item,
      ...game,
    }
  })
})
const { launch } = useLaunch()
</script>

<template>
  <div class="hot">
    <video ref="videoRef" class="bg-video" loop muted autoplay />
    <ul class="list">
      <li v-for="item in maintenanceList" :key="item.id" class="img">
        <jl-image w-200px h-480px :src="item.src" :thumb="item.thumb" @click="launch(item.id)" />
        <div v-if="item.maintained !== 1" class="maintain-box" @click.stop>
          <div class="maintain">
            <img :src="getSupportImage(maintainImg)" alt="">
            <span>场馆维护中⋯</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.hot {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.bg-video {
  width: 100%;
  object-fit: fill;
}

.list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);
  width: 1247.42px;
  display: flex;
  justify-content: space-between;
  perspective: 1000px;

  .img {
    height: 480px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 20px 1px #577bff4d;
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease;

    &:nth-of-type(1),
    &:nth-of-type(6) {
      margin-top: 22px;
    }

    &:nth-of-type(2),
    &:nth-of-type(5) {
      margin-top: 6px;
    }

    &:nth-of-type(3),
    &:nth-of-type(4) {}

    &:nth-of-type(1) {
      transform: rotateY(55deg);
    }

    &:nth-of-type(2) {
      transform: rotateY(30deg);
    }

    &:nth-of-type(3) {
      transform: rotateY(10deg);
    }

    &:nth-of-type(4) {
      transform: rotateY(-10deg);
    }

    &:nth-of-type(5) {
      transform: rotateY(-30deg);
    }

    &:nth-of-type(6) {
      transform: rotateY(-55deg);
    }
    &:hover{
      scale: 1.03;
    }

  }
}
.maintain-box{
  position: absolute;
  top:0;
  left: 0;
  width: 199.24px;
  height: 480px;
  background-color:hsla(0, 0%, 100%, 0.35) ;
  .maintain {
  position: absolute;
  top: 152px;
  left: 10px;
  width: 180px;
  height: 180px;
  background: linear-gradient(180deg, rgba(51, 51, 51, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
  box-shadow: 0px 0px 20px 1px rgba(86, 122, 254, 0.6);
  border: 2px solid #96AEFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  user-select: none;
  z-index: 1998;
  cursor: not-allowed;

  img {
    width: 97px !important;
    height: 86.73px !important;
    margin-bottom: 14px;
  }

  span {
    width: 113px;
    height: 30px;
    border: 1px solid #fff;
    line-height: 28px;
    border-radius: 50px;
    font-size: 15px;
    color: #FFFFFF;
    text-shadow: 0px 3px 6px rgba(86, 122, 254, 0.6);
  }
}
}
</style>

<route lang="yaml">
meta:
  layout: main
  key: hot
</route>
