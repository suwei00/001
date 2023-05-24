<script setup lang="ts" name="image-lazy-blur">
const { src: imgList, thumb, lazy = true } = defineProps<{ src: import('vite-plugin-image-presets').ImageAttrs[] | string; thumb?: string; lazy?: boolean }>()
const allSources = $computed(() =>
  Array.isArray(imgList) ? imgList : [{ srcset: imgList }])

const src = $computed(() => {
  if (typeof (imgList) === 'string')
    return imgList

  return getSupportImage(allSources)
})
const target = ref<HTMLDivElement>()
let targetIsVisible = $ref(false)

const { isLoading: imgLoading, execute: loadImg } = useImage({ src }, { immediate: !lazy })
if (lazy) {
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      targetIsVisible = isIntersecting
      if (isIntersecting) {
        stop()
        loadImg()
      }
    },
    { rootMargin: '0px 0px 100px 0px' },
  )
}
</script>

<template>
  <div ref="target" class="image-lazy-blur">
    <template v-if="targetIsVisible">
      <transition>
        <img v-if="imgLoading && thumb" key="thumb" loading="lazy" class="thumb thumb-loading" :src="thumb" alt="默认缩略图">
        <img v-else key="realImg" loading="lazy" :src="src" alt="图片">
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.image-lazy-blur {
  position: relative;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
