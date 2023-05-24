<template>
  <div class="cg-refresh">
    <cg-icon :width="width" :height="height" name="i_refresh" :class="['i_ref', { active: refreshing }]"
      @click="handleRefresh" />
  </div>
</template>

<script setup lang='ts'>
import { CgIcon } from '@cg-template-2-components/index';
import { ref } from 'vue';

defineProps<{
  width?: string
  height?: string
}>()

const refreshing = ref(false);

const handleRefresh = () => {
  if (refreshing.value) return
  refreshing.value = true;

  const tt = setTimeout(() => {
    refreshing.value = false;
    clearTimeout(tt);
  }, 1000);
} 
</script>
<script lang='ts'>
export default {
  name: 'CgRefresh'
}
</script>

<style lang='scss' scoped>
.cg-refresh {
  cursor: pointer;

  .i_ref {
    &.active {
      cursor: not-allowed;
      animation: rotatefresh 1s linear infinite;
    }
  }
}

@keyframes rotatefresh {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>