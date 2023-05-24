<script setup lang="ts">
import { timeStampToVietnam } from '@/utils/time';

import type CgEmergency from './index';

interface Props extends CgEmergency.Props {
  content: string;
  title: string;
  ts: string | number | Date;
}
defineProps<Props>();
</script>

<template>
  <div class="emergency">
    <div class="content global_scroll">
      {{ content }}
    </div>
    <div class="title">{{ title }}</div>
    <div class="time">{{ timeStampToVietnam(ts as any) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.emergency {
  color: var(--cg-color-grey5);

  .content {
    font: var(--cg-font-text);
    max-height: 220px;
    overflow-x: auto;
    margin-bottom: 22px;
    text-indent: 22px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .title {
    font: var(--cg-font-text1);
    color: var(--cg-color-grey1);
  }

  .time {
    font: var(--cg-font-text6);
  }
}
</style>
