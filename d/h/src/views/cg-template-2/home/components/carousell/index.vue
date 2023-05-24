<script setup lang="ts">
import { DownloadAppDialog } from '@/mixins/AppDownload';

interface Props {
  bannerList: Array<any>;
}

defineProps<Props>();
const emit = defineEmits(['toLink']);

function clickHandler(item: any) {
  DownloadAppDialog(() => {
    emit('toLink', item);
  });
}
</script>
<template>
  <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="white" lazy-render>
    <van-swipe-item v-for="(b, key) of bannerList" :key="key">
      <app-image :is-google-cloud="true" class="swipe-item" :src="b.img" @click="clickHandler(b)" />
    </van-swipe-item>
    <template #indicator="{ active }">
      <div v-if="bannerList.length > 1" class="indicator-box">
        <div
          v-for="(item, index) in bannerList"
          class="custom-indicator"
          :class="{ 'active-indicator': active === index }"
        ></div>
      </div>
    </template>
  </van-swipe>
</template>

<style lang="scss" scoped>
.banner-swipe {
  width: 100%;
  height: 100%;
  position: relative;
}

.swipe-item {
  width: 100%;
  height: 100%;
}

.indicator-box {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  .custom-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 8px;
    background: var(--cg-color-white1);
    border: 2px solid transparent;
  }

  .active-indicator {
    border: none;
    width: 16px;
    height: 16px;
    background: var(--cg-gradient-blue-blue);
    box-shadow: inset 0px 4px 4px var(--cg-color-blue9), 0px 4px 6px var(--cg-color-blue9);
  }
}
</style>
