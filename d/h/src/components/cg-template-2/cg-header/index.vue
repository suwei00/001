<script setup lang="ts">
import { CgIcon } from '@cg-template-2-components/index';
import CgHeader from './index.d';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const { isApp } = storeToRefs(useAppStore());

interface Props extends CgHeader.Props {
  isBack?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isBack: true
});
</script>
<template>
  <header class="cg-header" v-if="!isApp">
    <div class="header-left">
      <div class="back-icon pdl-32" @click="$router.back()" v-if="props.isBack">
        <slot name="leading">
          <cg-icon name="i_back" class="back" :width="20" />
        </slot>
      </div>
      <div class="leading-content">
        <slot name="leadingContent" />
      </div>
    </div>
    <div class="title">
      <slot />
    </div>
    <div class="header-right">
      <slot name="actions" />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.cg-header {
  width: 100%;
  height: 88px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  border-bottom: 2px solid var(--cg-color-blue18);
  background-color: var(--cg-color-blue16);
}

.header-left {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 28px;
  color: var(--cg-color-black1);
  font: var(--cg-font-h2);
  text-transform: uppercase;
}

.leading-content {
  display: flex;
  align-items: center;
}

.header-right {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 29px;
  font: var(--cg-font-text2);
}

.pdl-32 {
  padding-left: 32px;
  padding-right: 32px;
}
</style>
