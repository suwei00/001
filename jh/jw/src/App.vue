<script lang="ts" setup name="app">
console.log('环境变量=========>', import.meta.env)
const appStore = useAppStore()
appStore.setToken(sessionStorage.getItem('token') ?? '')
</script>

<template>
  <router-view class="root-view" />
  <jl-loading />
</template>

<style lang="scss" scoped>
.root-view{
  min-width: 1400px;
}
</style>

