<script setup lang='ts' name="home-games">
import maintainImg from '@images/common/maintain.png?preset=full'
// 彩票
import lotteryImg from '@images/home/games/lottery/lottery.png?preset=full'
import lotteryThumb from '@images/home/games/lottery/lottery.png?preset=thumbnail&src'
import lotteryHover from '@images/home/games/lottery/lottery-hover.gif'
import lotteryHover2 from '@images/home/games/lottery/lottery-hover.webp'
import lotteryBanner from '@images/home/games/lottery/banner.png?preset=full'
import lotteryBThumb from '@images/home/games/lottery/banner.png?preset=thumbnail&src'
import cglottery from '@images/home/games/lottery/cglottery.png?preset=full'
// 真人
import liveImg from '@images/home/games/live/live.png?preset=full'
import liveThumb from '@images/home/games/live/live.png?preset=thumbnail&src'
import liveHover from '@images/home/games/live/live-hover.gif'
import liveHover2 from '@images/home/games/live/live-hover.webp'
import liveBanner from '@images/home/games/live/banner.png?preset=full'
import liveBThumb from '@images/home/games/live/banner.png?preset=thumbnail&src'
import liveAg from '@images/home/games/live/zr-ag.png?preset=full'
import liveBbin from '@images/home/games/live/zr-bbin.png?preset=full'
import liveOg from '@images/home/games/live/zr-og.png?preset=full'
import liveEbet from '@images/home/games/live/zr-ebet.png?preset=full'
import liveBg from '@images/home/games/live/zr-bg.png?preset=full'
import liveDg from '@images/home/games/live/zr-dg.png?preset=full'
import liveWm from '@images/home/games/live/zr-wm.png?preset=full'
import liveEvo from '@images/home/games/live/zr-evo.png?preset=full'
// 体育
import sportImg from '@images/home/games/sport/sport.png?preset=full'
import sportThumb from '@images/home/games/sport/sport.png?preset=thumbnail&src'
import sportHover from '@images/home/games/sport/sport-hover.gif'
import sportHover2 from '@images/home/games/sport/sport-hover.webp'
import sportBanner from '@images/home/games/sport/banner.png?preset=full'
import sportBThumb from '@images/home/games/sport/banner.png?preset=thumbnail&src'
import sportIm from '@images/home/games/sport/ty-im.png?preset=full'
import sportSaba from '@images/home/games/sport/ty-saba.png?preset=full'
import sportFb from '@images/home/games/sport/ty-fb.png?preset=full'
// 棋牌
import chessImg from '@images/home/games/chess/chess.png?preset=full'
import chessThumb from '@images/home/games/chess/chess.png?preset=thumbnail&src'
import chessHover from '@images/home/games/chess/chess-hover.gif'
import chessHover2 from '@images/home/games/chess/chess-hover.webp'
import chessBanner from '@images/home/games/chess/banner.png?preset=full'
import chessBThumb from '@images/home/games/chess/banner.png?preset=thumbnail&src'
import chessKy from '@images/home/games/chess/qp-ky.png?preset=full'
import chessSy from '@images/home/games/chess/qp-sy.png?preset=full'
import chessKx from '@images/home/games/chess/qp-kx.png?preset=full'
// 电子
import egameImg from '@images/home/games/egame/egame.png?preset=full'
import egameThumb from '@images/home/games/egame/egame.png?preset=thumbnail&src'
import egameHover from '@images/home/games/egame/egame-hover.gif'
import egameHover2 from '@images/home/games/egame/egame-hover.webp'
import egameBanner from '@images/home/games/egame/banner.png?preset=full'
import egameBThumb from '@images/home/games/egame/banner.png?preset=thumbnail&src'
import egamePg from '@images/home/games/egame/dz-pg.png?preset=full'
import egameMg from '@images/home/games/egame/dz-mg.png?preset=full'
import egameJdb from '@images/home/games/egame/dz-jdb.png?preset=full'
import egameCq9 from '@images/home/games/egame/dz-cq9.png?preset=full'
import egameBbin from '@images/home/games/egame/dz-bbin.png?preset=full'
// 捕鱼
import fishImg from '@images/home/games/fish/fish.png?preset=full'
import fishThumb from '@images/home/games/fish/fish.png?preset=thumbnail&src'
import fishHover from '@images/home/games/fish/fish-hover.gif'
import fishHover2 from '@images/home/games/fish/fish-hover.webp'
import fishBanner from '@images/home/games/fish/banner.png?preset=full'
import fishBThumb from '@images/home/games/fish/banner.png?preset=thumbnail&src'
import fishJdb from '@images/home/games/fish/by-jdb.png?preset=full'
import fishCq9 from '@images/home/games/fish/by-cq9.png?preset=full'
import fishBg from '@images/home/games/fish/by-bg.png?preset=full'
// 电竞
import esportImg from '@images/home/games/esport/esport.png?preset=full'
import esportThumb from '@images/home/games/esport/esport.png?preset=thumbnail&src'
import esportHover from '@images/home/games/esport/esport-hover.gif'
import esportHover2 from '@images/home/games/esport/esport-hover.webp'
import esportBanner from '@images/home/games/esport/banner.png?preset=full'
import esportBThumb from '@images/home/games/esport/banner.png?preset=thumbnail&src'
import esportIm from '@images/home/games/esport/dj-im.png?preset=full'
import esportSaba from '@images/home/games/esport/dj-saba.png?preset=full'
import type { ImageAttrs } from 'vite-plugin-image-presets'

