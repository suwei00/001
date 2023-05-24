<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';

const props = defineProps<{
  data: {
    id: string;
    title: string;
    content: string;
    url: string;
    sort: string;
    img: string;
    flags: string;
    is_read: number;
  }[];
  close: () => void;
  onToLink: (item: any) => void;
}>();

// 关闭
const handleClose = () => {
  localStorage.setItem('AdClose', 'YOYO');
  props.close();
};

// 跳转
const clickHandler = (item: any) => {
  props.onToLink(item);
  if (item.url && item.url !== '/') {
    props.close();
  }
};
</script>
<template>
  <div class="advertise">
    <van-swipe autoplay="3000">
      <van-swipe-item v-for="item in data" :key="item.id" @click="clickHandler(item)">
        <div class="swipe-item">
          <app-image :is-google-cloud="true" :src="item.img" />
        </div>
      </van-swipe-item>
      <template #indicator="{ active }">
        <div v-if="data.length > 1" class="indicator-box">
          <div v-for="(item, index) in data" class="custom-indicator" :class="{ 'active-indicator': active === index }">
          </div>
        </div>
      </template>
    </van-swipe>
    <div class="icon" @click="handleClose">
      <CgIcon width="47" name="i_blue_close" />
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
  height: 834px;
  border-radius: var(--cg-border-radius);
  overflow: hidden;
  background-color: var(--cg-color-blue18);

  .icon {
    width: 50px;
    height: 50px;
    position: absolute;
    right:4px;
    top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swipe-item {
    width: 584px;
    height: 834px;

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
</style>
