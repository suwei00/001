<script setup lang="ts">
import { gameStateStore } from '@/store-pinia/game';
import { launchVanue } from '@/utils/gameVenue';
import { merge } from 'lodash';
import { computed } from 'vue';
import { CgMaintain } from '@/components/cg-template-2';
import { storeToRefs } from 'pinia';

const { expandItemList }: any = storeToRefs(gameStateStore());

const serviceList = [
  {
    title: 'GAME BÀI',
    icon: 'hot_game1.png',
    left: '10px',
    key: 'chess',
    id: '41465988833800',
    y: '55',
    opt: { left: '17px', top: '12%' }
  },
  {
    title: 'HÀ NỘI 1 PHÚT',
    icon: 'hot_game2.png',
    key: '',
    play: '48',
    id: '8840968486572375835', // '48'
    wallet: '',
    navIndex: '0',
    type: 'lottery',
    y: '30',
    opt: { left: '214px', top: '4%' }
  },
  {
    title: 'CASINO',
    icon: 'hot_game3.png',
    left: '10px',
    key: 'live',
    id: '39636407564188',
    wallet: 1,
    y: '10',
    opt: { left: '412px' }
  },
  {
    title: 'THỂ THAO',
    icon: 'hot_game4.png',
    key: 'sports',
    id: '362857114342923387',
    wallet: 1,
    y: '-10',
    opt: { right: '412px' }
  },
  {
    title: 'NỔ HŨ',
    icon: 'hot_game5.png',
    key: 'electronic',
    id: '6861705028422769039', // '47'
    y: '-30',
    opt: { right: '214px', top: '4%' }
  },
  {
    title: 'BẮN CÁ',
    icon: 'hot_game6.png',
    key: 'fishing',
    id: '44196810703047',
    y: '-55',
    opt: { right: '17px', top: '12%' }
  }
];

const hotGameList = computed(() => {
  const result = serviceList.map(o => {
    return merge(
      expandItemList?.value.find((item: any) => item.id === o.id),
      o
    );
  });
  return result;
});

const goGame = (item: any) => {
  if (item.navIndex) {
    sessionStorage.setItem('AREA_INDEX', item.navIndex);
  }
  launchVanue({ ...item });
};
</script>
<!-- DOTO -->
<template>
  <div class="hot_main">
    <div class="game-list">
      <ol>
        <li class="pointer" v-for="item in hotGameList" :key="item.id" @click="goGame(item)" :style="{ transform: `rotateY(${item.y}deg)`, ...item.opt }">
          <div class="li-item">
            <div class="item_cont">
              <app-image :src="`/hot/${item.icon}`" class="li-item-size" />
            </div>
          </div>
          <button class="but pointer">
            {{ item.title }}
          </button>
          <div class="hot_drop" v-if="item.maintained === 2">
            <cg-maintain type="hot" :time="item.maintained_end" />
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hot_main {
  width: 100%;
  min-width: 1200px;
  height: 760px;
  @include webp($base-img-dir + '/hot/hot_bj.png');
  background-size: cover;
  background-position: center;

  .game-list {
    width: 100%;
    padding-top: 69px;

    ol {
      width: 1200px;
      height: 450px;
      user-select: none;
      position: relative;
      perspective: 1000px; // 给父盒子添加透视效果，使其具有立体效果
      margin: auto;

      li {
        width: 180px;
        height: 450px;
        cursor: pointer;
        position: absolute;
        top: 0;

        .li-item {
          width: 100%;
          height: 100%;
          @include webp($base-img-dir + '/hot/hot_border.png');
          background-size: 100% 100%;
          padding: 3px;
          padding-bottom: 5px;
          filter: drop-shadow(0px 6px 12px var(--cg-color-grey4));

          .item_cont {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;
          }
          .li-item-size {
            transition: transform 0.2s;
          }
        }

        .but {
          width: 176px;
          height: 65px;
          position: absolute;
          border-radius: 14px;
          overflow: hidden;
          left: 2px;
          bottom: 4px;
          z-index: 1;
          @include webp($base-img-dir + '/hot/hot_but.png');
          background-size: 100% 100%;
          font: var(--cg-font-text3);
          font-weight: bold;
          color: var(--cg-color-grey1);
          &:active {
            transform: scale(0.96);
          }
        }

        transition: transform 0.4s;

        &:hover {
          .li-item .li-item-size {
            transform: scale(1.15);
          }
        }
      }
    }
  }

  .hot_drop {
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border-radius: 12px;
  }
}
</style>
