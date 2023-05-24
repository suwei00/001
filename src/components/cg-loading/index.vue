<script setup lang='ts' name='cg-loading'>
import img from '@icon/loading.svg'
</script>

<template>
  <div class="cg-loading">
    <img :src="img" alt="">
  </div>
</template>

<style lang='scss' scoped>
.cg-loading{
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
