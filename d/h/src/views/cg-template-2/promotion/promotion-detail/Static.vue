<script setup lang='ts'>
import PromotionHeader from './components/promotion-header.vue'
import { inject } from 'vue';
import { useDetail } from './useDetail'

const flag = inject('flag') as string;
const id = inject('id') as string;

const { banner, details, title } = useDetail(id, flag);
</script>
<template>
  <div class='static-page'>
    <PromotionHeader :title="title" />
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image v-for="item in details" :src="item" :key="item" is-google-cloud />
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'StaticPage'
}
</script>

<style lang='scss' scoped>
.static-page {
  .banner {
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;
  }

  .details {
    width: 686px;
    margin: 0 auto;

    img {
      width: 100%;
      display: block;
      margin-bottom: 24px;
    }
  }
}
</style>