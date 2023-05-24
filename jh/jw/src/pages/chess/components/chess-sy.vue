<script setup lang='ts' name="chess-sy">
import banner from '@images/chess/sy/banner.png?preset=full'
import bannerThumb from '@images/chess/sy/banner.png?preset=thumbnail&src'
import img1 from '@images/chess/sy/img1.png?preset=full'
import img1Thumb from '@images/chess/sy/img1.png?preset=thumbnail&src'
import img2 from '@images/chess/sy/img2.png?preset=full'
import img2Thumb from '@images/chess/sy/img2.png?preset=thumbnail&src'
import img3 from '@images/chess/sy/img3.png?preset=full'
import img3Thumb from '@images/chess/sy/img3.png?preset=thumbnail&src'
</script>

<template>
  <div class="chess-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
      <jl-image class="flow-img img1" :src="img1" :thumb="img1Thumb" w-108px h-122px />
    </div>
    <div class="right">
      <jl-image class="flow-img img2" :src="img2" :thumb="img2Thumb" w-56px h-66px />
      <jl-image class="flow-img img3" :src="img3" :thumb="img3Thumb" w-104px h-106px />
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
  top: 412px;
  left: -108px;
  animation-delay: 0.3s;
}
.img2 {
  top: 40px;
  left: 435px;
  animation-delay: 0s;
}
.img3 {
  top: 499px;
  left: 312px;
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
