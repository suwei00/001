<script setup lang='ts'>
import { computed, ref, onMounted } from 'vue'
import { useImage } from '@/hooks/useImage';
// @ts-expect-error 使用hls.light版本，减小打包体积
import Hls from 'hls.js/dist/hls.light';
import { CgIcon } from '@/components/cg-template-2';

const { localSrc, } = useImage();
const banner = computed(() => `${localSrc.value}/promotion/platform_banner.png`)

function usePlayVideo() {
  const video: any = ref(null);
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
  initVideo()
})
</script>
<template>
  <div class="platform">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <app-image class="part" src="/promotion/part1.png" />
    <app-image class="part" src="/promotion/part2.png" />
    <div class="part3">
      <app-image src="/promotion/part3-1.png" />
      <video @click="play" ref="video" loop muted controls :poster="`${localSrc}/promotion/poster.png`"></video>
      <div class="phone">
        <CgIcon width="73" name="i_mock5" />
        <span>+63 9382333333</span>
      </div>
    </div>

  </div>
</template>
<script lang='ts'>
export default {
  name: "Platform",
  components: { CgIcon }
}
</script>

<style lang='scss' scoped>
.platform {
  padding-bottom: 100px;
  color: var(--cg-color-grey1);

  .banner {
    margin: 0 auto;
    max-width: 1920px;
    min-width: 1200px;
    height: 550px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
  }

  .part,
  .part3 {
    width: 1200px;
    display: block;
    margin: 0 auto 29px;
  }

  .part3 {
    position: relative;

    video {
      position: absolute;
      top: 122px;
      left: 50%;
      transform: translateX(-50%);
      width: 686px;
      height: 390px;
      border-radius: var(--cg-border-outer-radius);
      overflow: hidden;
    }

    .phone {
      position: absolute;
      bottom: 94px;
      left: 50%;
      transform: translateX(-50%);
      font: var(--cg-font-text10);
      display: flex;
      align-items: center;
    }
  }
}
</style>