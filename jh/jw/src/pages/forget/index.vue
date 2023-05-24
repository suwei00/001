<script setup lang="ts" name="forget">
const active = ref(0)
const cActive = ref()
const switchNav = (n: number) => { active.value = n }
</script>

<template>
  <div class="forget" pt-154px pb-82px>
    <nav mb-72px>
      <span class="btn" :class="{ active: active === 0 || cActive === 0 }" mr-50px @click="switchNav(0)" @mouseover="cActive = 0" @mouseout="cActive = ''">通过手机号码找回</span>
      <span class="btn" :class="{ active: active === 1 || cActive === 1 }" pb-24px @click="switchNav(1)" @mouseover="cActive = 1" @mouseout="cActive = ''">通过安全密码找回</span>
      <span class="line" />
    </nav>
    <transition mode="out-in" appear :name="active === 0 ? 'slide-right' : 'slide-left'">
      <by-phone v-if="active === 0" />
      <by-secure v-else />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@include transition-slide-left;
@include transition-slide-right;

nav {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .line {
    width: 100%;
    border-bottom: 2px solid #E5E5E5;
    position: absolute;
    bottom: 0;
    z-index: -1;
  }

  .btn {
    font-size: 28px;
    font-family: $jl-font;
    font-weight: 400;
    color: #8E8E8E;
    border-bottom: 2px solid #E5E5E5;
    cursor: pointer;

  }

  .active {
    color: #4F73F6;
    border-color: #4F73F6;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
