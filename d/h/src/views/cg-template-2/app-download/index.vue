<script setup lang="ts">
import { ref } from 'vue';
import { CgHeader, CgButton } from '@/components/cg-template-2';
import type { SwipeInstance } from 'vant';
import { useDirectDownlad } from '../home/components/download-bar/hooks';

const { newDownloadHandler } = useDirectDownlad();

const swiperref = ref<SwipeInstance>();

const arrowClick = (d: 'L' | 'R') => {
  if (d === 'L') {
    swiperref.value?.prev();
  } else {
    swiperref.value?.next();
  }
}

</script>
<template>
  <div class="app-download">
    <!-- <CgHeader> appdownload </CgHeader> -->
    <section>
      <div class="logo-box">
        <app-image src="/logo/logo.png" />
      </div>
      <div class="swiper-box">
        <van-swipe ref="swiperref" class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <div class="imgwrap">

              <app-image src="/download/mainbg1.png" class="main-bg" />
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="imgwrap">
              <app-image src="/download/mainbg2.png" class="main-bg" />
</div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="imgwrap">
              <app-image src="/download/mainbg3.png" class="main-bg" />
</div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="imgwrap">
              <app-image src="/download/mainbg4.png" class="main-bg" />
</div>
          </van-swipe-item>
        </van-swipe>
        <app-image src="/icon/swipleft.png" class="arrow-left" @click="() => arrowClick('L')" />
        <app-image src="/icon/swipright.png" class="arrow-right" @click="() => arrowClick('R')" />
      </div>
      <p class="desc">
        Vui lòng sử dụng điện thoại để mở trang web này. Nhấn vào nút phía dưới để tải P3 app trên
        trang này.
      </p>
      <div class="btns">
        <cg-button width="688" height="100" @click="newDownloadHandler">Tải về ngay</cg-button>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppDownload'
};
</script>

<style lang="scss" scoped>

.imgwrap {
    height: 758px;
.main-bg {
  max-width: 100%;
  margin: 0 auto;
  display: block;
  max-height: 100%;
}
  }
.app-download {
  .logo-box {
    text-align: center;
    padding: 72px 0 40px 0;
    img {
      width: 232px;
    }
  }
  .swiper-box {
    position: relative;
  }
  .arrow-left,
  .arrow-right {
    width: 32px;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    z-index: 8;
  }
  .arrow-left {
    left: 24px;
  }
  .arrow-right {
    right: 24px;
  }
  .desc {
    padding: 8px 30px 40px 30px;
    font: var(--cg-font-text9);
    line-height: 52px;
    text-align: center;
    color: var(--cg-color-black);
  }
  .btns {
    text-align: center;
    padding-bottom: 20px;
    button {
      margin: 0 auto;
    }
  }
}
</style>
