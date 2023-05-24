<script setup lang='ts' name="chess-kx">
import banner from '@images/chess/kx/banner.png?preset=full'
import bannerThumb from '@images/chess/kx/banner.png?preset=thumbnail&src'
import img1 from '@images/chess/kx/img1.png?preset=full'
import img1Thumb from '@images/chess/kx/img1.png?preset=thumbnail&src'
import img2 from '@images/chess/kx/img2.png?preset=full'
import img2Thumb from '@images/chess/kx/img2.png?preset=thumbnail&src'
import img3 from '@images/chess/kx/img3.png?preset=full'
import img3Thumb from '@images/chess/kx/img3.png?preset=thumbnail&src'
import img4 from '@images/chess/kx/img4.png?preset=full'
import img4Thumb from '@images/chess/kx/img4.png?preset=thumbnail&src'
</script>

<template>
  <div class="chess-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
      <jl-image class="flow-img img1" :src="img1" :thumb="img1Thumb" w-68px h-66px />
      <jl-image class="flow-img img2" :src="img2" :thumb="img2Thumb" w-88px h-88px />
      <jl-image class="flow-img img3" :src="img3" :thumb="img3Thumb" w-78px h-78px />
    </div>
    <div class="right">
      <jl-image class="flow-img img4" :src="img4" :thumb="img4Thumb" w-66px h-66px />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.chess-page {
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
  top: 52px;
  left: 572px;
  animation-delay: 0.3s;
}
.img2 {
  top: 348px;
  left: 85px;
  animation-delay: 0s;
}
.img3 {
  top: 625px;
  left: 687px;
  animation-delay: 0.2s;
}
.img4 {
  top: 440px;
  left: 424px;
  animation-delay: 0.4s;
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
