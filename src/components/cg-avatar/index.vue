<script setup lang='ts' name='cg-avatar'>
import a0 from '@image/avatar/avatar.png?preset=full'
import a1 from '@image/avatar/avatar-1.png?preset=full'
import a2 from '@image/avatar/avatar-2.png?preset=full'
import a3 from '@image/avatar/avatar-3.png?preset=full'
import a4 from '@image/avatar/avatar-4.png?preset=full'
import a5 from '@image/avatar/avatar-5.png?preset=full'
import a6 from '@image/avatar/avatar-6.png?preset=full'
import a7 from '@image/avatar/avatar-7.png?preset=full'
import a8 from '@image/avatar/avatar-8.png?preset=full'
import a9 from '@image/avatar/avatar-9.png?preset=full'
import a10 from '@image/avatar/avatar-10.png?preset=full'
import a11 from '@image/avatar/avatar-11.png?preset=full'
import a12 from '@image/avatar/avatar-12.png?preset=full'
import a13 from '@image/avatar/avatar-13.png?preset=full'
import a14 from '@image/avatar/avatar-14.png?preset=full'
import a15 from '@image/avatar/avatar-15.png?preset=full'
import a16 from '@image/avatar/avatar-16.png?preset=full'

const { size = 'mid', src } = defineProps<{
  size?: 'large' | 'mid' | 'small' | 'mini'
  src: string
}>()
const IMG_URL = `${!import.meta.env.PROD ? 'https://jlcs001.com' : location.origin}/upload`
const obj: { [text: string]: any } = { a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16 }
const isHttp = $computed(() => src?.toString().includes('http'))
const bgSrc = $computed(() => src ? isHttp ? src : getSupportImage(obj[`a${src}`]) : getSupportImage(a0))
</script>

<template>
  <div v-if="src?.length < 3" class="cg-avatar" :class="size" :style="{ backgroundImage: `url(${bgSrc})` }" />
  <img v-else :src="`${IMG_URL + src}.webp`" :class="size" class="cg-avatar">
</template>

<style lang='scss' scoped>
.cg-avatar{
    border: 2px solid $color-blue-1;
    border-radius: 100%;
    overflow: hidden;
    background-size: 100% 100%;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
}
.large {
    width: 49px;
    height: 49px;
}
.mid {
    width: 43px;
    height: 43px;
}
.small {
    width: 40px;
    height: 40px;
}
.mini {
    width: 35px;
    height: 35px;
}
</style>
