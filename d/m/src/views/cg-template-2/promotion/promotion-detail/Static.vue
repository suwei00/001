<template>
  <div class="promotion-detail">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image v-for="item in details" :src="item" :key="item" is-google-cloud />
    </div>
  </div>
</template>

<script setup lang="ts" >
import { inject } from 'vue';
import { useDetail } from './useDetail'

const flag = inject('flag') as string;
const id = inject('id') as string;

const { banner, details } = useDetail(id, flag);
</script>

<style lang="scss" scoped>
.promotion-detail {
  width: 100%;
  padding-bottom: 81px;

  .banner {
    margin: 0 auto;
    max-width: 1920px;
    min-width: 1200px;
    height: 550px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
  }

  .details {
    width: 1200px;
    margin: 0 auto;

    img {
      display: block;
      margin-bottom: 30px;
    }
  }
}
</style>