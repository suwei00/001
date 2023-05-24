<script setup lang="ts">
import { CgIcon, CgMaintain } from '@/components/cg-template-2';
import { DownloadAppDialog } from '@/mixins/AppDownload';
import { launchVanue } from '@/mixins/gameVenue';
import { gameStateStore } from '@/store-pinia/game';
import { merge } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const gameState = gameStateStore();
const { ganeList, expandItemList, activeGameId }: any = storeToRefs(gameState);

const mianRightRef = ref();

const serviceList = [
  { id: '39636407564188' },
  { id: '362857114342923387' },
  { id: '8840968486572375835', play: '48' },
  { id: '6861705028422769039', type: 'electronic' },
  { id: '41465988833800', type: 'chess' },
  { id: '44196810703047', type: 'fishing' }
];

const currentType = ref();

const gameList = computed(() => {
  const current = ganeList.value.find((itme: any) => itme.id === activeGameId.value);
  if (current) {
    currentType.value = current.type;
    return current.l;
  }
  currentType.value = '';
  return serviceList.map(o => {
    const _current = expandItemList?.value.find((item: any) => item.id === o.id);
    return merge({}, _current, o);
  });
});

const goGame = (item: any) => {
  DownloadAppDialog(() => {
    const key = currentType.value || item.type;
    launchVanue({ ...item, key: item.id === '46814147030678' ? 'game' : key });
  });
};

const changeActive = (value: string | number) => {
  DownloadAppDialog(() => {
    mianRightRef.value.scrollTop = 0;
    gameState.getGaneList();
    gameState.setActiveGameId(value);
  });
};

const wrapper = ref();
onMounted(() => {
  const offsetTop = document.getElementById(`${activeGameId.value}_type`)?.offsetTop || 388;
  wrapper.value.scrollTo({ top: offsetTop - 388, behavior: 'smooth' });
});
</script>

<template>
  <div class="mian" :data="activeGameId">
    <div class="mian_left" ref="wrapper">
      <div
        id="hot_type"
        class="game_type"
        :class="{ game_type_act: activeGameId === 'hot' }"
        @click="changeActive('hot')"
      >
        <cg-icon width="102" :name="activeGameId === 'hot' ? 'i_h_hot_act' : 'i_h_hot'" />
      </div>
      <div
        :id="item.id + '_type'"
        class="game_type"
        :class="{ game_type_act: activeGameId === item.id }"
        v-for="item in ganeList"
        :key="item.id"
        @click="changeActive(item.id)"
      >
        <cg-icon
          width="102"
          :name="activeGameId === item.id ? `i_h_${item.id}_act` : `i_h_${item.id}`"
        />
      </div>
    </div>
    <ul class="mian_right" ref="mianRightRef">
      <li
        class="game_item"
        :class="{ maintained: item.maintained === 2 }"
        v-for="item in gameList"
        @click="goGame(item)"
      >
        <app-image :src="`/game_list/${activeGameId}_${item.id}.png`" :key="item.id" />
        <cg-maintain
          :time="item.maintained_end"
          v-if="item.maintained === 2"
          :type="`venue${gameList.length > 3 ? 3 : gameList.length}`"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.mian {
  display: flex;
  overflow: auto;
  height: 860px;

  &_left {
    width: 144px;
    padding-left: 32px;
    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .game_type {
      width: 100%;
      height: 110px;
      margin-bottom: 16px;
    }

  }

  &_right {
    margin-right: 32px;
    flex: 1;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .game_item {
      width: 100%;
      margin-bottom: 10px;
      border-radius: var(--cg-border-radius);
      overflow: hidden;
      &:last-of-type {
        margin-bottom: 24px;
      }

      :deep(.app-image) {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .maintained {
      border: 4px solid var(--cg-color-blue11);
    }
  }
}
</style>
