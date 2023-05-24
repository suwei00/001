<script setup lang='ts' name='global-loading'>
import img from '@icon/loading.svg'
</script>

<template>
  <div class="global-loading">
    <img :src="img" alt="">
  </div>
</template>

<style lang='scss' scoped>
.global-loading{
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #333333, $alpha: .7);
    img{
        display: block;
        width: 1rem;
        height: 1rem;
        animation: rotate 2s linear infinite;
    }
}
@keyframes rotate {
    0%{
        transform:  rotate(0deg);
    }
    100%{
        transform:  rotate(-1turn);
    }
}
</style>
