<script setup lang='ts' name="online-service">
import icon from '@images/home/online-service.png?preset=full'
import tip from '@images/home/online-tip.png?preset=full'

const appStore = useAppStore()
</script>

<template>
  <div class="online-service" @click="appStore.openService">
    <jl-image :src="icon" w-58px h-58px class="icon" />
    <div class="tip">
      <span>在线客服</span>
      <img :src="getSupportImage(tip)" alt="">
    </div>
  </div>
</template>

<style lang='scss' scoped>
.online-service {
    position: fixed;
    right: 8px;
    top: 454px;
    z-index: 10;
    cursor: pointer;

    .icon {
        box-shadow: 0px 3px 6px 1px rgba(86, 122, 254, 0.3);
        border-radius: 50%;
    }

    .tip {
        position: absolute;
        top: 8px;
        left: -118px;
        display: none;
        animation: fadeIn 0.2s ease-in;

        img {
            height: 50px;
        }

        span {
            position: absolute;
            left: 22px;
            top: 12px;
            font-size: 15px;
            font-family: $jl-font;
            font-weight: bold;
            color: #515B7C;
        }
    }

    &:hover {
        .tip {
            display: block;
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(10%, 0, 0);
        transform: translate3d(10%, 0, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
</style>
