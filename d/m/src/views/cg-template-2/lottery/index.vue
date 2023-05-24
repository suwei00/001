<script setup lang="ts">
import { CgButton, CgMaintain } from '@/components/cg-template-2';
import { gameStateStore } from '@/store-pinia/game';
import { goToLotteryGame } from '@/utils/gameVenue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { ganeList } = storeToRefs(gameStateStore());
const currentGame: any = computed(() => {
  const _currentObj: any = ganeList?.value?.find(item => item.id === 5);
  if (_currentObj) {
    return _currentObj.l[0];
  }
  return {};
});

const goGame = () => {
  goToLotteryGame();
  // router.push({ path: `/lottery-game`, query: { id: '8840968486572375835' } });
};
</script>

<template>
  <div class="lottery_venue flex ai-c fdr-c">
    <app-image class="lottery_bg1" :src="`/venueImg/bg_lottery1.png`" />
    <div class="content">
      <app-image class="logo" src="/venueImg/lottery_logo.png" />
      <cg-button blue shadow class="button" @click="goGame">CHƠI NGAY</cg-button>
    </div>
    <cg-maintain type="venue" v-if="currentGame.maintained === 2" :time="currentGame.maintained_end" />
  </div>
</template>

<style lang="scss" scoped>
.lottery_venue {
  width: 100%;
  min-width: 1200px;
  height: 760px;
  @include webp($base-img-dir + '/venueImg/bg_lottery0.png');
  background-size: 100% 100%;
  background-position: center;
  position: relative;

  .logo {
    width: 190px;
    height: 190px;
    margin-top: 32px;
    margin-bottom: 16px;
  }

  .button {
    width: 180px;
  }

  .lottery_bg1 {
    position: absolute;
    z-index: 3;
    min-width: 1920px;
    height: 760px;
  }

  .content {
    position: absolute;
    z-index: 9;
  }
}
</style>
