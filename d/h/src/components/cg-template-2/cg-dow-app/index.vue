<script setup lang="ts">
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';
import { CgButton, CgIcon } from '../index';
defineProps<{
  data1?: Array<any>;
  onCancel: () => void;
  onSure: () => void;
}>();

const { data: bannerList }: any = useRequest(() => APIs.getBannerByFlags({ flags: 9 }), {
  initialData: { banner: [] }
});

</script>
<template>
  <div class="advertise" v-if="bannerList?.banner?.length">
    <div class="swiper">
      <van-swipe autoplay="5000">
        <van-swipe-item v-for="item in bannerList?.banner" :key="item.id">
          <div class="swipe-item">
            <app-image :is-google-cloud="true" :src="item.img" />
          </div>
        </van-swipe-item>
        <template #indicator="{ active }">
          <div v-if="bannerList?.banner?.length > 1" class="indicator-box">
            <div
              v-for="(item, index) in bannerList?.banner"
              class="custom-indicator"
              :class="{ 'active-indicator': active === index }"
            ></div>
          </div>
        </template>
      </van-swipe>
      <div class="icon" @click="onCancel">
        <CgIcon width="46" name="i_blue_close" />
      </div>
    </div>
    <div class="but_cont">
      <cg-button class="w_full mb28" @click="onSure">SỬ DỤNG APP</cg-button>
      <cg-button class="w_full" whiteStyle @click="onCancel">VÀO PHIÊN BẢN WEB</cg-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Advertise'
};
</script>

<style lang="scss" scoped>
:deep(.van-swipe) {
  border-radius: var(--cg-border-radius);
  overflow: hidden;
}

.advertise {
  width: 584px;
  border-radius: var(--cg-border-radius);
  overflow: hidden;
  background-color: var(--cg-color-white);

  .swiper {
    width: 100%;
    height: 582px;
  }
  .icon {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 4px;
    top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swipe-item {
    width: 584px;
    height: 582px;

    img {
      width: 584px;
      height: auto;
    }
  }

  .indicator-box {
    position: absolute;
    bottom: 28.92px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;

    .custom-indicator {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin: 0 8px;
      background: var(--cg-color-white1);
    }

    .active-indicator {
      width: 24px;
      height: 24px;
      background: var(--cg-gradient-blue-blue);
      box-shadow: inset 0px 4px 4px var(--cg-color-blue9);
    }
  }
}

.but_cont {
  padding: 28px 68px;
  .mb28 {
    margin-bottom: 28px;
  }
}
</style>
