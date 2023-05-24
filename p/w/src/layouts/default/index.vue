<script setup lang="ts">
import { ref } from 'vue';
import { CgFooter, CgHeader, HomePreferential } from '@/components/cg-template-2';
import useBus from '@/hooks/useBus';

const preferentialVisible = ref(false);

// 成功登录后，链接mqtt
useBus('show_preferential', val => {
  preferentialVisible.value = val;
});
</script>
<template>
  <div class="default-layout">
    <cg-header></cg-header>
    <div class="default-layout__content">
      <router-view />
    </div>
    <cg-footer></cg-footer>
    <home-preferential v-model="preferentialVisible" />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 1200px;
  .default-layout__content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
