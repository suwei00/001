<script lang="ts" setup name="brand">
const { src } = defineProps<{
  src: string
}>()
const myHoverableElement = ref()
const isHovered = useElementHover(myHoverableElement)
const hoverSrc = computed(() =>
  src.replace(/\.svg$/, '-hover.svg'),
)
</script>

<template>
  <div ref="myHoverableElement" class="brand">
    <img :src="getImgUrl(hoverSrc)" loading="lazy" :class="{ hovered: isHovered }" alt="">
    <img :src="getImgUrl(src)" loading="lazy" alt="">
  </div>
</template>

<style lang="scss" scoped>
.brand {
  position: relative;

  img {
    display: inline-block;
    width: 100%;
    height: 100%;

    &:first-child {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: all .2s;
    }

    &.hovered {
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>
