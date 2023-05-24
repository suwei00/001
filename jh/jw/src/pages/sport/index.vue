<script setup lang="ts" name="sport">
import maintainImg from '@images/common/maintain.png?preset=full'
import bg from '@images/sport/bg.png?preset=full'
import logoBg from '@images/common/logo-bg1.png?preset=full'
import logoBg2 from '@images/common/logo-bg2.png?preset=full'
import btnBg from '@images/common/btn.png?preset=full'
// im
import imTitle from '@images/sport/im/title.png?preset=full'
import im1 from '@images/sport/im-logo1.png?preset=full'
import im2 from '@images/sport/im-logo2.png?preset=full'
// saba
import sabaTitle from '@images/sport/saba/title.png?preset=full'
import saba1 from '@images/sport/saba-logo1.png?preset=full'
import saba2 from '@images/sport/saba-logo2.png?preset=full'
// fb
import fbTitle from '@images/sport/fb/title.png?preset=full'
import fb1 from '@images/sport/fb-logo1.png?preset=full'
import fb2 from '@images/sport/fb-logo2.png?preset=full'

// 小游戏列表
import soccer from '@images/sport/soccer.png?preset=full'
import basketball from '@images/sport/basketball.png?preset=full'
import football from '@images/sport/football.png?preset=full'
import race from '@images/sport/race.png?preset=full'
import iceball from '@images/sport/iceball.png?preset=full'
import tennis from '@images/sport/tennis.png?preset=full'
import ppball from '@images/sport/ppball.png?preset=full'
import volleyball from '@images/sport/volleyball.png?preset=full'
import baseball from '@images/sport/baseball.png?preset=full'
import badminton from '@images/sport/badminton.png?preset=full'
import snooker from '@images/sport/snooker.png?preset=full'

const venue: { [text: string]: any } = {
  im: {
    name: 'im',
    title: imTitle,
    logo1: im1,
    logo2: im2,
    gameList: [
      { name: '足球', src: soccer, w: '29px', h: '29px', mr: '34px' },
      { name: '篮球', src: basketball, w: '29px', h: '29px', mr: '24px' },
      { name: '美式足球', src: football, w: '31.54px', h: '27px', mr: '23px' },
      { name: '赛车', src: race, w: '29.98px', h: '28.34px', mr: '34px' },
      { name: '冰球', src: iceball, w: '30.97px', h: '33.45px' },
    ],
    des: '创新功能提前兑现，无需等待即可提前结算，止损机制让您百无禁忌！业界赔率最佳、赛事最全，提供视频直播、专业体育数据统计，下半场波胆、让球等多元新玩法，满足对体育赛事的一切需求！',
  },
  saba: {
    name: 'saba',
    title: sabaTitle,
    logo1: saba1,
    logo2: saba2,
    gameList: [
      { name: '足球', src: soccer, w: '29px', h: '29px', mr: '34px' },
      { name: '篮球', src: basketball, w: '29px', h: '29px', mr: '36px' },
      { name: '网球', src: tennis, w: '29px', h: '29px', mr: '30px' },
      { name: '乒乓球', src: ppball, w: '28.85px', h: '29.09px', mr: '30px' },
      { name: '排球', src: volleyball, w: '29.16px', h: '29.15px' },
    ],
    des: '亚洲市场独创让球盘和专业的大小盘，数十种全新玩法，拥有市场上最大的彩池。同时提供最灵活的实时结算和赛中提现玩法，满足玩家对瞬息万变赛事的掌控度。',
  },
  fb: {
    name: 'fb',
    title: fbTitle,
    logo1: fb1,
    logo2: fb2,
    gameList: [
      { name: '足球', src: soccer, w: '29px', h: '29px', mr: '34px' },
      { name: '篮球', src: basketball, w: '29px', h: '29px', mr: '36px' },
      { name: '棒球', src: baseball, w: '28.99px', h: '28.99px', mr: '30px' },
      { name: '羽毛球', src: badminton, w: '29.26px', h: '29.24px', mr: '25px' },
      { name: '斯诺克', src: snooker, w: '29.03px', h: '29.03px' },
    ],
    des: '运动类型覆盖，提供赛事超过5万场，用户可自定义投注金额以及投注赔率，预约投注与提前结算功能，强大的结算引擎，实时扫描可结算玩法和盘口，给您非同一般的享受！',
  },
}
const brandList = [
  {
    name: 'im', id: '16564048178345',
  },
  {
    name: 'saba', id: '362857114342923387',
  },
  {
    name: 'fb', id: '16564045359195',
  },
]
const { handleSwitch, launch, id, game, currentVenue, desc, sortedBrandList, hoverHandler, leaveHandler } = $(useGame('sport', brandList, venue))
</script>

<template>
  <div :style="getBackgroundImgObj(bg)" class="sport">
    <div class="content">
      <sport-im v-show="game === 'im'" />
      <sport-saba v-show="game === 'saba'" />
      <sport-fb v-show="game === 'fb'" />
      <div class="venue">
        <div class="right">
          <img
            v-for="brand in brandList" v-show="game === brand.name" :key="brand.name"
            :src="getSupportImage(venue[brand.name].title)" alt="" class="title"
          >
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
                :style="getBackgroundImgObj(brand.name === game ? logoBg : logoBg2)"
                class="brand-box"
                @mouseenter="hoverHandler(brand, $event)"
                @mouseleave="leaveHandler(brand, $event)"
              >
                <img v-if="brand.maintained === 1" :src="getSupportImage(brand.name === game ? currentVenue.logo1 : venue[brand.name].logo2)" alt="">
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

.sport {
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
    padding-top: 107px;
    padding-left: 47px;
    position: relative;

    .title {
      width: auto;
      height: 100px;
      margin-bottom: 7px;
      margin-left: -9px;
    }

    p {
      width: 556px;
      height: 72px;
      text-align: left;
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
  key: sport
</route>
