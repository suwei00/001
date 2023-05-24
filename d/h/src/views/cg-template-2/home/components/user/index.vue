<script setup lang="ts">
import { computed } from 'vue';
import { CgButton, CgIcon, CgUseAmount } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { DownloadAppDialog } from '@/mixins/AppDownload';

const { userInfo } = storeToRefs(userInfoStateStore());
interface Props {
  isLogin: boolean;
}
const props = defineProps<Props>();

const router = useRouter();
const appStore = useAppStore();

const rightNavList = computed(() => {
  return props.isLogin
    ? [
        { icon: 'i_h_wallet', test: 'NẠP TIỀN', path: '/deposit' },
        { icon: 'i_h_change', test: 'CHUYỂN KHOẢN', path: '/transfer' },
        { icon: 'i_h_withdraw', test: 'RÚT TIỀN', path: '/withdraw' },
        { icon: 'i_h_kefu', test: 'CSKH CHAT', path: '/customer-service' }
      ]
    : [
        { icon: 'i_h_app', test: 'TẢI APP', path: '/download' },
        { icon: 'i_h_wallet', test: 'NẠP TIỀN', path: '/deposit' },
        { icon: 'i_h_withdraw', test: 'RÚT TIỀN', path: '/withdraw' },
        { icon: 'i_h_kefu', test: 'CSKH CHAT', path: '/customer-service' }
      ];
});

const goTo = (path: string) => {
  if (path === '/download') return appStore.downloadApp();
  DownloadAppDialog(() => {
    router.push(path);
  });
};
</script>

<template>
  <div class="use">
    <div class="use_left" :class="{ pr26: !isLogin }">
      <template v-if="!isLogin">
        <cg-button blue_but @click="goTo('/entry/login')">
          <template #icon>
            <cg-icon class="icon" width="60" name="i_home_login" />
          </template>
          ĐĂNG NHẬP
        </cg-button>
        <cg-button orange_but class="orange_bu" @click="goTo('/entry/register')">
          <template #icon>
            <cg-icon class="icon" width="60" name="i_home_register" />
          </template>
          ĐĂNG KÝ
        </cg-button>
      </template>
      <template v-else>
        <div class="flex ai-c">
          <cg-icon width="52" name="i_user" />
          <span class="user">{{ userInfo.username }}</span>
        </div>
        <cg-use-amount />
      </template>
    </div>
    <div class="use_right">
      <div
        class="use_right_item"
        v-for="item in rightNavList"
        :key="item.icon"
        @click="goTo(item.path)"
      >
        <cg-icon width="72" :name="item.icon" />
        <div class="text" :class="{ relative: item.path === '/transfer' }">
          {{ item.test }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.use {
  width: 100%;
  height: 124px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  font: var(--cg-font-text10);
  color: var(--cg-color-black1);

  &_left {
    width: 314px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .icon {
      position: relative;
      top: 4px;
    }

    .user {
      padding-left: 10px;
      font: var(--cg-font-text1);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1;
    }
  }

  .padding10 {
    padding: 10px 0;
  }

  .pr26 {
    padding-right: 26px;
  }

  &_right {
    flex: 1;
    display: flex;
    justify-content: space-between;

    &_item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      height: 124px;

      .text {
        width: 72px;
        text-align: center;
        position: relative;
        bottom: -4px;
      }

      .relative {
        position: absolute;
        left: -18px;
        width: 104px;
        bottom: -8px;
      }
    }
  }
}
</style>
