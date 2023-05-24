<script setup lang="ts" name="jl-image">
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
// 懒加载
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
  <div ref="target" class="jl-image">
    <template v-if="!lazy || targetIsVisible">
      <transition>
        <img v-if="imgLoading && thumb" key="thumb" class="thumb thumb-loading" :src="thumb" alt="默认缩略图">
        <img v-else key="realImg" :src="src" alt="图片">
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.jl-image {
  position: relative;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
