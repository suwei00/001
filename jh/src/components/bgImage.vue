<script lang="ts" setup>
// utils
import { getSupportImage } from '~/utils/help'

interface Props {
  display?: string
  width?: string
  height?: string
  image?: any
  size?: string
  repeat?: string
  position?: string
}
const props = withDefaults(defineProps<Props>(), {
  display: 'block',
  width: '100%',
  height: '100%',
  image: undefined,
  size: '100%',
  repeat: 'no-repeat',
  position: 'center',
})

let backgroundImage = ''
try {
  backgroundImage = `url(${getSupportImage(props.image)})`
}
catch (e) {
  console.log('error: 传到图片路径不对')
  backgroundImage = ''
}
</script>

<template>
  <img :src="getSupportImage(props.image)" loading="lazy" class="bgImageMain-gjbcjhasb24234sfasfsafd" alt="--">
</template>

<style lang="scss" scoped>
.bgImageMain-gjbcjhasb24234sfasfsafd {
  display: v-bind(display);
  width: v-bind(width);
  height: v-bind(height);
}
</style>
