<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
import { goTocustomerService } from '~/utils/customerService'
const { isShowHeader } = showHeader()
</script>

<template>
  <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="在线客服" />
    <div class="helplist  cent-top">
      <p class="pd-l">
        <br>
        我们的客服人员持续秉持着尽心尽责的服务态度，<span class="service" @click="goTocustomerService">在线客服</span>全天
        24小时为您提供一对一的咨询和帮助。
      </p>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  @import '~/styles/help.scss';
  </style>

