<script setup lang="ts">
import toJSON from '~/assets/json/loading.json'

const appStore = useAppStore()
const { loading } = $(storeToRefs(appStore))
</script>

<template>
  <div v-if="loading" class="loading_conent">
    <div class="box">
      <Vue3Lottie :animation-data="toJSON" :height="150" :width="150" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading_conent {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    .box {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.40);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        transform: translate(-50%);
    }
}
</style>

