<script setup lang="ts">
import { CgCarousel } from '@/components/cg-template-2';
import HomeHorseman from './common/home-horseman/index.vue';
import HomeRanking from './common/home-ranking/index.vue';
import HomeGame from './common/home-game/index.vue';
import HomeSuperior from './common/home-superior/index.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import { useRequest } from 'vue-request';
import APIs from '@/http/blue-apis';
import { connectUnsubscribe, onSubscribe } from '@/http/mqtt';
import { useAppStore } from '@/store-pinia';
import { onBannerJump } from '@/utils/helpers';
const appStore = useAppStore();

const HomeGameRef = ref(null);
const HomeSuperiorRef = ref(null);

const isVisibleGame = ref(false);
const isVisibleSuper = ref(false);

const HomeGameRefVisible = useElementVisibility(HomeGameRef);
const HomeSuperiorRefVisible = useElementVisibility(HomeSuperiorRef);

const bannerList = ref([]);
useRequest(() => APIs.getBannerByFlags({ flags: 2 }), {
  onSuccess: (data: any) => {
    bannerList.value = data.banner.sort((a: any, b: any) => Number(a.sort) - Number(b.sort));
  }
});
watch([HomeGameRefVisible, HomeSuperiorRefVisible], ([newVal, newVal1]) => {
  if (newVal) {
    isVisibleGame.value = true;
  }
  if (newVal1) {
    isVisibleSuper.value = true;
  }
});

const onClick = (item: any) => {
  onBannerJump(item);
};

onBeforeUnmount(() => {
  connectUnsubscribe('w88/homeData');
});

onMounted(() => {
  appStore.getHomeData();
  onSubscribe('w88/homeData');
});
</script>

<template>
  <div class="home_main">
    <cg-carousel :list="bannerList" @onClick="onClick" class="carousel" />
    <div class="content">
      <home-horseman />
      <home-ranking class="ranking" />
      <div ref="HomeGameRef" class="textIs" :class="{ textIn: isVisibleGame }">
        <home-game />
      </div>
      <div ref="HomeSuperiorRef" class="textIs" :class="{ textIn: isVisibleSuper }">
        <home-superior class="superior" :isVisible="isVisibleSuper" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home_main {
  background-color: var(--cg-color-white5);
  overflow: hidden;

  .carousel {
    height: 580px;
    position: relative;
  }

  .content {
    width: 1200px;
    margin: 0 auto;

    .ranking {
      margin-top: 60px;
      margin-bottom: 46px;
    }

    .superior {
      margin-top: 45px;
      margin-bottom: 120px;
    }
  }
}
</style>
