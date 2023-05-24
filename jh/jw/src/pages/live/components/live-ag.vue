<script setup lang='ts' name="live-ag">
import banner from '@images/live/ag/banner.png?preset=full'
import bannerThumb from '@images/live/ag/banner.png?preset=thumbnail&src'
import img1 from '@images/live/ag/img1.png?preset=full'
import img1Thumb from '@images/live/ag/img1.png?preset=thumbnail&src'
import img2 from '@images/live/ag/img2.png?preset=full'
import img2Thumb from '@images/live/ag/img2.png?preset=thumbnail&src'
import img3 from '@images/live/ag/img3.png?preset=full'
import img3Thumb from '@images/live/ag/img3.png?preset=thumbnail&src'
import img4 from '@images/live/ag/img4.png?preset=full'
import img4Thumb from '@images/live/ag/img4.png?preset=thumbnail&src'
</script>

<template>
  <div class="live-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
      <jl-image class="flow-img img1" :thumb="img1Thumb" :src="img1" w-60px h-60px />
      <jl-image class="flow-img img2" :thumb="img2Thumb" :src="img2" w-68px h-68px />
      <jl-image class="flow-img img3" :thumb="img3Thumb" :src="img3" w-64px h-64px />
    </div>
    <div class="right">
      <jl-image class="flow-img img4" :src="img4" :thumb="img4Thumb" w-72px h-72px />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.live-page {
  position: absolute;
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
  padding-left: 47px;
  position: relative;
}

.flow-img {
  position: absolute;
  animation: fow 2s ease-in-out infinite;
}

.img1 {
  top: 144px;
  left: 190px;
  animation-delay: 0.5s;
}

.img2 {
  top: 287px;
  left: 250px;
  animation-delay: 0s;
}

.img3 {
  top: 401px;
  left: 115px;
  animation-delay: 0.3s;
}

.img4 {
  top: 618px;
  left: 361px;
  animation-delay: 0.2s;
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