const appStore = useAppStore()
const { gameTypeList } = $(storeToRefs(appStore))
const { launch } = useLaunch()
interface gameNavType {
  label: string
  img: ImageAttrs[]
  thumb: string
  hover: string
  banner: ImageAttrs[]
  bannerThumb: string
  value: string
  id: number
  list: Array<{ name: string; id: string; img: ImageAttrs[]; w: string; m: string }>
}
const gamesNav: Array<gameNavType> = [{
  label: '彩票',
  img: lotteryImg,
  hover: canUseWebp() ? lotteryHover2 : lotteryHover,
  thumb: lotteryThumb,
  banner: lotteryBanner,
  bannerThumb: lotteryBThumb,
  value: '5',
  id: 5,
  list: [
    { name: 'CG彩票', id: '8840968486572375835', img: cglottery, w: '216px', m: '0px' },
  ],
},
{
  label: '真人',
  img: liveImg,
  hover: canUseWebp() ? liveHover2 : liveHover,
  thumb: liveThumb,
  value: '2',
  id: 2,
  banner: liveBanner,
  bannerThumb: liveBThumb,
  list: [
    { name: 'ag', id: '2658175169982643138', img: liveAg, w: '116px', m: '6px' },
    { name: 'bbin', id: '16620064156225', img: liveBbin, w: '116px', m: '6px' },
    { name: 'og', id: '16619506806735', img: liveOg, w: '116px', m: '6px' },
    { name: 'ebet', id: '16619202255312', img: liveEbet, w: '116px', m: '6px' },
    { name: 'bg', id: '16620065466911', img: liveBg, w: '116px', m: '6px' },
    { name: 'dg', id: '39636407564188', img: liveDg, w: '116px', m: '6px' },
    { name: 'wm', id: '1055235995899664907', img: liveWm, w: '116px', m: '6px' },
    { name: 'evo', id: '2306856765348772637', img: liveEvo, w: '116px', m: '6px' },
  ],
},
{
  label: '体育',
  img: sportImg,
  hover: canUseWebp() ? sportHover2 : sportHover,
  thumb: sportThumb,
  value: '6',
  id: 6,
  banner: sportBanner,
  bannerThumb: sportBThumb,
  list: [
    { name: 'im', id: '16564048178345', img: sportIm, w: '216px', m: '9px' },
    { name: 'saba', id: '362857114342923387', img: sportSaba, w: '216px', m: '9px' },
    { name: 'fb', id: '16564045359195', img: sportFb, w: '216px', m: '9px' },
  ],
},
{
  label: '棋牌',
  img: chessImg,
  hover: canUseWebp() ? chessHover2 : chessHover,
  thumb: chessThumb,
  value: '7',
  id: 7,
  banner: chessBanner,
  bannerThumb: chessBThumb,
  list: [
    { name: 'ky', id: '16622699564720', img: chessKy, w: '216px', m: '9px' },
    { name: 'sy', id: '16622151295118', img: chessSy, w: '216px', m: '9px' },
    { name: 'kx', id: '16621850947387', img: chessKx, w: '216px', m: '9px' },
  ],
},
{
  label: '电子',
  img: egameImg,
  hover: canUseWebp() ? egameHover2 : egameHover,
  thumb: egameThumb,
  value: '4',
  id: 4,
  banner: egameBanner,
  bannerThumb: egameBThumb,
  list: [
    { name: 'pg', id: '6861705028422769039', img: egamePg, w: '175px', m: '9px' },
    { name: 'mg', id: '43495319576432', img: egameMg, w: '175px', m: '9px' },
    { name: 'jdb', id: '46814147030478', img: egameJdb, w: '175px', m: '9px' },
    { name: 'cq9', id: '8318022162827355323', img: egameCq9, w: '175px', m: '9px' },
    { name: 'bbin', id: '16620989317215', img: egameBbin, w: '175px', m: '9px' },
  ],
},
{
  label: '捕鱼',
  img: fishImg,
  hover: canUseWebp() ? fishHover2 : fishHover,
  thumb: fishThumb,
  value: '3',
  id: 3,
  banner: fishBanner,
  bannerThumb: fishBThumb,
  list: [
    { name: 'jdb', id: '44196810703047', img: fishJdb, w: '216px', m: '9px' },
    { name: 'cq9', id: '7426646715018523638', img: fishCq9, w: '216px', m: '9px' },
    { name: 'bg', id: '16620065993782', img: fishBg, w: '216px', m: '9px' },
  ],
},
{
  label: '电竞',
  img: esportImg,
  hover: canUseWebp() ? esportHover2 : esportHover,
  thumb: esportThumb,
  value: '8',
  id: 8,
  banner: esportBanner,
  bannerThumb: esportBThumb,
  list: [
    { name: 'im', id: '16564048344271', img: esportIm, w: '216px', m: '9px' },
    { name: 'saba', id: '45228933360695', img: esportSaba, w: '216px', m: '9px' },
  ],
},
]

