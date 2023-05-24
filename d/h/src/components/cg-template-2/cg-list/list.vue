<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
  finished: boolean
}>()

const emit = defineEmits(['update:modelValue', 'load'])

const loading = useVModel(props, 'modelValue', emit)

const bottomObservable = ref<HTMLDivElement | null>(null)

const load = () => {
  if (props.finished || loading.value) return;
  console.error('执行load')
  loading.value = true
  emit('load')
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        load()
      }
    })
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0
  })

  observer.observe(bottomObservable.value!)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})


</script>
<template>
  <div>
    <slot />
    <div ref="bottomObservable" class="bottom__observable" style="height: 1px;"></div>
  </div>
</template>
