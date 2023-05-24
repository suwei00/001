<script setup lang="ts" name="fish">
import bgImg from '@images/home/main-bg.png?preset=full'
import fishBgImg from '@images/fish/fish-bg.png?preset=full'
const { close } = useLoading()
// 关闭全局loading
close()
</script>

<template>
  <div :style="getBackgroundImgObj(bgImg)" class="home">
    <div :style="getBackgroundImgObj(fishBgImg)" game-list-container class="fish">
      <game-list key="fish" flag="fish" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home {
    background-size: cover;
    background-repeat: repeat-y;
  }
  </style>

<route lang="yaml">
meta:
  layout: main
  key: fish
</route>
