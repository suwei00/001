<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store-pinia';
import { useImage } from '@/hooks/useImage';
import { useLoading } from '@/hooks/useLoading';
const { startLoading, closeLoading } = useLoading();

const { localSrc } = useImage();

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const iframeSrc = ref(route.query.url?.toString());
const showLoading = ref(true);
const gameId = ref(route.query.id);

onMounted(() => {
  const iframe: any = document.getElementById('iframeLaunchGame');
  iframe.onload = function () {
    setTimeout(() => {
      showLoading.value = false;
    }, 500);
  };

  iframe.onerror = function () {
    showLoading.value = false;
  };
  window.addEventListener('message', (data: any) => {
    switch (data.data.action) {
      case 'goBack':
        router.push('/home');
        break;
      case 'login':
        appStore.removeToken();
        router.push({ path: '/entry/login' });
        break;
      default:
        break;
    }
  });
});
onBeforeUnmount(() => {
  window.removeEventListener('message', () => { });
  closeLoading()
});

watch(
  () => showLoading.value,
  newVal => {
    if (!newVal) {
      closeLoading();
    }
  }
);
onMounted(() => {
  startLoading();
});
</script>
<template>
  <div class="launch-game" id="launch-game">
    <!-- <div
      v-if="showLoading"
      class="launch_loading"
      :style="{ backgroundImage: `url(${localSrc}/venueLoading/l_${gameId}.png)` }"
    /> -->
    <iframe id="iframeLaunchGame" :style="{ opacity: showLoading ? 0 : 1 }" :src="iframeSrc"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.launch-game {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(var(--cg-color-white), var(--cg-color-white1));

  iframe {
    width: 100%;
    height: 100%;
  }

  // .launch_loading {
  //   width: 100%;
  //   height: 100%;
  //   background-repeat: no-repeat;
  //   background-position: center;
  //   background-size: contain;
  // }
}
</style>
