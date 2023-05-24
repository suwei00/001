<script setup lang="ts">
import { gameStateStore } from '@/store-pinia/game';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { CgButton, CgMaintain } from '@/components/cg-template-2';

import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { launchVanue } from '@/utils/gameVenue';
const route = useRoute();

const gameState = gameStateStore();
const { ganeList } = storeToRefs(gameState);

const routeId = ref(route.params.id);
const activeId = ref();
const currentKey = ref();
const venueType = ref();

const currentList: any = computed(() => {
  const _currentObj: any = ganeList?.value?.find(item => item.id === Number(routeId.value));
  if (_currentObj) {
    venueType.value = _currentObj.type;
    activeId.value = _currentObj.l[0].id;
    return _currentObj.l;
  }
  return [];
});

const handleMouseEnter = (item: any) => {
  if (item.maintained !== 2) {
    currentKey.value = item.id;
  }
};

const handleMouseLeave = () => {
  currentKey.value = null;
};

const current = computed(() => currentList.value.find((item: any) => item.id === activeId.value));

const goGame = () => {
  if (current.value.maintained !== 2) {
    launchVanue({ id: activeId.value, key: activeId.value === '46814147030678' ? 'game' : venueType.value });
  }
};

onBeforeRouteUpdate(to => {
  routeId.value = to.params.id;
  currentKey.value = '';
});
</script>

<template>
  <div class="venue-home" :data="venueType">
    <div :class="`content_${venueType}_${index} ${activeId === item.id ? 'content_active' : ''}`" v-for="(item, index) in currentList" :key="item.id">
      <app-image class="figure" :src="`/venueImg/figure_${item.id}.png`" />
    </div>
    <div class="content">
      <div class="btn_cont">
        <app-image class="venue_title" :src="`/venueImg/venue_title_${activeId}.png`" />
        <ul class="flex ai-c">
          <li v-for="item in currentList" class="venue_item" :key="item.id" @click="activeId = item.id" @mouseenter="handleMouseEnter(item)" @mouseleave="handleMouseLeave()">
            <app-image class="venue_bj" :src="`/venueImg/${(activeId === item.id || currentKey === item.id) && item.maintained !== 2 ? 'venue_active' : 'venue_bj'}.png`" />
            <app-image class="venue_logo" :src="`/venueImg/logo_${item.id}${activeId === item.id || currentKey === item.id ? '_active' : ''}.png`" />
            <cg-maintain type="logo" v-if="item.maintained === 2" :time="item.maintained_end" />
          </li>
        </ul>
        <cg-button shadow blue class="button" :disabled="current?.maintained === 2" @click="goGame">CHƠI NGAY</cg-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.venue-home {
  width: 100%;
  min-width: 1200px;
  height: 760px;
  position: relative;
  user-select: none;
  overflow: hidden;

  @for $i from 0 through 4 {
    .content_video_#{$i} {
      position: absolute;
      width: 100%;
      height: 100%;
      @include webp($base-img-dir + '/venueImg/bg_video' + $i + '.png');
      background-size: cover;
      background-position: 50% 50%;
      transition: all 0.4s;
      display: flex;
      align-items: center;
      justify-content: center;
      .figure {
        position: absolute;
        bottom: 0;
        transform: translateX(100%);
        transition: all 0.4s;
        min-width: 1700px;
        max-width: 1920px;
      }
    }
  }

  @for $i from 0 through 2 {
    .content_sports_#{$i} {
      position: absolute;
      width: 100%;
      height: 100%;
      @include webp($base-img-dir + '/venueImg/bg_sports' + $i + '.png');
      background-size: cover;
      background-position: 50% 50%;
      transition: all 0.4s;
      display: flex;
      align-items: center;
      justify-content: center;
      .figure {
        position: absolute;
        bottom: 0;
        transform: translateX(100%);
        transition: all 0.4s;
        min-width: 1700px;
        max-width: 1920px;
      }
    }
  }

  @for $i from 0 through 2 {
    .content_esports_#{$i} {
      position: absolute;
      width: 100%;
      height: 100%;
      @include webp($base-img-dir + '/venueImg/bg_esports' + $i + '.png');
      background-size: cover;
      background-position: 50% 50%;
      transition: all 0.4s;
      display: flex;
      align-items: center;
      justify-content: center;

      .figure {
        position: absolute;
        bottom: 0;
        transform: translateX(100%);
        transition: all 0.4s;
        min-width: 1700px;
        max-width: 1920px;
      }
    }
  }

  @for $i from 0 through 2 {
    .content_lottery_#{$i} {
      position: absolute;
      width: 100%;
      height: 100%;
      @include webp($base-img-dir + '/venueImg/bg_lottery' + $i + '.png');
      background-size: cover;
      background-position: 50% 50%;
      transition: all 0.4s;
      display: flex;
      align-items: center;
      justify-content: center;

      .figure {
        position: absolute;
        bottom: 0;
        transform: translateX(100%);
        transition: all 0.4s;
        min-width: 1700px;
        max-width: 1920px;
      }
    }
  }

  .content_active {
    z-index: 10;
    .figure {
      transform: translateX(0%);
    }
  }

  .content {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }

  .btn_cont {
    position: absolute;
    top: 185px;
    z-index: 11;

    .venue_title {
      height: 85px;
      margin-bottom: 18px;
    }

    .venue_item {
      position: relative;
      margin-bottom: 28px;
      width: 100px;
      height: 100px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      .venue_bj {
        position: absolute;
        width: 100px;
        height: 100px;
        z-index: 2;
        filter: drop-shadow(var(--cg-shadow-color1) 0px 3px 6px);
      }

      .venue_act_not {
        width: 100px;
        height: 100px;
        filter: none;
      }
      .venue_logo {
        position: absolute;
        z-index: 3;
        width: 80px;
        height: 80px;
      }
    }

    .button {
      width: 180px;
    }
  }

  .opacity0 {
    opacity: 0;
  }
}
</style>
