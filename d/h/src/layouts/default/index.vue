<script setup lang="ts">
import { CgFooter } from '@/components/cg-template-2';
import cgFooter from '@cg-template-2-components/cg-footer/index.vue';

</script>
<template>
  <div class="default-layout">
    <div class="default-layout__content">
      <!-- <router-view /> -->
      <router-view v-slot="{ Component }">
        <keep-alive include="Home,Promotion,Agent,Personal">
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>
    <cg-footer />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  // position: absolute;
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  width: 100%;
  // overflow: hidden;

  .default-layout__content {
    padding-bottom: 128px;
    // flex: 1;
    overflow: auto;
  }
}
</style>
