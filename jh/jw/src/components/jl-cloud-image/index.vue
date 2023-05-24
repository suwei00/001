<script setup lang='ts' name="jl-cloud-image">
interface Props {
  w?: string
  h?: string
  src: string
  isGame?: boolean
  useBg?: boolean
}
const { isGame, w = 'auto', h = 'auto' } = defineProps<Props>()

const prefix = $computed(() => isGame ? import.meta.env.VITE_GAME_VIDEO_URL : getImgFromUpload())

const getSupportUrl = (url: string) => {
  if (canUseAvif())
    return `${prefix}${url}.avif`
  if (canUseWebp())
    return `${prefix}${url}.webp`

  return `${prefix}${url}`
}
</script>

<template>
  <div class="jl-cloud-image">
    <img v-if="useBg" loading="lazy" class="use-bg" :src="getSupportUrl(src)" alt="">
    <picture v-else>
      <source :srcset="`${prefix}${src}.avif`" type="image/avif">
      <source :srcset="`${prefix}${src}.webp`" type="image/webp">
      <img :src="`${prefix}${src}`" :style="{ width: w, height: h }">
    </picture>
  </div>
</template>

<style lang='scss' scoped>
.use-bg{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