// 结合上面的gamesNav数据排序
const nav = $computed(() => cloneDeep(gameTypeList).map((gameTypeItem) => {
  const { l, id } = gameTypeItem
  const currentType = find(gamesNav, { id })!
  const list = map(l, item => merge(item, find(currentType.list, { id: item.id })))
  return merge(gameTypeItem, omit(currentType, ['list']), { l: list })
}))

const selectVal = $ref(0)
const handleGameClick = (item: any) => {
  launch(item.id)
}
</script>

<template>
  <div class="home-games">
    <div class="card-wrapper" mb-28px>
      <card-title title="精彩游戏" sub-title="当下热门游戏，给您极致体验" />
    </div>
    <div class="game-nav">
      <div class="nav" w-169px h-495px>
        <jl-games-tabs key="home-games" v-model="selectVal" :with-icon="true" :list="nav" />
      </div>
      <div class="banner">
        <jl-image
          v-for="(b, i) in gamesNav" v-show="i === selectVal" :key="b.id" :src="b.banner" :thumb="b.bannerThumb"
          w-1128px h-500px
        />
        <ul v-for="(currentNav, index) in nav" v-show="selectVal === index" :key="currentNav.key" class="entry">
          <li
            v-for="(g, i) in currentNav.l" :key="g.id + i" :data-index="i" :style="{ margin: `0 ${g.m}` }"
            @click="handleGameClick(g)"
          >
            <div :style="{ width: g.w, height: '76px' }">
              <img v-src="g.img" loading="lazy" style="width:100%" alt="">
            </div>
            <div v-if="appStore.getGameById(g.id)?.maintained !== 1" class="maintain" @click.stop>
              <img :src="getSupportImage(maintainImg)" alt="">
              <span>场馆维护中⋯</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-games {
  width: 1300px;
  margin: 0 auto;
  padding-top: 55px;

  .card-wrapper {
    display: flex;
    justify-content: center;
  }

  .game-nav {
    display: flex;

    .nav {
      padding-top: 23px;
      margin-right: 5px;
      width: 169px;
      height: 495px;
      background: linear-gradient(180deg, #FFFFFF 0%, #F2F7FB 100%);
      box-shadow: 0px 3px 6px 1px rgba(86, 122, 254, 0.3);
      border-radius: 20px;
      border: 1px solid #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;

      .list {
        li {
          width: 130px;
          height: 52px;
          background-repeat: no-repeat;
          background-size: contain;
          font-size: 18px;
          line-height: 50px;
          display: flex;
          justify-content: center;
          transition: all .3s;
          cursor: pointer;
          display: flex;
          align-items: center;

          &+li {
            margin-top: 16px;
          }

          .icon {
            width: 34px;
            height: 34px;
            background-repeat: no-repeat;
            background-size: contain;
          }

          span {
            color: $color-black-primary;
            line-height: 42px;
            padding-left: 10px;
          }

          &.active {
            span {
              color: #ffff;
            }
          }
        }
      }
    }

    .banner {
      position: relative;

      .entry {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        transition: all .3s;
        li {
          box-shadow: 0px 3px 6px 1px rgba(86, 122, 254, 0.3);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.5s ease;
          position: relative;
          &:hover{
            scale: 1.1;
          }
        }
      }
    }
  }
}
.maintain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(51,51,51,0.2) 0%, rgba(0,0,0,0.4) 100%);
  box-shadow: 0px 0px 20px 1px rgba(86, 122, 254, 0.6);
  border: 2px solid #96AEFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3px;
  user-select: none;
  z-index: 1998;
  cursor: not-allowed;

  img {
    width: 46.94px !important;
    height: 42px !important;
  }

  span {
    font-size: 12px;
    color: #FFFFFF;
    text-shadow: 0px 3px 6px rgba(86, 122, 254, 0.6);
  }
}
</style>
