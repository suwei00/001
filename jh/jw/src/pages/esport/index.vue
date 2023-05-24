<script setup lang="ts" name="esport">
import maintainImg from '@images/common/maintain.png?preset=full'
import logoBg from '@images/common/logo-bg1.png?preset=full'
import logoBg2 from '@images/common/logo-bg2.png?preset=full'
import btnBg from '@images/common/btn.png?preset=full'
// im
import imbg from '@images/esport/im-bg.png?preset=full'
import imbgThumb from '@images/esport/im-bg.png?preset=thumbnail&src'
import imTitle from '@images/esport/im-title.png?preset=full'
import imList from '@images/esport/im-list.png?preset=full'
import im1 from '@images/esport/im-logo1.png?preset=full'
import im2 from '@images/esport/im-logo2.png?preset=full'
// saba
import sababg from '@images/esport/saba-bg.png?preset=full'
import sababgThumb from '@images/esport/saba-bg.png?preset=thumbnail&src'
import sabaTitle from '@images/esport/saba-title.png?preset=full'
import sabaList from '@images/esport/saba-list.png?preset=full'
import saba1 from '@images/esport/saba-logo1.png?preset=full'
import saba2 from '@images/esport/saba-logo2.png?preset=full'

const venue: { [text: string]: any } = {
  im: {
    name: 'im',
    bg: imbg,
    bgThumb: imbgThumb,
    title: imTitle,
    list: imList,
    logo1: im1,
    logo2: im2,
    des: '每日提供上百场电竞赛事，结算快捷、玩法多元、最专业竞猜玩法，赛事直播让您分秒精彩。盘内赛事分析、数据统计、实时更新的战况记录，使您运筹帷幄之中决胜千里之外！',
  },
  saba: {
    name: 'saba',
    bg: sababg,
    bgThumb: sababgThumb,
    title: sabaTitle,
    list: sabaList,
    logo1: saba1,
    logo2: saba2,
    des: '接轨新世代电竞玩法！开创专属电竞玩家的操作模式与界面，以及更人性化的赛事筛选器，让您更快速的找寻到心目中的电竞赛事！',
  },
}
const brandList = [
  {
    name: 'im', id: '16564048344271',
  },
  { name: 'saba', id: '45228933360695' },
]
const { handleSwitch, launch, id, game, currentVenue, desc, sortedBrandList, hoverHandler, leaveHandler } = $(useGame('esport', brandList, venue))
</script>

<template>
  <div :style="getBackgroundImgObj(currentVenue?.bg)" class="esport">
    <div class="content">
      <esport-im v-show="game === 'im'" />
      <esport-saba v-show="game === 'saba'" />
      <div class="venue">
        <div class="right">
          <img
            v-for="brand in brandList" v-show="game === brand.name" :key="brand.name"
            :src="getSupportImage(venue[brand.name].title)" alt="" class="title"
          >
          <p>{{ desc }}</p>
          <img :src="getSupportImage(currentVenue.list)" alt="" class="list">
          <!-- 切换场馆 -->
          <ul class="brand-list">
            <li
              v-for="(brand, index) in sortedBrandList"
              :key="index" mr-20px @click="handleSwitch(index)"
            >
              <div
                :style="getBackgroundImgObj(brand.name === game ? logoBg : logoBg2)"
                class="brand-box"
                @mouseenter="hoverHandler(brand, $event)"
                @mouseleave="leaveHandler(brand, $event)"
              >
                <img
                  v-if="brand.maintained === 1"
                  :src="getSupportImage(brand.name === game ? currentVenue.logo1 : venue[brand.name].logo2)"
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

.esport {
  width: 100%;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
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
    padding-top: 108px;
    position: relative;

    .title {
      width: auto;
      height: 100px;
      margin-bottom: 7px;
      margin-left: -12px;
    }

    .list {
      height: 60px;
      width: auto;
      margin-bottom: 25px;
    }

    p {
      width: 556px;
      height: 72px;
      text-align: left;
      font-size: 15px;
      line-height: 17px;
      color: #464B55;
    }

    .brand-list {
      width: 385px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 38px;

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
        transition: all 0.5s ease;
        position: relative;

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
  key: esport
</route>

