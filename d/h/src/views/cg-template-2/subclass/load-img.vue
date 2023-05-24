<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="img_content">
    <app-image class="game_img" :src="src" isGoogleCloud />
  </div>
</template>

<style lang="scss" scoped>
.img_content {
  background-image: url(link($base-img-dir + '/game_list/game_load.png'));
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .game_img {
    width: 100%;
    height: 100%;
  }
}
</style>
