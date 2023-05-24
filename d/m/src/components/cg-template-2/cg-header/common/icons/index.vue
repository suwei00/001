<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { CgIcon } from '@/components/cg-template-2';
import type HeaderCommon from '../index';
const router = useRouter();
const route = useRoute();

const iconsList: Array<HeaderCommon.iconItem> = [
  { iconName: 'i_gift', text: 'KHUYẾN MÃI', path: '/promotion' },
  { iconName: 'i_cooperate', text: 'ĐẠI LÝ', path: '/agent' },
  { iconName: 'i_download', text: 'TẢI APP', path: '/download' },
  { iconName: 'i_wallet', text: 'NẠP TIỀN', path: '/personal/deposit' },
  { iconName: 'i_transfer', text: 'CHUYỂN KHOẢN', path: '/personal/transfer' },
  { iconName: 'i_withdraw', text: 'RÚT TIỀN', path: '/personal/withdraw' }
];

const goToPath = (item: HeaderCommon.iconItem) => {
  router.push(item.path);
};
</script>

<template>
  <div class="icons">
    <div class="icon_item pointer" @click="goToPath(item)" v-for="item in iconsList" :key="item.iconName">
      <cg-icon class="icon_img" :class="{ icon_img_active: item.path === route.path }" width="36" :name="item.iconName + '_j'" />
      <p class="font-11">{{ item.text }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icons {
  width: 490px;
  display: flex;
  justify-content: space-between;
  margin-left: 28px;
  font-size: var(--cg-font-11);
  color: var(--cg-color-white);

  .icon_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    .icon_img {
      transition: transform 0.5s;
      margin-bottom: 6px;
    }

    .icon_img_active {
      :deep(.app-image) {
        filter: drop-shadow(0px 0px 10px var(--cg-color-white));
      }
    }

    &:hover {
      .icon_img {
        :deep(.app-image) {
          filter: drop-shadow(0px 0px 10px var(--cg-color-white));
        }
      }
    }

    p {
      white-space: nowrap;
    }
  }
}
</style>
