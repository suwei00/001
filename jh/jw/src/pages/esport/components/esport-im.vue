<script setup lang='ts' name="esport-im">
import banner from '@images/esport/im-banner.png?preset=full'
import bannerThumb from '@images/esport/im-banner.png?preset=thumbnail&src'
</script>

<template>
  <div class="esport-page">
    <div class="left">
      <jl-image :src="banner" :thumb="bannerThumb" w-760px h-760px />
    </div>
    <div class="right" />
  </div>
</template>

<style lang='scss' scoped>
.esport-page {
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
</style>
