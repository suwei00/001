<script setup lang="ts">
import { CgHeader, CgIcon, CgSelect, CgField, CgMaintain } from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { launchVanue } from '@/mixins/gameVenue';
import { gameStateStore } from '@/store-pinia/game';
import { storeToRefs } from 'pinia';
import { computed, ref, watch, nextTick, onMounted } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import { useLoading } from '@/hooks/useLoading';
import { useElementVisibility } from '@vueuse/core';
import LoadImg from './load-img.vue';

const { startLoading, closeLoading } = useLoading();

const gameState = gameStateStore();
const { ganeList }: any = storeToRefs(gameState);
const route = useRoute();

const type = ref('game'); // search
const searchVal = ref();

const footer = ref(null);
const footerIsVisible = useElementVisibility(footer);

const activeId: any = ref(route.query?.gameId?.toString());
const current: any = ref({});

const actions = computed(() => {
  const _current = ganeList.value.find((itme: any) => itme.id === Number(route.params.type));
  if (_current) {
    current.value = _current.l.find((row: any) => row.id === activeId.value) || {};
    return _current.l;
  }
  current.value = {};
  return [];
});

const venuePage = ref(1);
const VenueList = ref([]);
const { run: GetVenue }: any = useRequest(
  () => APIs.getVenueById({ pid: activeId.value, page: venuePage.value, page_size: 30 }),
  {
    manual: true,
    onSuccess: (res: any) => {
      if (res?.d?.length) {
        if (venuePage.value === 1) {
          VenueList.value = res?.d;
        } else {
          VenueList.value = VenueList.value.concat(res?.d);
        }
        venuePage.value++;
      }
    },
    onBefore: () => {
      startLoading();
    },
    onAfter: () => {
      closeLoading();
    }
  }
);

const searchDataList = ref([])
const { run: startSearch }: any = useRequest(
  keyword =>
    APIs.gamesearch({
      pid: activeId.value,
      keyword,
      page: 1,
      page_size: 200,
      flag: 0
    }),
  {
    manual: true,
    debounceInterval: 500,
    onSuccess: (res: any) => {
      if (res?.d?.length) {
        searchDataList.value = res?.d;
      }
    },
    onBefore: () => {
      startLoading();
    },
    onAfter: () => {
      closeLoading();
    }
  }
);
const wrapper = ref();
const gameList:any = computed(() => {
  nextTick(() => {
    wrapper.value.scrollTo({ top: 0 });
  });
  if (type.value === 'game') {
    return VenueList.value;
  } else {
    if (searchVal.value) {
      return searchDataList.value;
    } else {
      return [];
    }
  }
});

const goGame = (code: string) => {
  launchVanue({ id: activeId.value, code, key: 'jump' });
};

const switchType = (ty:string) => {
  type.value = ty;
  if(ty === 'search'){
    searchVal.value = '';
    searchDataList.value = [];
  }
};

watch(
  () => searchVal.value,
  newVal => {
    searchDataList.value = [];
    if (newVal) {
      startSearch(newVal);
    }
  }
);

watch(
  () => route.query.gameId,
  newVal => {
    activeId.value = newVal;
    if (newVal) {
      venuePage.value = 1
      type.value = 'game';
      GetVenue();
    }
  }
);

watch(
  () => footerIsVisible.value,
  newVal => {
    if (newVal) {
      closeLoading()
      if(type.value === 'game'){
        GetVenue();
      }
    }
  }
);

const changeActiveId = (item: any) => {
  activeId.value = item.id;
  venuePage.value = 1
  nextTick(()=>{
    GetVenue();
  })
};

onMounted(() => {
  GetVenue();
});
</script>

<template>
  <div class="subclass" :class="{ subclass_hidden: current.maintained === 2 }" ref="wrapper">
    <cg-header v-if="type === 'game'">
      <div class="title">
        <cg-select
          rowKey="id"
          showLabelKey="name"
          type="view"
          arrowIcon="i_arrow_bule"
          :data="actions.filter((row:any) => row.id !== '8840968486572375835')"
          v-model="activeId"
          selectLeftText="HỦY BỎ"
          selectRightText="XÁC NHẬN"
          selectText="SẢNH"
          @onOk="changeActiveId"
        >
        </cg-select>
      </div>
      <!-- <div class="title" v-else>
        {{ actions.find((row: any) => row.id === '46814147030678')?.name }}
      </div> -->
      <template #actions>
        <cg-icon width="52" name="i_search" @click="switchType('search')" />
      </template>
    </cg-header>
    <cg-header :isBack="false" v-if="type === 'search'">
      <div class="search">
        <cg-icon width="20" name="i_back" @click="switchType('game')" />
        <div class="field">
          <cg-field placeholder="Tìm từ liên quan" v-model="searchVal" type="text">
            <template #left>
              <cg-icon width="52" name="i_search" />
            </template>
          </cg-field>
        </div>
      </div>
    </cg-header>
    <div class="game_list cg_bar_box" v-if="gameList.length" :data="footerIsVisible">
      <div v-for="item in gameList" :key="item.id" class="game_item" @click="goGame(item.game_id)">
        <load-img class="game_img_content" :src="item.img_phone" :key="item.id"></load-img>
        <!-- <app-image class="game_img_content" :src="item.img_phone" isGoogleCloud :key="item.id" /> -->
        <div class="game_name">
          <div class="name">
            {{ item.vn_alias }}
          </div>
        </div>
      </div>
      <div class="footer" ref="footer"></div>
    </div>
    <app-image v-else src="/game_list/not_search.png" class="search_img_size" />
    <div class="my-maintain" v-if="current.maintained === 2" @click.stop>
      <cg-maintain :time="current.maintained_end" :type="`venue1`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-maintain {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.subclass_hidden {
  height: calc(100vh - 88px);
  overflow: hidden;
}
.subclass {
  .title {
    width: 60vw;
    text-transform: none;
    text-align: center;
  }

  .game_list {
    background-color: var(--cg-color-blue16);
    padding: 24px 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, auto);
    grid-row-gap: 26px;
    grid-column-gap: 26px;

    .game_item {
      width: 100%;
      background-color: var(--cg-color-white);
      border-radius: 14px;
      box-shadow: 0px 8px 8px var(--cg-color-blue12);
      border: 2px solid var(--cg-color-blue11);
      display: flex;
      flex-direction: column;

      .game_img_content {
        flex: 1;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
      }

      .game_name {
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: center;
        font: var(--cg-font-text9);
        box-shadow: -4px -4px 20px var(--cg-color-blue9);
        text-align: center;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .search {
    width: 100%;
    padding: 0 32px;
    height: 68px;
    display: flex;
    align-items: center;

    .field {
      margin-left: 20px;
      flex: 1;
    }
    :deep(.cg_field) {
      width: 100%;
      height: 68px;
      border-radius: var(--cg-border-radius);
      box-shadow: 0px 3px 6px var(--cg-color-white), inset 0px 3px 6px var(--cg-color-white4);
    }
  }

  .search_img_size {
    width: 320px;
    margin-top: 280px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
