<script setup lang="ts">
import CgIcon from './index.d';
interface Props extends CgIcon.Props {
  name: string;
  width?: string | number;
  height?: string | number;
  shadow?: boolean;
}
withDefaults(defineProps<Props>(), {
  name: '',
  width: 40,
  height: 0,
  shadow: false
});
</script>

<template>
  <div class="cg_icon" :style="`width: ${width}px;${height ? `height: ${height}px` : ''}`">
    <app-image :class="{ shadow }" :src="`/icon/${name}.png`" />
  </div>
</template>

<style lang="scss" scoped>
.cg_icon {
  :deep(.app-image) {
    width: 100%;
    display: block;
  }

  .shadow {
    filter: var(--cg-img-shadow);
  }
}
</style>
