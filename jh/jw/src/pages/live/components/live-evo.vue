<script setup lang='ts' name="live-evo">
import banner from '@images/live/evo/banner.png?preset=full'
import bannerThumb from '@images/live/evo/banner.png?preset=thumbnail&src'
import img1 from '@images/live/evo/img1.png?preset=full'
import img1Thumb from '@images/live/evo/img1.png?preset=thumbnail&src'
import img2 from '@images/live/evo/img2.png?preset=full'
import img2Thumb from '@images/live/evo/img2.png?preset=thumbnail&src'
import img3 from '@images/live/evo/img3.png?preset=full'
import img3Thumb from '@images/live/evo/img3.png?preset=thumbnail&src'
</script>

<template>
  <div class="live-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
      <jl-image class="flow-img img1" :thumb="img1Thumb" :src="img1" w-68px h-68px />
      <jl-image class="flow-img img2" :thumb="img2Thumb" :src="img2" w-68px h-68px />
    </div>
    <div class="right">
      <jl-image class="flow-img img3" :src="img3" :thumb="img3Thumb" w-66px h-66px />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.live-page { position:absolute;
  width: 1520px;
  margin: 0 auto;
  display: flex;
}

.left {
  width: 760px;
  position: relative;
}

.right {
  width: 760px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 107px;
  padding-left:47px ;
  position: relative;
}

.flow-img {
  position: absolute;
  animation: fow 2s ease-in-out infinite;
}

.img1 {
  top: 153px;
  left: 228px;
  animation-delay: 0.5s;
}

.img2 {
  top: 392px;
  left: 86px;
  animation-delay: 0s;
}

.img3 {
  top: 577px;
  left: 444px;
  animation-delay: 0.3s;
}

@keyframes fow {
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  to {
    transform: translateY(0);
  }
}
</style>
