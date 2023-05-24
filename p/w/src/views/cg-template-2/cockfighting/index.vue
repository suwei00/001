<script setup lang="ts">
import { CgButton, CgMaintain } from '@/components/cg-template-2';
import { gameStateStore } from '@/store-pinia/game';
import { launchVanue } from '@/utils/gameVenue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const { ganeList } = storeToRefs(gameStateStore());
const currentGame: any = computed(() => {
  const _currentObj: any = ganeList?.value?.find(item => item.id === 9);
  if (_currentObj) {
    return _currentObj.l[0];
  }
  return {};
});

const goGame = () => {
  if (currentGame.value.maintained !== 2) {
    launchVanue({ id: currentGame.value.id });
  }
};
</script>

<template>
  <div class="daga_venue">
    <app-image class="daga_bg1" :src="`/venueImg/bg_daga1.png`" />
    <div class="content">
      <article class="flex ai-c fdr-c">
        <app-image class="logo" src="/venueImg/daga_logo.png" />
        <cg-button blue class="button" @click="goGame">CHƠI NGAY</cg-button>
      </article>
    </div>
    <cg-maintain type="venue" v-if="currentGame.maintained === 2" :time="currentGame.maintained_end" />
  </div>
</template>

<style lang="scss" scoped>
.daga_venue {
  width: 100%;
  min-width: 1200px;
  height: 760px;
  @include webp($base-img-dir + '/venueImg/bg_daga0.png');
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: relative;
    width: 1200px;
    height: 760px;

    article {
      position: absolute;
      top: 246px;
      left: 160px;

      .logo {
        width: 300px;
        margin-bottom: 24px;
      }

      .button {
        width: 180px;
      }
    }
  }

  .daga_bg1 {
    position: absolute;
    max-width: 1920px;
    height: 760px;
  }
}
</style>
