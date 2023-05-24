<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'

const { isShowHeader } = showHeader()
</script>

<template>
  <Header v-if="isShowHeader" title="XXXX" />
  <div>123</div>
</template>

<style lang="scss" scoped>
</style>

