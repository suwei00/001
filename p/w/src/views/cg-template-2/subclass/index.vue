<script setup lang="ts">
import { CgButton, CgPagination, CgMaintain } from '@/components/cg-template-2';
import { gameStateStore } from '@/store-pinia/game';
import { storeToRefs } from 'pinia';
import { computed, ref, onMounted, watch } from 'vue';
import { useRequest } from 'vue-request';
import APIs from '@/http/blue-apis';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import BonusBar from './bonus-bar.vue';
import { launchVanue } from '@/utils/gameVenue';
import { useLoading } from '@/hooks/useLoading';

const route = useRoute();
const active: any = ref();
const ready = ref(false);
const { ganeList } = storeToRefs(gameStateStore());
const page = ref(1);
const total = ref(0);
const routeId = ref(route.params.id);
const venueType = ref();
const currentGame: any = ref({});

// const nameKeys: any = {
//   chess: { '41465988833800': 'KINGMAKER', '7927534376372523583': 'V8 Poker' },
//   electronic: {
//     '6861705028422769039': 'Nổ Hũ PG',
//     '16595015200257': 'Nổ Hũ JILI',
//     '43495319576432': 'Nổ Hũ MG',
//     '8318022162827355323': 'Nổ Hũ CQ9',
//     '46814147030478': 'Nổ Hũ JDB',
//     '42514964534467': 'Nổ Hũ AE'
//   },
//   fishing: { '44196810703047': 'Bắn Cá JDB', '16595015877855': 'Bắn Cá JILI', '7426646715018523638': 'Bắn Cá CQ9' },
//   lottery: { '46814147030678': 'Mini Game' }
// };
const currentList: any = computed(() => {
  const _currentObj: any = ganeList?.value?.find(item => item.id === Number(routeId.value));
  if (_currentObj) {
    if (!active.value) {
      active.value = _currentObj.l[0].id;
    }
    currentGame.value = _currentObj.l.find((row: any) => row.id === active.value);
    ready.value = Boolean(active.value);
    venueType.value = _currentObj.type;
    return _currentObj.l.filter((row: any) => row.id !== '8840968486572375835');
  }
  return [];
});
const gameList: any = ref({ d: [], t: 0 });
const { startLoading, closeLoading } = useLoading();

useRequest(() => APIs.getVenueById({ pid: active.value, page: page.value, page_size: 15, flag: 0 }), {
  debounceInterval: 500,
  refreshDeps: [active, page],
  ready: ready,
  initialData: { d: [], t: 0 },
  onSuccess: (data: any) => {
    if (page.value === 1 && data) {
      total.value = data.t;
    }
    gameList.value = data;
  },
  onAfter: () => {
    closeLoading();
  }
});

const headleActive = (val: number) => {
  if (active.value === val) return;
  page.value = 1;
  active.value = val;
  startLoading();
};

onBeforeRouteUpdate(to => {
  if (to.query.gameId) {
    if (active.value === to.query.gameId) return;
    active.value = to.query.gameId;
  } else {
    active.value = '';
  }
  page.value = 1;
  startLoading();
  routeId.value = to.params.id;
});

const goGame = (item: any) => {
  launchVanue({ ...item, key: 'jump' });
};

const changePage = (val: number) => {
  startLoading();
  page.value = val;
};

onMounted(() => {
  startLoading();
  if (route.query.gameId) {
    active.value = route.query.gameId;
  }
});

const venueTypeList = ['chess', 'lottery'];
</script>

<template>
  <div class="chess_venue">
    <div class="content" :class="`bj_${venueType}`">
      <bonus-bar v-if="routeId === '4'" :style="{ marginTop: '-158px', marginBottom: '42px' }" />
      <div class="chess_main flex-middle fdr-c">
        <div class="chess_main_tab flex-middle" :class="{ visibility_hi: currentList?.length < 2 }">
          <cg-button
            class="but"
            :class="{ but_2: venueTypeList.includes(venueType) }"
            shadow
            :uppercase="false"
            :blue="active === item.id"
            :white="active !== item.id"
            v-for="item in currentList"
            :key="item.id"
            @click="headleActive(item.id)"
          >
            {{ item.name }}
          </cg-button>
        </div>
        <div class="chess_main_game">
          <div class="game_list">
            <div class="game_item" v-for="item in gameList.d" :key="item.id">
              <div class="inner_circle flex fdr-c">
                <app-image class="flex-1 game_img" isGoogleCloud :src="item.img_pc" />
                <div class="game_name txt-ellipsis">{{ item.vn_alias }}</div>
                <div class="enter flex-middle">
                  <cg-button :isHover="false" class="but" shadow @click="goGame({ ...item, id: active, code: item.game_id })">VÀO TRÒ CHƠI</cg-button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-middle-only page">
            <cg-pagination :currentPage="page" :pageSize="15" background layout="prev, pager, next" :total="total" :onPageChange="changePage" />
          </div>
          <cg-maintain type="venue" v-if="currentGame.maintained === 2" :time="currentGame.maintained_end" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.txt-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px;
}

.chess_venue {
  width: 100%;
  min-width: 1200px;
  position: relative;
  overflow: hidden;
  background-color: var(--cg-color-white5);

  .content {
    width: 100%;
    min-width: 1200px;

    background-size: 1920px;
    background-position: center top;
    padding-top: 442px;
  }

  .bj_electronic {
    @include webp($base-img-dir + '/venueImg/electronic_bj.png');
  }

  .bj_chess {
    @include webp($base-img-dir + '/venueImg/chess_bj.png');
  }

  .bj_fishing {
    @include webp($base-img-dir + '/venueImg/fishing_bj.png');
  }

  .bj_lottery {
    @include webp($base-img-dir + '/venueImg/lottery_bj.png');
  }

  .chess_main {
    &_tab {
      .but {
        width: 150px;
        margin: 0 6px;
      }

      .but_2 {
        width: 220px;
      }
    }

    &_game {
      width: 1200px;
      margin-bottom: 80px;
      background: var(--cg-color-white);
      box-shadow: 0px 12px 30px var(--cg-color-grey4);
      border-radius: 12px;
      margin-top: 16px;
      padding: 30px 40px;

      .game_list {
        display: grid;
        grid-template-columns: repeat(5, 204px);
        grid-template-rows: repeat(auto-fill, 168px);
        grid-row-gap: 20px;
        grid-column-gap: 25px;
      }
    }

    .game_item {
      box-sizing: border-box;
      width: 204px;
      height: 168px;
      @include webp($base-img-dir + '/game/game_frame.png');
      background-size: 100% 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 2px 2px 10px var(--cg-color-grey4);

      .inner_circle {
        margin: 2px;
        border-radius: 6px;
        height: 164px;
        overflow: hidden;
        position: relative;

        .game_name {
          height: 38px;
          line-height: 38px;
          text-align: center;
          box-shadow: -2px -2px 10px var(--cg-color-grey4);
          background: linear-gradient(180deg, var(--cg-color-white) 0%, var(--cg-color-white1) 100%);
        }

        .enter {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--cg-color-black4);
          transform: translateY(-100%);
          transition: all 0.4s;

          .but {
            width: 168px;
          }
        }

        &:hover {
          .enter {
            transform: translateY(0%);
          }
        }
      }
    }

    .game_img {
      overflow: hidden;
    }

    .page {
      margin-top: 40px;
    }
  }
}

.visibility_hi {
  visibility: hidden;
}
</style>
