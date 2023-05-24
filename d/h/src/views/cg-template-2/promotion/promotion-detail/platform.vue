<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import PromotionHeader from './components/promotion-header.vue'
import { useImage } from '@/hooks/useImage';
// @ts-expect-error 使用hls.light版本，减小打包体积
import Hls from 'hls.js/dist/hls.light';

const { localSrc, } = useImage();
const posterUrl = computed(() => `${localSrc.value}/promotion/video-bg.png`)
const sourceUrl = computed(() => `${globalConfig.STATIC_CDN_URL}/m3u8/p3js/js.m3u8`)

const supportHls = ref(Hls.isSupported())
function usePlayVideo() {
  const video: any = ref();
  const isPlay = ref(true);
  function initVideo() {
    const hls = new Hls();
    hls.loadSource(`${globalConfig.STATIC_CDN_URL}/m3u8/p3js/js.m3u8`);
    hls.attachMedia(video.value);
    hls.on(Hls.Events.MANIFEST_PARSED, play);
  }

  function play() {
    if (!video.value) return;
    const playing = video.value.currentTime > 0 && !video.value.paused && !video.value.ended && video.value.readyState > 2;
    if (playing || !video.value.canplay) return;

    video.value.play().catch(() => {
      video.value.addEventListener('canplay', video.value.play);
    });
    isPlay.value = false;
  }

  return {
    video,
    initVideo,
    play,
    isPlay
  };
}
const { video, initVideo, play, isPlay } = usePlayVideo()
onMounted(() => {
  if (supportHls.value) {
    initVideo()
  }
})
</script>
<template>
  <div class="platform">
    <PromotionHeader title="GIỚI THIỆU VỀ P3" />
    <div class="banner">
      <app-image src="/promotion/platform_title.png" />
    </div>

    <section>
      <app-image class="part" src="/promotion/part1.png" />
      <app-image class="part" src="/promotion/part2.png" />

      <div class="details2">
        <app-image style="width:100%;" src="/promotion/part3.png" />
        <video v-if="supportHls" @click="play" ref="video" loop muted controls :poster="posterUrl"></video>
        <video v-else webkit-playsinline="true" x-webkit-airplay="allow" playsinline="true" loop muted controls
          :poster="posterUrl">
          <source :src="sourceUrl" type="video/mp4" />
        </video>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.platform {

  .banner {
    width: 100%;
    height: 290px;

    img {
      width: 100%;
      height: 290px;
      object-fit: contain;
    }
  }

  section {
    padding: 37px 34px 42px;
    height: auto;

    .part {
      display: block;
      width: 100%;
      margin-bottom: 25px;
    }

    .details2 {
      width: 100%;
      position: relative;

      video {
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        width: 584px;
        height: 328px;
        display: block;
        border-radius: var(--cg-tab-radius);
        overflow: hidden;
      }
    }
  }
}
</style>
