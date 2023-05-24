<script setup lang="ts">
defineProps<{ message: string }>()
</script>
<template>
  <div class="dia_msg">{{ message }}</div>
</template>

<style lang="scss" scoped>
.dia_msg {
  padding: 52px 48px;
  font-style: normal;
  line-height: 48px;
  text-align: center;
  color: var(--cg-color-text-3);
}
</style>
