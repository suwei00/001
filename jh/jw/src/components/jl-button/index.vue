<script setup lang='ts' name="jl-button">
const { disabled = false, loading = false } = defineProps<{
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <button class="jl-button" :disabled="disabled || loading">
    <i class="i-common-btn-loading" mr-5px w-0px h-18px transition-all transition-duration-200 :class="{ 'refresh-loading': loading, 'w-18px': loading }" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.jl-button {
  @apply jl-submit-btn;
  display: flex;
  align-items: center;
}
</style>

