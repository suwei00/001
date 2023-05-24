<script setup lang="ts" name="live">
import maintainImg from '@images/common/maintain.png?preset=full'
import bg from '@images/live/bg.png?preset=full'
import logoBg from '@images/common/logo-bg1.png?preset=full'
import logoBg2 from '@images/common/logo-bg2.png?preset=full'
import btnBg from '@images/common/btn.png?preset=full'
// ag
import agTitle from '@images/live/ag/title.png?preset=full'
import ag1 from '@images/live/ag-logo1.png?preset=full'
import ag2 from '@images/live/ag-logo2.png?preset=full'
// bbin
import bbinTitle from '@images/live/bbin/title.png?preset=full'
import bbin1 from '@images/live/bbin-logo1.png?preset=full'
import bbin2 from '@images/live/bbin-logo2.png?preset=full'
// og
import ogTitle from '@images/live/og/title.png?preset=full'
import og1 from '@images/live/og-logo1.png?preset=full'
import og2 from '@images/live/og-logo2.png?preset=full'
// ebet
import ebetTitle from '@images/live/ebet/title.png?preset=full'
import ebet1 from '@images/live/ebet-logo1.png?preset=full'
import ebet2 from '@images/live/ebet-logo2.png?preset=full'
// bg
import bgTitle from '@images/live/bg/title.png?preset=full'
import bg1 from '@images/live/bg-logo1.png?preset=full'
import bg2 from '@images/live/bg-logo2.png?preset=full'
// dg
import dgTitle from '@images/live/dg/title.png?preset=full'
import dg1 from '@images/live/dg-logo1.png?preset=full'
import dg2 from '@images/live/dg-logo2.png?preset=full'
// wm
import wmTitle from '@images/live/wm/title.png?preset=full'
import wm1 from '@images/live/wm-logo1.png?preset=full'
import wm2 from '@images/live/wm-logo2.png?preset=full'
// evo
import evoTitle from '@images/live/evo/title.png?preset=full'
import evo1 from '@images/live/evo-logo1.png?preset=full'
import evo2 from '@images/live/evo-logo2.png?preset=full'

// 小游戏列表
import bjl from '@images/live/bjl.png?preset=full'
import lh from '@images/live/lh.png?preset=full'
import nn from '@images/live/nn.png?preset=full'
import tb from '@images/live/tb.png?preset=full'
import lp from '@images/live/lp.png?preset=full'
import zjh from '@images/live/zjh.png?preset=full'
import d21 from '@images/live/d21.png?preset=full'
// import sg from '@images/live/sg.png?preset=full'
import zrx from '@images/live/zrx.png?preset=full'
// import rng from '@images/live/rng.png?preset=full'

