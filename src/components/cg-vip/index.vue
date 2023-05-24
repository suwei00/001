<script setup lang='ts' name='cg-vip'>
import vip1 from '@image/vip/VIP1.png?preset=full'
import vip2 from '@image/vip/VIP2.png?preset=full'
import vip3 from '@image/vip/VIP3.png?preset=full'
import vip4 from '@image/vip/VIP4.png?preset=full'
import vip5 from '@image/vip/VIP5.png?preset=full'
import vip6 from '@image/vip/VIP6.png?preset=full'
import vip7 from '@image/vip/VIP7.png?preset=full'
import vip8 from '@image/vip/VIP8.png?preset=full'
import vip9 from '@image/vip/VIP9.png?preset=full'
import vip10 from '@image/vip/VIP10.png?preset=full'

const { level, width } = defineProps<{ level: number | string; width: string }>()
const obj: { [text: string]: any } = {
  vip1,
  vip2,
  vip3,
  vip4,
  vip5,
  vip6,
  vip7,
  vip8,
  vip9,
  vip10,
}
</script>

<template>
  <img class="vip-level" :style="{ width }" :src="getSupportImage(obj[`vip${level}`])">
</template>

<style lang='scss' scoped>
.vip-level{
  display: inline-block;
}
</style>
