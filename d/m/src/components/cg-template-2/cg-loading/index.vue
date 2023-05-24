<script setup lang="ts">
import { useImage } from '@/hooks/useImage'
const { localSrc } = useImage()
</script>
<template>
  <div style="color: white">
    <img style="width: 130px;" :src="`${localSrc}/loading.webp`" alt="">
  </div>
</template>