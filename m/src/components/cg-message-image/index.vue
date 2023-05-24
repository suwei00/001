<script setup lang="ts">
import { calculateSize } from "@/utils/calculateSize";

interface CGMessageImageProps {
  alt?: string
  src?: string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  width?: string | number
  height?: string | number
  onClick?: () => void
}

withDefaults(defineProps<CGMessageImageProps>(), {
  src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  alt: "",
  fit: 'cover',
})
</script>

<template>
  <div>
<!--    {{calculateSize(width, height)}}-->
    <VanImage
      :alt="alt"
      :src="src"
      :fit="fit"
      lazy-load
      :style="calculateSize(width, height)"
    >
      <template v-slot:loading>
        <VanLoading type="spinner" size="20" />
      </template>
      <template v-slot:error>加载失败</template>
    </VanImage>
  </div>
</template>
