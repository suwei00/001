<script setup lang="ts" name="chess">
import maintainImg from '@images/common/maintain.png?preset=full'
import bg from '@images/chess/bg.png?preset=full'
import logoBg from '@images/common/logo-bg1.png?preset=full'
import logoBg2 from '@images/common/logo-bg2.png?preset=full'
import btnBg from '@images/common/btn.png?preset=full'
// ky
import kyTitle from '@images/chess/ky/title.png?preset=full'
import ky1 from '@images/chess/ky-logo1.png?preset=full'
import ky2 from '@images/chess/ky-logo2.png?preset=full'
// sy
import syTitle from '@images/chess/sy/title.png?preset=full'
import sy1 from '@images/chess/sy-logo1.png?preset=full'
import sy2 from '@images/chess/sy-logo2.png?preset=full'
// kx
import kxTitle from '@images/chess/kx/title.png?preset=full'
import kx1 from '@images/chess/kx-logo1.png?preset=full'
import kx2 from '@images/chess/kx-logo2.png?preset=full'

// 小游戏列表
import yzlh from '@images/chess/yzlh.png?preset=full'
import qznn from '@images/chess/qznn.png?preset=full'
import sss from '@images/chess/sss.png?preset=full'
import ddz from '@images/chess/ddz.png?preset=full'
import xywz from '@images/chess/xywz.png?preset=full'
import sangong from '@images/chess/sangong.png?preset=full'
import erbagang from '@images/chess/erbagang.png?preset=full'
import puke from '@images/chess/puke.png?preset=full'
import lhd from '@images/chess/lhd.png?preset=full'
import majiang from '@images/chess/majiang.png?preset=full'
import qzpj from '@images/chess/qzpj.png?preset=full'
import zjh from '@images/chess/zjh.png?preset=full'
import hlby from '@images/chess/hlby.png?preset=full'
import hhdz from '@images/chess/hhdz.png?preset=full'
import brnn from '@images/chess/brnn.png?preset=full'

const venue: { [text: string]: any } = {
  ky: {
    name: 'ky',
    title: kyTitle,
    logo1: ky1,
    logo2: ky2,
    gameList: [
      { name: '压庄龙虎', src: yzlh, mr: '12px' },
      { name: '抢庄牛牛', src: qznn, mr: '19px' },
      { name: '十三水', src: sss, mr: '25px' },
      { name: '斗地主', src: ddz, mr: '18px' },
      { name: '幸运五张', src: xywz },
    ],
    des: '娱乐休闲新玩法在线抢红包，十人对战血战到底；牛牛、骰宝、龙虎斗，万人对战尽显刺激！',
  },
  sy: {
    name: 'sy',
    title: syTitle,
    logo1: sy1,
    logo2: sy2,
    gameList: [
      { name: '三公', src: sangong },
      { name: '二八杠', src: erbagang },
      { name: '扑克', src: puke },
      { name: '龙虎斗', src: lhd },
      { name: '麻将', src: majiang },
    ],
    des: '超高清游戏场景，超多刺激场次玩法，还有真人荷官在线发牌。全新的红包棋牌玩法，奖品特多。经典的三张牌玩法，支持千人在线PK!与来自五湖四海的朋友来一场刺激对决!',
  },
  kx: {
    name: 'kx',
    title: kxTitle,
    logo1: kx1,
    logo2: kx2,
    gameList: [
      { name: '抢庄牌九', src: qzpj, mr: '19px' },
      { name: '炸金花', src: zjh, mr: '18px' },
      { name: '欢乐捕鱼', src: hlby, mr: '12px' },
      { name: '红黑大战', src: hhdz, mr: '12px' },
      { name: '百人牛牛', src: brnn },
    ],
    des: '国际市场上唯一融合科技感结合二次元拟真立体特效。上线即送多重奖励。全新的社交系统，支持语音在线聊天，边打牌边互动，玩牌交友两不误哦！',
  },
}
const brandList = [
  { name: 'ky', id: '16622699564720' },
  { name: 'sy', id: '16622151295118' },
  { name: 'kx', id: '16621850947387' },
]
const { handleSwitch, launch, id, game, currentVenue, titleImg, desc, sortedBrandList, hoverHandler, leaveHandler } = $(useGame('chess', brandList, venue))
</script>

