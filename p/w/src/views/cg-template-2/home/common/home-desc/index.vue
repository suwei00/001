<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';

import { onMounted, ref } from 'vue';

interface Props {
  icon: string;
  title: string;
  desc: string;
}
defineProps<Props>();
</script>

<template>
  <div class="home_desc fdr-c pointer">
    <cg-icon width="106" :name="icon" />
    <p class="title">{{ title }}</p>
    <div class="desc">
      {{ desc }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home_desc {
  margin-top: 60px;
  width: 100%;
  height: 334px;
  background-color: var(--cg-color-blue11);
  border-radius: 12px;
  box-shadow: inset 0px 6px 12px var(--cg-shadow-color1);
  padding: 24px 24px;
  transition: transform 0.3s;
  box-shadow: inset 0px 6px 12px var(--cg-shadow-color1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .title {
    color: var(--cg-color-blue12);
    font: var(--cg-font-text7);
    margin-bottom: 30px;
  }

  .desc {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text6);
    line-height: 18px;
  }

  &:hover {
    transform: scale(1.05);
  }
}
</style>
