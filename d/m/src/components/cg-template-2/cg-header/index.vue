<script setup lang="ts">
import { CgButton } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
import HeadDate from './common/date/index.vue';
import HeadIcons from './common/icons/index.vue';
import HeadNav from './common/nav/index.vue';
import HeadUserInfo from './common/user-info/index.vue';
import { LogInAndRegister } from '@/utils/logIn';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { isLogin } = storeToRefs(appStore);

const router = useRouter();
</script>

<template>
  <div class="app_head">
    <div class="app-header">
      <div class="header">
        <div class="header_content">
          <div class="header_main">
            <app-image class="logo_icon pointer" @click="router.push('/')" :src="`/webp/home_logo.webp`" />
            <head-date />
            <head-icons />
            <div class="vertical_line"></div>
            <template v-if="isLogin">
              <head-user-info />
            </template>
            <template v-else>
              <cg-button @click="LogInAndRegister('LogIn')" :fontSize="17" :width="146" :height="55" :paddingX="0" blue>ĐĂNG NHẬP</cg-button>
              <cg-button @click="LogInAndRegister('Register')" :fontSize="17" class="but" :width="146" :paddingX="0" :height="55" red>ĐĂNG KÝ</cg-button>
            </template>
          </div>
        </div>
        <div class="split-line" />
        <head-nav />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app_head {
  height: 140px;
  position: relative;
}

.app-header {
  width: 100%;
  min-width: var(--cg-max-width);
  position: fixed;
  z-index: 2010; // 添加银行卡下拉选择框是2006
  top: 0;
  height: 140px;
  box-shadow: 0px 6px 12px var(--cg-color-grey4);
}

.header {
  background: linear-gradient(90deg, var(--cg-color-blue5) 0%, var(--cg-color-blue2) 53.48%, var(--cg-color-blue5) 96.87%);
  height: 80px;
  width: 100%;

  &_content {
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_main {
    display: flex;
    align-items: center;
    min-width: var(--cg-max-width);

    .logo_icon {
      width: 100px;
      margin-right: 28px;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    .vertical_line {
      width: 1px;
      height: 56px;
      background-color: var(--cg-color-grey5);
      margin-right: 22px;
      margin-left: 4px;
    }

    .but {
      margin-left: 12px;
    }
  }

  .split-line {
    background: linear-gradient(90deg, var(--cg-color-blue5) 0%, var(--cg-color-blue3) 100%);
    height: 6px;
    width: 100%;
  }
}
</style>