const venue: { [text: string]: any } = {
  ag: {
    name: 'ag',
    title: agTitle,
    logo1: ag1,
    logo2: ag2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px', mr: '30px' },
      { name: '21点', src: d21, w: '28.53px', h: '28.53px' },
    ],
    des: '全球首创6张牌先发、VIP包桌、咪牌百家乐、智控模式百家乐及竞咪互动百家乐、区块链百家乐等多样化游戏，加上全天侯监控管理，为玩家提供稳定而流畅的游戏服务，打造绝佳真人游戏体验！',
  },
  bbin: {
    name: 'bbin',
    title: bbinTitle,
    logo1: bbin1,
    logo2: bbin2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px' },
    ],
    des: '致力于带给会员无与伦比的感官飨宴，不仅提供全高清的游戏画面以及多镜头视图功能，每款游戏更加入多种不同的边注玩法，让会员尽享丰富多元的游玩体验！',
  },
  og: {
    name: 'og',
    logo1: og1,
    title: ogTitle,
    logo2: og2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      // { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px' },
    ],
    des: '超高清视频、完美主播音质等等，通过我们的新聊天室与可爱女主播和性感荷官亲密互动、交个朋友、更近距离接触，给您更真实的娱乐感受！',
  },
  ebet: {
    name: 'ebet',
    title: ebetTitle,
    logo1: ebet1,
    logo2: ebet2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px' },
    ],
    des: '拥有百位训练有素的专业荷官，仿真实的赌场环境、稳定的高端设备，为您呈现奢华百家乐，玩法不重样，让您有亲临现场般的帝王体验！',
  },
  bg: {
    name: 'bg',
    title: bgTitle,
    logo1: bg1,
    logo2: bg2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px' },
    ],
    des: '亚洲最具潜力的真人视讯品牌，采用国际标准的真人游戏摄影棚，全场严密监控，提供您最公平公正的游戏环境。超低延迟，高清视频即时呈现，美艳荷官让您体验亲临现场般的感受！',
  },
  dg: {
    name: 'dg',
    title: dgTitle,
    logo1: dg1,
    logo2: dg2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px' },
    ],
    des: '智控咪牌系统，互动感逼近真实赌场。为了让您享有更具临场感的氛围，除了美女荷官外还有美女直播陪玩，主播时时聊天互动，一起共同探索投注中的各种乐趣！',
  },
  wm: {
    name: 'wm',
    title: wmTitle,
    logo1: wm1,
    logo2: wm2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '30px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '38px' },
      { name: '牛牛', src: nn, w: '25.08px', h: '28.55px', mr: '38px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '36px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '30px' },
      // { name: '炸金花', src: zjh, w: '33.02px', h: '24.82px', mr: '27px' },
      // { name: '三公', src: sg, w: '33.02px', h: '24.82px' },
    ],
    des: '性感真人荷官发牌，高清实时画面一帧不漏！独创真人融合棋牌电游风格，游戏丰富多样，最精致的视觉版面，最专业的路纸呈现，专为亚洲人研发的投注界面，极致操作如同身历其境！',
  },
  evo: {
    name: 'evo',
    title: evoTitle,
    logo1: evo1,
    logo2: evo2,
    gameList: [
      { name: '百家乐', src: bjl, w: '19.55px', h: '26.06px', mr: '40px' },
      { name: '龙虎', src: lh, w: '27.37px', h: '24.82px', mr: '48px' },
      { name: '骰宝', src: tb, w: '25.48px', h: '27.31px', mr: '46px' },
      { name: '轮盘', src: lp, w: '29.79px', h: '29.79px', mr: '47px' },
      { name: '21点', src: d21, w: '28.53px', h: '28.53px', mr: '26px' },
      { name: '真人游戏秀', src: zrx, w: '17.92px', h: '30.73px' },
      // { name: 'RNG单机版', src: rng, w: '19.72px', h: '27.83px' },
    ],
    des: '独家创新玩法，重新定义真人游戏的娱乐性质。特有的真人游戏秀，提供玩家前所未有的在线互动体验。可以与其他玩家在游戏中互动，享受竞赛和获胜的悸动。还有足球厅和RNG单机版等特色游戏，应有尽有！',
  },
}
const brandList = [
  {
    name: 'ag', id: '2658175169982643138',
  },
  { name: 'bbin', id: '16620064156225' },
  {
    name: 'og', id: '16619506806735',
  },
  { name: 'ebet', id: '16619202255312' },
  {
    name: 'bg', id: '16620065466911',
  },
  {
    name: 'dg', id: '39636407564188',
  },
  { name: 'wm', id: '1055235995899664907' },
  {
    name: 'evo', id: '2306856765348772637',
  },
]
const { handleSwitch, launch, id, game, currentVenue, desc, sortedBrandList, hoverHandler, leaveHandler } = $(useGame('live', brandList, venue))
</script>

<template>
  <div :style="getBackgroundImgObj(bg)" class="live">
    <div class="content">
      <live-ag v-show="game === 'ag'" />
      <live-bbin v-show="game === 'bbin'" />
      <live-og v-show="game === 'og'" />
      <live-ebet v-show="game === 'ebet'" />
      <live-bg v-show="game === 'bg'" />
      <live-dg v-show="game === 'dg'" />
      <live-wm v-show="game === 'wm'" />
      <live-evo v-show="game === 'evo'" />
      <div class="venue">
        <div class="right">
          <img v-for="brand in brandList" v-show="game === brand.name" :key="brand.name" :src="getSupportImage(venue[brand.name].title)" alt="" class="title">
          <p>{{ desc }}</p>
          <!-- 小游戏列表 -->
          <ul v-for="brand in brandList" v-show="game === brand.name" :key="brand.id" class="game-list" :class="[brand.name]">
            <li v-for="(img, index) in venue[brand.name].gameList" :key="index" :style="{ marginRight: img.mr ?? '30px' }">
              <div class="img-box">
                <img :src="getSupportImage(img.src)" alt="" :style="{ width: img.w, height: img.h }">
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

.live {
  width: 100%;
  background-size: 100% 100%;
  padding-top: 40px;
}

.content {
  width: 1520px;
  margin: 0 auto;
  position: relative;
  height: 760px;
}

.venue {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;

  .right {
    width: 760px;
    height: 760px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 107px;
    padding-left: 47px;
    position: relative;

    .title {
      width: auto;
      height: 100px;
      margin-left: -10px;
      margin-bottom: 7px;
    }

    p {
      width: 556px;
      height: 72px;
      padding-left: 5px;
      text-align: left;
      font-size: 15px;
      line-height: 17px;
      color: #464B55;
    }

    .game-list {
      display: flex;
      margin-bottom: 23px;
      margin-left: 5px;
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
      &:hover{
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
  key: live
</route>
