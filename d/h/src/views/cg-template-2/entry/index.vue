<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import login from './common/login/index.vue';
import { CgIcon } from '@cg-template-2-components/index';

import register from './common/register/index.vue';
import { goToServeUrl } from '@/utils/helpers';
const route = useRoute();
const router = useRouter();

const goPath = (path: string) => {
  router.push(path);
};
</script>
<template>
  <div class="entry">
    <app-image class="logo" src="/logo/logo.png" />
    <login v-if="route.params.type === 'login'" />
    <register v-else />
    <footer class="w_full flex-middle jc-sb">
      <div class="flex-middle pointer" @click="goPath('/home')">
        <cg-icon :width="44" name="i_quit" />
        <span class="text">TRANG CHỦ</span>
      </div>
      <div class="flex-middle pointer" @click="goToServeUrl">
        <cg-icon :width="44" name="i_service" />
        <span class="text">CSKH</span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: var(--cg-gradient-entry);

  .logo {
    width: 232px;
    height: 112px;
    margin-top: 70px;
    margin-bottom: 50px;
  }

  footer {
    padding: 0 85px;
    margin-bottom: 100px;
    font: var(--cg-font-text9);
    .text {
      margin-left: 16px;
    }
  }
}
</style>
