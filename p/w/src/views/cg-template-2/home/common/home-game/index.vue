<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
const router = useRouter();
const bigGameList = [
  { id: '39636407564188', path: '/venue/2', name: 'CASINO' },
  { id: '362857114342923387', path: '/venue/6', name: 'THỂ THAO' },
  { id: '8840968486572375835', path: '/venue/5', name: 'LÔ ĐỀ' }
];

const smallGameList = [
  { id: '6861705028422769039', path: '/subclass/4', name: 'NỔ HŨ' },
  { id: '41465988833800', path: '/subclass/7', name: 'GAME BÀI' },
  { id: '44196810703047', path: '/subclass/3', name: 'BẮN CÁ' },
  { id: '16754997519210', path: '/cockfighting', name: 'ĐÁ GÀ' },
  { id: '16564048344271', path: '/venue/8', name: 'E-SPORTS' }
];

const goGame = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="good_game">
    <div class="flex jc-sb ai-c mb30">
      <cg-icon width="450" name="i_title3" />
      <div class="flex-middle fdr-c">
        <p class="font32">GAME CỰC CHẤT</p>
        <p class="font15">GAME CỰC HOT, CHƠI CỰC ĐỈNH</p>
      </div>
      <cg-icon class="rotate" width="450" name="i_title3" />
    </div>
    <div class="flex jc-sb ai-c mb25">
      <div class="big_item pointer" v-for="item in bigGameList" :key="item.id" @click="goGame(item.path)">
        <div class="item_cont">
          <app-image class="item_bj" :src="`/home/big_bj_${item.id}.png`" />
          <div class="item_but font24 flex-middle">{{ item.name }}</div>
        </div>
        <div class="figure_cont">
          <app-image class="figure" :src="`/home/figure_${item.id}.png`" />
        </div>
      </div>
    </div>
    <div class="flex jc-sb ai-c">
      <div class="small_item pointer" v-for="item in smallGameList" :key="item.id" @click="goGame(item.path)">
        <div class="item_cont">
          <app-image class="item_bj" :src="`/home/small_bj_${item.id}.png`" />
          <div class="item_but font24 flex-middle">{{ item.name }}</div>
        </div>
        <app-image class="figure" :src="`/home/subclass${item.id}.png`" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mb30 {
  margin-bottom: 30px;
}

.mb25 {
  margin-bottom: 25px;
}
.big_item {
  position: relative;
  width: 386px;
  height: 225px;
  @include webp($base-img-dir + '/home/home_border_big.png');
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  filter: drop-shadow(0px 6px 12px var(--cg-shadow-color1));

  .item_cont {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 10px;
    width: 382px;
    height: 218px;
    overflow: hidden;
    .item_bj {
      width: 100%;
      height: 100%;
      transition: transform 0.3s;
    }

    .item_but {
      position: absolute;
      @include webp($base-img-dir + '/home/home_but.png');
      background-size: cover;
      background-position: center;
      width: 382px;
      height: 50px;
      z-index: 9;
      left: 0;
      bottom: 0;
      &:active {
        transform: scale(0.99);
      }
    }
  }

  .figure {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: transform 0.3s;
  }

  &:hover {
    transform: translateY(-10px);

    .item_bj,
    .figure {
      transform: scale(1.1);
    }
  }
}

.small_item {
  position: relative;
  width: 224px;
  height: 234px;
  @include webp($base-img-dir + '/home/home_border_small.png');
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  filter: drop-shadow(0px 6px 12px var(--cg-shadow-color1));

  .item_cont {
    position: absolute;
    top: 11px;
    left: 2px;
    border-radius: 10px;
    width: 220px;
    height: 220px;
    overflow: hidden;
    .item_bj {
      width: 100%;
      height: 100%;
      transition: transform 0.3s;
    }

    .item_but {
      position: absolute;
      @include webp($base-img-dir + '/home/home_but_s.png');
      background-size: cover;
      background-position: center;
      width: 220px;
      height: 50px;
      z-index: 9;
      left: 0;
      bottom: 0;
      &:active {
        transform: scale(0.99);
      }
    }
  }

  .figure {
    position: relative;
    left: 0;
    bottom: 0px;
    width: 100%;
    transition: transform 0.3s;
  }

  &:hover {
    transform: translateY(-10px);
    .figure {
      transform: translateY(-10px);
    }

    .item_bj {
      transform: scale(1.1);
    }
  }
}

.figure_cont {
  position: absolute;
  width: 100%;
  margin: 0 2px;
  overflow: hidden;
  height: 240px;
  bottom: 20px;
}
</style>
