<script setup lang='ts'>
const emit = defineEmits(['closed'])

const porps = withDefaults(defineProps<{
  closeOnClickOverlay?: boolean
  showOverlay?: boolean
}>(), {
  closeOnClickOverlay: false,
  showOverlay: true
})

const handleClick = () => {
  if (porps.closeOnClickOverlay) {
    emit('closed')
  }
}
</script>
<template>
  <div @click.self="handleClick" class="cg-dialog-overlay" :class="{overlay:showOverlay}">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'CgDialog'
}
</script>

<style lang='scss' scoped>
.cg-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2020;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background-color: var(--cg-color-black3);
}
</style>