<template>
  <div :style="getBackgroundImgObj(bg)" class="chess">
    <div class="content">
      <chess-ky v-show="game === 'ky'" />
      <chess-sy v-show="game === 'sy'" />
      <chess-kx v-show="game === 'kx'" />
      <div class="venue">
        <div class="right">
          <img :src="getSupportImage(titleImg)" alt="" class="title">
          <p>{{ desc }}</p>
          <!-- 小游戏列表 -->
          <ul v-for="brand in brandList" v-show="brand.name === game" :key="brand.id" class="game-list" :class="[brand.name]">
            <li v-for="(img, index) in venue[brand.name].gameList" :key="index" :style="{ marginRight: img.mr ?? '30px' }">
              <div class="img-box">
                <img :src="getSupportImage(img.src)" alt="" w-36px h-36px>
              </div>
              <span>{{ img.name }}</span>
            </li>
          </ul>
          <!-- 切换场馆 -->
          <ul class="brand-list">
            <li
              v-for="(brand, index) in sortedBrandList" :key="index"
              mr-20px mb-20px @click="handleSwitch(index)"
            >
              <div
                :style="getBackgroundImgObj(brand.name === game ? logoBg : logoBg2)" class="brand-box"
                @mouseenter="hoverHandler(brand, $event)" @mouseleave="leaveHandler(brand, $event)"
              >
                <img
                  v-if="brand.maintained === 1"
                  :src="getSupportImage(brand.name === game ? currentVenue.logo1 : venue[brand.name].logo2)" alt=""
                >
                <img v-if="brand.maintained === 1" class="brand2" :src="getSupportImage(venue[brand.name].logo1)">
                <div v-if="brand.maintained !== 1" class="maintain" @click.stop>
                  <img :src="getSupportImage(maintainImg)" alt="">
                  <span>场馆维护中⋯</span>
                </div>
              </div>
            </li>
          </ul>
          <button :style="getBackgroundImgObj(btnBg)" @click="launch(id)">
            进入游戏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include fade;

.chess {
  width: 100%;
  background-size: 100% 100%;
  padding-top: 40px;
}

.content {
  width: 1520px;
  margin: 0 auto;
  position: relative;
}

.venue {
  position: absolute;
  right: 0;
  top: 0;

  .right {
    width: 760px;
    height: 760px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 98px;
    padding-left: 47px;
    position: relative;

    .title {
      width: auto;
      height: 100px;
      margin-bottom: 7px;
      margin-left: -10px;
    }

    p {
      width: 556px;
      height: 55px;
      text-align: left;
      margin-bottom: 18px;
      font-size: 15px;
      line-height: 17px;
      color: #464B55;
    }

    .game-list {
      display: flex;
      margin-bottom: 23px;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-box {
          height: 29.79px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 11px;
        }

        span {
          font-size: 13px;
          font-family: $jl-font;
          font-weight: 400;
          color: #597EF7;
        }
      }
    }

    .brand-list {
      width: 385px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 16px;

      .brand-box {
        width: 76px;
        height: 76px;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 3px 20px 1px rgba(86, 122, 254, 0.3);
        border-radius: 20px;
        cursor: pointer;
        position: relative;
        transition: all 0.5s ease;

        img {
          width: 60px;
          height: 60px;
        }
        .brand2{
          position: absolute;
          opacity: 0;
          transition: all 0.5s ease;
        }
        &:hover{
          .brand2{
            opacity: 1;
          }
        }
      }
    }

    button {
      width: 180px;
      height: 52px;
      font-size: 18px;
      font-family: $jl-font;
      font-weight: 400;
      color: #FFFFFF;
      transition: all 0.5s ease;
      box-shadow: 0px 3px 20px 1px rgba(86, 122, 254, 0.3);
      border-radius: 50px;

      &:hover {
        scale: 1.1;
      }
    }
  }
}

.maintain {
  position: absolute;
  top: 0;
  left: 0;
  width: 76px;
  height: 76px;
  background: linear-gradient(180deg, rgba(51, 51, 51, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  box-shadow: 0px 0px 20px 1px rgba(86, 122, 254, 0.6);
  border: 2px solid #96AEFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  user-select: none;
  z-index: 1998;
  cursor: not-allowed;

  img {
    width: 38px !important;
    height: 34.2px !important;
  }

  span {
    font-size: 9px;
    color: #FFFFFF;
    text-shadow: 0px 3px 6px rgba(86, 122, 254, 0.6);
    scale: 0.8;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  key: chess
</route>
