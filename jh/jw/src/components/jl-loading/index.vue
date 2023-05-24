<script lang="ts" name="jl-loading" setup>
import loadingJson from '~/config/loading.json'
const { loading } = storeToRefs(useAppStore())
</script>

<template>
  <teleport v-if="loading" to="body">
    <div class="jl-loading">
      <vue3-lottie :animation-data="loadingJson" :height="160" :width="160" />
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.jl-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
