<script setup lang="ts">
import arrow from '@image/button/arrow.png?preset=full'

interface CGButProps {
  type?: string
  shape?: string
  disabled?: boolean
  badge?: number
}
withDefaults(defineProps<CGButProps>(), {
  type: 'default',
  shape: 'round',
  badge: 0
})
</script>

<template>
  <button class="cg_but font_32" :disabled="disabled" :class="[type, shape]">
    <img class="arrow" v-if="shape === 'circular'" :src="getSupportImage(arrow)" alt="" />
    <slot v-else />
    <div class="number font_26" v-if="badge">{{ badge }}</div>
  </button>
</template>
<style lang="scss" scoped>
.cg_but {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 88px;

  &:disabled {
    background-color: var(--cg-color-bg-6);
    border: none;
    color: var(--cg-color-text-white);
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }
}

.round {
  width: 332px;
  border-radius: 16px;
}

.square {
  width: 686px;
  border-radius: 44px;
}

.circular {
  width: 108px;
  height: 108px;
  border-radius: 108px;
}

.primary {
  color: var(--cg-color-text-white);
  background-color: var(--cg-color-bg-1);
}

.default {
  border: 2px solid var(--cg-color-border-2);
  color: var(--cg-color-text-1);
}

.number {
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid var(--cg-color-text-white);
  background-color: var(--cg-color-bg-1);
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  width: 37px;
}
</style>
