<script setup lang='ts' name="jl-count">
import { TransitionPresets } from '@vueuse/core'
interface Props {
  value: number
  duration?: number
  decimals?: number
}
const props = defineProps<Props>()
const { value, duration, decimals } = toRefs(props)
const val = ref(0)
let isFinished = $ref(false)
const data = $(useTransition(val, {
  duration: duration?.value ?? 1000,
  transition: TransitionPresets.easeInOutQuad,
  onStarted() {
    isFinished = false
  },
  onFinished: () => {
    isFinished = true
  },
}))
onMounted(() => {
  syncRefs(value, val)
})

const formattedVal = $computed(() => data === 0 ? toThousandsFloat(0, decimals?.value) : toThousandsFloat(data, decimals?.value))
const realVal = $computed(() => toThousandsFloat(val.value, decimals?.value))
const finalRes = $computed(() => isFinished ? realVal : formattedVal)
</script>

<template>
  <span class="jl-count">{{ finalRes }}</span>
</template>

