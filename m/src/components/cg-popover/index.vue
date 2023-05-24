<script setup lang="ts"></script>

<template>
  <van-popover v-bind="$attrs">
    <template #default v-if="$slots.default">
      <slot name="default" />
    </template>
    <template #reference>
      <slot name="reference" />
    </template>
  </van-popover>
</template>
