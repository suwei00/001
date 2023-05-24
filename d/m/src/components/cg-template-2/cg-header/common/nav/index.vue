<script setup lang="ts">
import { gameStateStore } from '@/store-pinia/game';
import { CgMaintain } from '@/components/cg-template-2';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { launchVanue } from '@/utils/gameVenue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import type GameData from '../../../../../store-pinia/gameType';
const router = useRouter();
const route = useRoute();

const gameState = gameStateStore();
const { ganeList } = storeToRefs(gameState);

const active = ref();

const onClick = (item: GameData.item) => {
  active.value = item.path;
  if (item.path === '/venue' || item.path === '/subclass') {
    router.push(`${item.path}/${item.id}`);
  } else {
    router.push(item.path);
  }
};

const currentKey = ref();
const currentItem = ref();

const handleMouseEnter = (item: GameData.item) => {
  currentKey.value = item.id;
};

const handleMouseLeave = () => {
  currentKey.value = null;
};

const handleItemEnter = (item: GameData.lItem) => {
  currentItem.value = item.id;
};

const handleItemLeave = () => {
  currentItem.value = null;
};

const handleRoute = (item: GameData.item): boolean => {
  if (route.path.includes('venue') || route.path.includes('subclass')) {
    return Number(route.params.id) === Number(item.id);
  } else {
    return route.path === item.path;
  }
};

const goGame = (item: any) => {
  launchVanue({ ...item, key: item.id === '46814147030678' ? 'game' : item.key });
};

onBeforeRouteUpdate(to => {
  gameState.getGaneList();
});

onMounted(() => {
  gameState.getGaneList();
});
</script>

<template>
  <div class="nav_content">
    <div class="head_nav">
      <div class="nav_item pointer" @click="onClick({ id: 'hot', path: '/hot', type: 'hot' })" :class="{ nav_item_active: 'hot' === active }">HOT</div>
      <div
        v-for="item in ganeList"
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave()"
        class="nav_item pointer"
        @click="onClick(item)"
        :class="{ nav_item_active: handleRoute(item) }"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <teleport to="body">
      <div class="games">
        <div class="game-list" v-for="item in ganeList" :key="item.id" :class="{ active: currentKey === item.id }">
          <div class="game-item" v-for="row in item.l">
            <app-image
              class="game-item_img"
              @click="goGame({ ...row, key: item.type })"
              @mouseenter="handleItemEnter(row)"
              @mouseleave="handleItemLeave()"
              :src="`/game/game_${row.id}${currentItem === row.id ? '_hover' : ''}.png`"
            />
            <cg-maintain type="drop" v-if="row.maintained === 2" :time="row.maintained_end" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.nav_content {
  position: relative;
  height: 60px;
  background-color: var(--cg-color-white);
  width: 100%;
  min-width: var(--cg-max-width);
}
.head_nav {
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: var(--cg-font-text3);
  color: var(--cg-color-grey1);

  .nav_item {
    position: relative;
    height: 100%;
    line-height: 60px;
    &:hover {
      color: var(--cg-color-blue5);
      &::after {
        width: 32px;
      }
    }

    &::after {
      position: absolute;
      transition: width 0.2s;
      content: ' ';
      display: block;
      left: 50%;
      transform: translate(-50%);
      bottom: 8px;
      width: 0px;
      height: 4px;
      border-radius: 3px;
      background: var(--cg-color-blue5);
    }
  }

  .nav_item_active {
    color: var(--cg-color-blue5);
    &::after {
      width: 32px;
    }
  }
}
</style>

<style lang="scss">
.games {
  position: fixed;
  top: 140px;
  left: 0;
  width: 100%;
  min-width: var(--cg-max-width);
  z-index: 98;

  .game-list {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, var(--cg-color-blue9) 0%, var(--cg-color-white) 100%);
    box-shadow: 0px 6px 12px var(--cg-color-grey4);
    transform: translateY(-200%);
    transition: all 0.4s;
    z-index: 0;
    overflow: hidden;

    &:hover,
    &.active {
      transform: translateY(0);
      z-index: 1;
    }

    .game-item {
      position: relative;
      cursor: pointer;
      height: 320px;

      .game-item_img {
        height: 100%;
        transition: all 0.5s ease;
      }

      // &:hover {
      //   scale: 1.05;
      //   transform: translateY(5px);
      // }
    }
  }
}
</style>
