<template>
  <div class="cg-personal-layout">
    <cg-header />
    <div class="cg-personal-layout__content">
      <div class="cg-personal-layout__content-left">
        <help-left />
      </div>
      <cg-container class="cg-personal-layout__content-right" padding="28" radius="12" type="parent">
        <template #content>
          <router-view />
        </template>
      </cg-container>
    </div>
    <cg-footer />
  </div>
</template>

<script lang="ts" setup>
import { CgFooter, CgHeader, CgContainer } from '@/components/cg-template-2';
import HelpLeft from './help-left.vue';
</script>

<style lang="scss" scoped>
.cg-personal-layout {
  margin: 20px 0 0;
}

.cg-personal-layout__content {
  display: flex;
  width: 1200px;
  min-height: 660px;
  margin: 0 auto 80px;
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
