<script setup lang='ts' name="sport-im">
import banner from '@images/sport/im/banner-im.png?preset=full'
import bannerThumb from '@images/sport/im/banner-im.png?preset=thumbnail&src'
import img1 from '@images/sport/im/img1.png?preset=full'
import img1Thumb from '@images/sport/im/img1.png?preset=thumbnail&src'
import img2 from '@images/sport/im/img2.png?preset=full'
import img2Thumb from '@images/sport/im/img2.png?preset=thumbnail&src'
</script>

<template>
  <div class="sport-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
      <jl-image class="flow-img img1" :src="img1" :thumb="img1Thumb" w-92px h-92px />
    </div>
    <div class="right">
      <jl-image class="flow-img img2" :src="img2" :thumb="img2Thumb" w-124px h-124px />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sport-page {
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
  top: 452px;
  left: 44px;
  animation-delay: 0.5s;
}

.img2 {
  top: 546px;
  left: 224px;
  animation-delay: 0s;
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
