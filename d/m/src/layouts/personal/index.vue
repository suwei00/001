<template>
  <cg-header />
  <div class="cg-personal-layout">
    <div ref="personContent" class="cg-personal-layout__content">
      <div class="cg-personal-layout__content-left">
        <user-left />
      </div>
      <cg-container class="cg-personal-layout__content-right" padding="16,30" radius="12" type="parent">
        <template #content>
          <router-view />
        </template>
      </cg-container>
    </div>
  </div>
  <cg-footer />
</template>

<script lang="ts" setup>
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { onMounted } from 'vue';
import { CgFooter, CgHeader, CgContainer } from '@/components/cg-template-2';
import UserLeft from './user-left.vue';

import axios from 'axios'
// 保存银行短名称
axios('https://dl-sg.td22t5f.com/lang/error/bank.json').then((res) => {
  if (res.status === 200) {
    sessionStorage.setItem('BankShortName', JSON.stringify(res.data))
  }
})

const userInfoStore = userInfoStateStore();

onMounted(() => {
  userInfoStore.getPlatList();
});
</script>
<script lang="ts">
export default {
  name: 'PersonalLayout'
};
</script>

<style lang="scss" scoped>
.cg-personal-layout {
  padding: 20px 0 80px;
  background-color: var(--cg-color-white5);
}

.cg-personal-layout__content {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: stretch;

  .cg-personal-layout__content-left {
    width: 240px;
    background: var(--color-gray-1);
    height: auto;
  }

  .cg-personal-layout__content-right {
    width: 940px;
    height: auto;
  }
}
</style>
